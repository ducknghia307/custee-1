"use client"

import styles from "../chartuser/chart.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdCalendarMonth, MdOutlineFileDownload } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInstance } from "@/utils/axiosInstance";
import { Parser } from 'json2csv';

const ChartUser = () => {
    const [data, setData] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [dateRangeString, setDateRangeString] = useState('');
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/api/user");
                console.log("Users Response:", response.data);

                const users = response.data.metadata?.users || [];
                let processedData;

                if (startDate && endDate) {
                    processedData = processChartData(users, startDate, endDate);
                } else {
                    processedData = processChartData(users);
                }

                setData(processedData);

                console.log("Processed Data:", processedData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const processChartData = (users, startDate = null, endDate = null) => {
        const monthlyData = {};

        const isInRange = (date) => {
            if (!startDate && !endDate) return true;
            const d = new Date(date);
            if (startDate && endDate) {
                return d >= startDate && d <= endDate;
            }
            return false;
        };

        users.forEach(user => {
            const date = new Date(user.createdAt);
            if (!isInRange(date)) return;
            const month = date.toLocaleString('default', { month: 'short' });
            if (!monthlyData[month]) {
                monthlyData[month] = { name: month, users: 0, new: 0, active: 0 };
            }
            monthlyData[month].users += 1;
            monthlyData[month].new += 1; // Assuming all fetched users are new users
            if (user.status === "Available") {
                monthlyData[month].active += 1;
            }
        });

        // Sort data by month
        const sortedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const sortedData = sortedMonths.map(month => monthlyData[month] || { name: month, users: 0, new: 0, active: 0 });

        return sortedData;
    };

    const handleDateRangeChange = (update) => {
        setDateRange(update);
        if (update[0] && update[1]) {
            const startMonth = update[0]?.getMonth() + 1;
            const startYear = update[0]?.getFullYear();
            const endMonth = update[1]?.getMonth() + 1;
            const endYear = update[1]?.getFullYear();
            const rangeString = `${startMonth}/${startYear} - ${endMonth}/${endYear}`;
            setDateRangeString(rangeString);
        } else {
            setDateRangeString(''); // Clear date range string if only one date is selected
        }
    };

    const handleExport = () => {
        const fields = ['name', 'users', 'new', 'active'];
        const opts = { fields };
        try {
            const parser = new Parser(opts);
            const csv = parser.parse(data);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "user_data.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>User Statistics</span>
                <div className={styles.controls}>
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateRangeChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        customInput={<button className={styles.button}><MdCalendarMonth size={18}/> {dateRangeString || "Select Date Range"}</button>}
                    />
                    <button className={styles.button} onClick={handleExport}>Export <MdOutlineFileDownload /></button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: '10px' }} />
                    <YAxis style={{ fontSize: '10px' }} />
                    <Tooltip contentStyle={{ fontSize: '13px', fontWeight: 500 }} />
                    <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 500 }} />
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="active" stroke="#8884d8" strokeDasharray="3 4 5 2" />
                    <Line type="monotone" dataKey="new" stroke="violet" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartUser;
