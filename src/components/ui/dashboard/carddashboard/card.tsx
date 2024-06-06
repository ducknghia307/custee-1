"use client"

import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "../carddashboard/card.module.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

const Card = () => {

    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
    // Fetch total users
    const fetchTotalUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setTotalUsers(response.data.metadata.totalUsers);
        console.log(totalUsers);
        
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  const stats = [
    { title: "Total Users", number: totalUsers, detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
    { title: "Total Orders", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
    { title: "Total Sales", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
    { title: "Total Pending", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
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
                    {stat.icon}
                </div>
            ))}
        </div>
    );
};

export default Card;