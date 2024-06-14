"use client"
import { AiOutlineUser } from "react-icons/ai";
import styles from "../carduser/card.module.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { MdOutlineAddTask } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";

const Card = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsers, setNewUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await axiosInstance.get("/api/user");
                const users = response.data.metadata?.users || [];
                setTotalUsers(users.length);

                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                const newUsersCount = users.filter(user => {
                    const userCreatedDate = new Date(user.createdAt);
                    return userCreatedDate.getMonth() === currentMonth && userCreatedDate.getFullYear() === currentYear;
                }).length;
                setNewUsers(newUsersCount);

                const activeUsersCount = users.filter(user => user.status === "Available").length;
                setActiveUsers(activeUsersCount);

                console.log('Total Users:', users.length);
                console.log('New Users:', newUsersCount);
                console.log('Active Users:', activeUsersCount);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchTotalUsers();
    }, []);

    const stats = [
        { title: "Total Users", number: totalUsers, detail: "Total Users", icon: <AiOutlineUser size={22} /> },
        { title: "New Users", number: newUsers, detail: "New Users This Month", icon: <MdOutlineAddTask size={22} /> },
        { title: "Total Active Users", number: activeUsers, detail: "Available Users", icon: <MdOutlineCheckCircle size={24} /> },
    ];

    return (
        <div className={styles.cardsContainer}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.texts}>
                        <span className={styles.title}>{stat.title}</span>
                        <span className={styles.number}>{stat.number}</span>
                        <span className={styles.detail}>
                            <span className={styles.positive}>{stat.detail.split(" ")[0]}</span> {stat.detail.substring(stat.detail.indexOf(" ") + 1)}
                        </span>
                    </div>
                    <div className={styles.icon}>{stat.icon}</div>
                </div>
            ))}
        </div>
    );
};

export default Card;
