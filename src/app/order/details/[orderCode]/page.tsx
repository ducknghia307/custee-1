"use client";
import { montserrat_500 } from "@/assets/fonts/font";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import OrderDetails from "@/components/order/orderDetails/OrderDetails";
import OrderInfo from "@/components/order/orderDetails/OrderInfo";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Order {
  _id: string;
  userId: any;
  code: string;
  total: number;
  isPaid: boolean;
  paymentMethod: string;
  deliveryInfo: {
    recipientName: string;
    phone: string;
    address: string;
  };
  deliveryOptions: {
    method: string;
    cost: number;
  };
  discountValue: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
interface OrderItem {
  _id: string;
  productId: any;
  orderId: Order;
  quantityPerSize: {
    size: string;
    quantity: number;
  }[];
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function page({
  params,
}: {
  params: {
    orderCode: string;
  };
}) {
  const [order, setOrder] = useState<Order>({
    _id: "",
    userId: "",
    code: "",
    total: 0,
    isPaid: false,
    paymentMethod: "",
    deliveryInfo: {
      recipientName: "",
      phone: "",
      address: "",
    },
    deliveryOptions: {
      method: "",
      cost: 0,
    },
    discountValue: "",
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [orderItemList, setOrderItemList] = useState<OrderItem[]>([]);

  const getOrderData = async () => {
    await axiosInstance
      .get(`/api/order/code/${params.orderCode}`)
      .then((res) => {
        setOrder(res.data.metadata);
        axiosInstance
          .get(`/api/orderItem/order/${res.data.metadata._id}`)
          .then((res) => {
            console.log("OrderItem fetched: ", res.data);
            setOrderItemList(res.data.metadata);
          });
      })
      .catch((err) => console.log(err));
  };

  const getNotifications = () => {
    if (sessionStorage.payNowSucceeded) {
      toast.success(
        `You have successfully paid order ${sessionStorage.payNowSucceeded}.`
      );
    } else if (sessionStorage.payNowCancelled) {
      toast.info(
        `Aborted online payment order ${sessionStorage.payNowCancelled}.`
      );
    }
    setTimeout(() => {
      sessionStorage.clear();
    }, 10000);
  };

  useEffect(() => {
    getOrderData();
    getNotifications();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16">
      <Navbar />
      <div
        className={`w-full flex justify-center items-center gap-8 mt-32 px-8 ${montserrat_500.className}`}
      >
        <OrderInfo order={order} orderItemList={orderItemList} />
        <OrderDetails order={order} />
      </div>
      <Footer />
    </div>
  );
}
