"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { dela } from "@/assets/fonts/font";
import OrderListItem from "@/components/order/OrderListItem";
import { axiosInstance } from "@/utils/axiosInstance";

interface Order {
  _id: string;
  userId: any;
  code: string;
  total: number;
  paymentMethod: string;
  deliveryInfo: {
    recipientName: string;
    phone: string;
    address: string;
  };
  deliveryOptions: {
    method: string;
    cose: number;
  };
  discountValue: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function page() {
  const userId = localStorage.userId;
  const [orderList, setOrderList] = useState<Order[]>([]);
  const fetchOrder = async () => {
    if (userId) {
      await axiosInstance
        .get(`http://localhost:5000/api/order/user/${userId}`)
        .then((res) => {
          console.log("Order: ", res.data);
          setOrderList(res.data.metadata);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>ORDER</p>
        <div className="w-full xl:w-2/3 mx-2 flex flex-col items-center gap-8 mt-8">
          {orderList.map((order: Order) => {
            return <OrderListItem order={order} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
