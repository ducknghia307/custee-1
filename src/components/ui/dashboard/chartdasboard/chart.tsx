"use client"
import { ButtonIcon } from "@radix-ui/react-icons";
import styles from "../chartdasboard/chart.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdCalendarMonth, MdErrorOutline, MdLogout, MdOutlineFileDownload } from "react-icons/md";

const data = [
    {
        name: 'Jan',
        users: 4000,
        orders: 2400,
        sales:1000,
        pending:2000
    },
    {
        name: 'Feb',
        users: 3000,
        orders: 1398,
        sales:2000,
        pending:3000
    },
    {
        name: 'Mar',
        users: 2000,
        orders: 9800,
        sales:1500,
        pending:2300
    },
    {
        name: 'Apr',
        users: 2780,
        orders: 3908,
        sales:1088,
        pending:2020
    },
    {
        name: 'May',
        users: 1890,
        orders: 4800,
        sales:3400,
        pending:3000
    },
    {
        name: 'Jun',
        users: 2390,
        orders: 3800,
        sales:3567,
        pending:1233
    },
    {
        name: 'Jul',
        users: 3490,
        orders: 4300,
        sales:3675,
        pending:3043
    },
    {
        name: 'Aug',
        users: 2390,
        orders: 3800,
        sales:1233,
        pending:7687
    },
    {
        name: 'Sep',
        users: 3490,
        orders: 4300,
        sales:1246,
        pending:3455
    },
    {
        name: 'Oct',
        users: 4000,
        orders: 2400,
        sales:1239,
        pending:9097
    },
    {
        name: 'Nov',
        users: 3000,
        orders: 1398,
        sales:1239,
        pending:5423
    },
    {
        name: 'Dec',
        users: 3490,
        orders: 4300,
        sales:1567,
        pending:5423
    },
];

const ChartDashboard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.button}> <MdErrorOutline />Sale Details</button>
                <div className={styles.controls}>
                    <button className={styles.button}>1/2023 - 12/2023  <MdCalendarMonth /></button>
                    <button className={styles.button}>Export <MdOutlineFileDownload /></button>
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
                    <Tooltip contentStyle={{ fontSize: '13px', fontWeight:500 }}/>
                    <Legend wrapperStyle={{ fontSize: '13px', fontWeight:500}}/>
                    <Line type="monotone" dataKey="orders" stroke="#8884d8"  />
                    {/* activeDot={{ r: 6 }} */}
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="sales" stroke="violet" />
                    <Line type="monotone" dataKey="pending" stroke="#FF6A6A" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
export default ChartDashboard