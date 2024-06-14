"use client"

import styles from "../carddashboard/card.module.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";

const Card = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setTotalUsers(response.data.metadata.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    const fetchTotalOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/order");
        const orders = response.data.metadata;
        setTotalOrders(orders.length);

        const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;
        setTotalPending(pendingOrdersCount);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalOrders();
  }, []);

  const stats = [
    { title: "Total Users", number: totalUsers, detail: "Total Users", icon: <AiOutlineUser size={22} /> },
    { title: "Total Orders", number: totalOrders, detail: "Total Orders", icon: <AiOutlineShoppingCart size={22} /> },
    { title: "Total Sales", number: "10.123", detail: "Total Sales", icon: <MdAttachMoney size={22} /> },
    { title: "Total Pending", number: totalPending, detail: "Total Pending", icon: <MdOutlinePending size={22} /> },
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
