"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {
  dela,
  montserrat_400,
  montserrat_500,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import CurrencySplitter from "@/assistants/currencySpliter.js";
import { Collapse } from "antd";
import Link from "next/link";
import dateFormat from "../../../assistants/date.format";
import "../style.css";
import { axiosInstance } from "@/utils/axiosInstance";
import { current } from "@reduxjs/toolkit";

interface Order {
  _id: string;
  code: string;
  paymentMethod: string;
  deliveryOptions: {
    method: string;
    cose: number;
  };
  discountValue: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
interface OrderItem {
  _id: string;
  orderId: Order;
  productId: Product[];
  quantityPerSize: {
    size: string;
    quantity: number;
  }[];
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Product {
  _id: string;
  userId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  pattern: string;
  wordDecoration?: string;
  imageDecoration?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const deliveryColor = {
  light: "#D4E1F9",
  dark: "#AFC8F8",
  text: "text-blue-700",
};

const pendingColor = {
  light: "#F3F2E6",
  dark: "#F3F0D6",
  text: "text-orange-500",
};

export default function page() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [orderItemList, setOrderItemList] = useState<OrderItem[]>([]);
  const [inProgressList, setInProgressList] = useState<any[]>([]);
  const userId = localStorage.userId;

  const getOrderItemList = async () => {
    await axiosInstance
      .get(`/api/order/user/${userId}`)
      .then((res) => {
        console.log("Order: ", res.data.metadata);
        setOrderList(res.data.metadata);
        res.data.metadata.map((order: any) => {
          axiosInstance
            .get(`/api/orderItem/order/${order._id}`)
            .then((res) => {
              console.log("OrderItem: ", res.data.metadata);
              setOrderItemList((current) => [...current, ...res.data.metadata]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  const sumQuantity = (quantityArray: any) => {
    return quantityArray.reduce(
      (n: any, { quantity }: { quantity: any }) => n + quantity,
      0
    );
  };

  const orderTotal = (item: OrderItem) => {
    var total = 0;
    item.productId.map((product: Product) => {
      total += product.price * sumQuantity(item.quantityPerSize);
    });
    return total;
  };

  useEffect(() => {
    setOrderItemList([]);
    getOrderItemList();
    getCollapseList();
  }, []);

  const getCollapseList = async () => {
    setInProgressList([]);
    orderList.map((order) => {
      const itemList = orderItemList.filter((i) => i.orderId._id === order._id);
      itemList.map((item) => {
        const newItem = {
          key: item._id,
          label: (
            <div
              className={`w-full flex justify-between items-center ${montserrat_600.className}`}
            >
              <div className="w-full flex items-center justify-between gap-8 pr-16">
                <span className="flex gap-8">
                  <p className={`${montserrat_400.className} text-xs`}>
                    {dateFormat(item.createdAt, "dd/mm/yyyy HH:MM")}
                  </p>

                  <p className={`${montserrat_400.className} text-xs`}>
                    <i>
                      &#40;{item.productId.length} product
                      <span
                        className={`${
                          item.productId.length > 1 ? "inline" : "hidden"
                        }`}
                      >
                        s
                      </span>
                      &#41;
                    </i>
                  </p>
                </span>
                <p>{CurrencySplitter(orderTotal(item))} &#8363;</p>
              </div>
              <p
                className={`w-24 text-center rounded-sm
              ${
                order.status.toLowerCase() === "pending" ||
                order.status.toLowerCase() === "processing"
                  ? `${pendingColor.text}`
                  : `${deliveryColor.text}`
              }`}
              >
                {order.status}
              </p>
            </div>
          ),
          children: (
            <div
              className={`p-1 flex flex-col items-center justify-center ${
                order.status.toLowerCase() === "pending" ||
                order.status.toLowerCase() === "processing"
                  ? `bg-[${pendingColor.light}]`
                  : ""
              } 
            ${
              order.status.toLowerCase() === "in delivery"
                ? `bg-[${deliveryColor.light}]`
                : ""
            }`}
            >
              <div className="w-3/4 flex justify-center items-center font-bold text-[10px] mt-2">
                <p className="w-full text-center">Product</p>
                <p className="w-full text-center">Price</p>
                <p className="w-full text-center">Quantity</p>
                <p className="w-full text-center">Total</p>
              </div>
              {item.productId.map((product) => {
                return (
                  <div className="w-3/4 flex justify-center items-center mt-2">
                    <span className="w-full flex items-center justify-center gap-4">
                      <img src={product.image} alt="" className="w-8" />
                      <p>{product.name}</p>
                    </span>
                    <p className="w-full text-center">
                      {CurrencySplitter(product.price)} &#8363;
                    </p>
                    <span className="w-full min-w-max flex items-center justify-center gap-4">
                      {item.quantityPerSize.map((q) => {
                        return (
                          <span className="flex gap-1">
                            <p className="font-extrabold">{q.size}:</p>
                            <p>{q.quantity}</p>
                          </span>
                        );
                      })}
                    </span>
                    <span className="w-full text-center">
                      {CurrencySplitter(
                        sumQuantity(item.quantityPerSize) * product.price
                      )}{" "}
                      &#8363;
                    </span>
                  </div>
                );
              })}
            </div>
          ),
          style: {
            backgroundColor:
              order.status.toLowerCase() === "pending" ||
              order.status.toLowerCase() === "processing"
                ? `${pendingColor.dark}`
                : order.status.toLowerCase() === "in delivery"
                ? `${deliveryColor.dark}`
                : ``,
            marginTop: "5px",
          },
        };

        if (
          order.status.toLowerCase() === "pending" ||
          order.status.toLowerCase() === "processing" ||
          order.status.toLowerCase() === "in delivery"
        ) {
          setInProgressList((prev) => [...prev, newItem]);
        }
      });
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>
          ORDER {orderItemList.length}
        </p>
        <div
          className={`flex flex-row justify-center items-center gap-4 mt-8 text-sm ${montserrat_400.className}`}
        >
          <Link
            className="font-black bg-[#784BE6] text-white py-1 px-4 rounded-md cursor-pointer hover:bg-[#784BE6]/80"
            href="./in_progress"
          >
            In progress
          </Link>
          <Link
            className="bg-white font-medium !text-black opacity-60 cursor-pointer hover:opacity-80 py-1 px-4 rounded-md"
            href="./completed"
          >
            Completed
          </Link>
        </div>

        <div className="relative w-[95%] min-h-80 lg:w-3/4 rounded-sm flex flex-col mt-8">
          <Collapse
            bordered={false}
            items={inProgressList}
            accordion
            expandIcon={({ isActive }) => {
              return isActive ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M12 8L18 14H6L12 8Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M12 16L6 10H18L12 16Z"></path>
                </svg>
              );
            }}
            className={`overflow-x-hidden ${montserrat_400.className}`}
          />
          {inProgressList.length === 0 ? (
            <div className="flex gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="16"
                height="16"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              <p className={`${montserrat_700.className}`}>
                There is nothing here yet !
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
