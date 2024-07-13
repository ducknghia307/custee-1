"use client"

import styles from "../carddashboard/card.module.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { MdAttachMoney, MdCalendarViewWeek, MdOutlinePending, MdOutlineToday } from "react-icons/md";

const Card = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [dailyOrders, setDailyOrders] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);

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

        const totalSalesAmount = orders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + order.total, 0);
        setTotalSales(totalSalesAmount);

        // Tính đơn hàng trong ngày
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dailyOrdersCount = orders.filter(order => new Date(order.createdAt) >= today).length;
        setDailyOrders(dailyOrdersCount);

        // Tính doanh thu trong tuần
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyRevenueAmount = orders
          .filter(order => new Date(order.createdAt) >= oneWeekAgo && order.status === 'completed')
          .reduce((sum, order) => sum + order.total, 0);
        setWeeklyRevenue(weeklyRevenueAmount);

        console.log("Daily orders count:", dailyOrdersCount);
    console.log("Weekly revenue:", weeklyRevenueAmount);
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
    { title: "Total Sales", number: totalSales.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), detail: "Total Sales", icon: <MdAttachMoney size={22} /> },
    { title: "Total Pending", number: totalPending, detail: "Total Pending", icon: <MdOutlinePending size={22} /> },
    { title: "Daily Orders", number: dailyOrders, detail: "Daily Orders", icon: <MdOutlineToday  size={22} /> },
    { title: "Weekly Revenue", number: weeklyRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), detail: "Weekly Revenue", icon: <MdCalendarViewWeek  size={22} /> },
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