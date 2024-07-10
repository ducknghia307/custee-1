"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { dela, montserrat_400, montserrat_600 } from "@/assets/fonts/font";
import OrderListItem from "@/components/order/OrderListItem";
import { axiosInstance } from "@/utils/axiosInstance";
import Loading from "@/components/loading/Loading";
import { toast } from "react-toastify";
import Link from "next/link";
import EmptyOrderImage from "../../assets/images/cart/empty-order.webp";

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

export default function Page() {
  const userId = localStorage.userId;
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [currentList, setCurrentList] = useState<Order[]>([]);
  const [group, setGroup] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const sortOrderList = (orderList: Order[]) => {
    return orderList.sort((a: Order, b: Order) => {
      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
    });
  };

  const fetchOrder = async () => {
    setIsLoading(true);
    if (userId) {
      await axiosInstance
        .get(`/api/order/user/${userId}`)
        .then((res) => {
          console.log("Order: ", res.data);
          setOrderList(sortOrderList(res.data.metadata));
          setCurrentList(sortOrderList(res.data.metadata));
        })
        .catch((err) => console.log(err));
    }
    setIsLoading(false);
  };

  const filterOrder = () => {
    if (group === "all") {
      setCurrentList(orderList);
    } else if (group === "pending") {
      setCurrentList(
        orderList.filter(
          (order: Order) =>
            order.status === "pending" || order.status === "processing"
        )
      );
    } else if (group === "in delivery") {
      setCurrentList(
        orderList.filter((order: Order) => order.status === "delivering")
      );
    } else if (group === "completed") {
      setCurrentList(
        orderList.filter((order: Order) => order.status === "completed")
      );
    } else if (group === "canceled") {
      setCurrentList(
        orderList.filter((order: Order) => order.status === "cancelled")
      );
    }
  };

  useEffect(() => {
    filterOrder();
  }, [group]);

  const getPageStatus = () => {
    if (sessionStorage.payNowSucceeded) {
      toast.success(
        `You have successfully paid order ${sessionStorage.payNowSucceeded}.`
      );
    } else if (sessionStorage.payNowCancelled) {
      toast.info(
        `Aborted online payment order ${sessionStorage.payNowCancelled}.`
      );
    } else if (sessionStorage.cancelOrderCode) {
      toast.info(`Cancelled order ${sessionStorage.cancelOrderCode}.`);
    }
    setTimeout(() => {
      sessionStorage.clear();
    }, 10000);
  };

  useEffect(() => {
    getPageStatus();
    fetchOrder();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>ORDER</p>
        <div className="w-full xl:w-2/3 mx-2 flex flex-col items-center gap-8 mt-8">
          <div
            className={`w-1/2 mx-auto flex items-center gap-2 ${montserrat_600.className}`}
          >
            <button
              onClick={() => setGroup("all")}
              className={`grow p-2 rounded-xl font-semibold ${
                group === "all"
                  ? "bg-gray-800 text-white"
                  : "border hover:bg-slate-100"
              } duration-200`}
            >
              All
            </button>
            <button
              onClick={() => setGroup("pending")}
              className={`grow p-2 rounded-xl font-semibold ${
                group === "pending"
                  ? "bg-gray-800 text-white"
                  : "border hover:bg-slate-100"
              } duration-200`}
            >
              Pending
            </button>
            <button
              onClick={() => setGroup("in delivery")}
              className={`grow p-2 rounded-xl font-semibold ${
                group === "in delivery"
                  ? "bg-gray-800 text-white"
                  : "border hover:bg-slate-100"
              } duration-200`}
            >
              In delivery
            </button>
            <button
              onClick={() => setGroup("completed")}
              className={`grow p-2 rounded-xl font-semibold ${
                group === "completed"
                  ? "bg-gray-800 text-white"
                  : "border hover:bg-slate-100"
              } duration-200`}
            >
              Completed
            </button>
            <button
              onClick={() => setGroup("canceled")}
              className={`grow p-2 rounded-xl font-semibold ${
                group === "canceled"
                  ? "bg-gray-800 text-white"
                  : "border hover:bg-slate-100"
              } duration-200`}
            >
              Canceled
            </button>
          </div>
          {isLoading ? <Loading /> : null}
          {currentList.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 font-thin py-16">
              <img src={EmptyOrderImage.src} alt="" className="w-36 -z-10" />
              <p className={`${montserrat_600.className} text-lg`}>NO ORDER</p>
              <p
                className={`${montserrat_400.className} text-xs opacity-80 text-gray-500`}
              >
                No result that match was found!
              </p>
            </div>
          ) : null}
          {currentList.map((order: Order, key) => {
            return <OrderListItem key={key} order={order} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
