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

interface OrderItem {
  id: string;
  productOrderedList: Product[];
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Product {
  id: string;
  userId: string;
  name: string;
  price: number;
  quantityPerSize: {
    size: string;
    quantity: number;
  }[];
  image: string;
  color: string;
  pattern: string;
  discount?: string;
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
  const [orderList, setOrderList] = useState<OrderItem[]>([
    {
      id: "123213",
      productOrderedList: [
        {
          id: "85944",
          userId: "983uz8232i2213y",
          name: "T Shirt",
          price: 99000,
          quantityPerSize: [
            {
              size: "S",
              quantity: 7,
            },
            {
              size: "M",
              quantity: 3,
            },
          ],
          image:
            "https://pos.nvncdn.com/b3bf61-16762/ps/20240112_06f1gMyo9i.jpeg",
          color: "white",
          pattern: "T-shirt",
        },
        {
          id: "53356",
          userId: "983uz8232i2213y",
          name: "T Shirt",
          price: 99000,
          quantityPerSize: [
            {
              size: "S",
              quantity: 7,
            },
            {
              size: "M",
              quantity: 3,
            },
          ],
          image:
            "https://pos.nvncdn.com/b3bf61-16762/ps/20240112_06f1gMyo9i.jpeg",
          color: "white",
          pattern: "T-shirt",
        },
      ],
      status: "In delivery",
      createdAt: new Date(),
    },
    {
      id: "5673454",
      productOrderedList: [
        {
          id: "85944",
          userId: "983uz8232i2213y",
          name: "T Shirt",
          price: 99000,
          quantityPerSize: [
            {
              size: "S",
              quantity: 7,
            },
            {
              size: "M",
              quantity: 3,
            },
            {
              size: "L",
              quantity: 3,
            },
            {
              size: "XL",
              quantity: 3,
            },
            {
              size: "XXL",
              quantity: 3,
            },
          ],
          image:
            "https://pos.nvncdn.com/b3bf61-16762/ps/20240112_06f1gMyo9i.jpeg",
          color: "white",
          pattern: "T-shirt",
        },
      ],
      status: "Pending",
      createdAt: new Date(),
    },
  ]);

  const sumQuantity = (quantityArray: any) => {
    return quantityArray.reduce(
      (n: any, { quantity }: { quantity: any }) => n + quantity,
      0
    );
  };

  const orderTotal = (order: OrderItem) => {
    var total = 0;
    order.productOrderedList.map((product: Product) => {
      total += product.price * sumQuantity(product.quantityPerSize);
    });
    return total;
  };

  const [inProgressList, setInProgressList] = useState<any[]>([]);

  useEffect(() => {
    async function getCollapseList() {
      setInProgressList([]);
      orderList.map((order) => {
        const newItem = {
          key: order.id,
          label: (
            <div
              className={`w-full flex justify-between items-center ${montserrat_600.className}`}
            >
              <div className="w-full flex items-center justify-between gap-8 pr-16">
                <span className="flex gap-8">
                  <p className={`${montserrat_400.className} text-xs`}>
                    {dateFormat(order.createdAt, "dd/mm/yyyy HH:MM")}
                  </p>

                  <p className={`${montserrat_400.className} text-xs`}>
                    <i>
                      &#40;{order.productOrderedList.length} product
                      <span
                        className={`${
                          order.productOrderedList.length > 1
                            ? "inline"
                            : "hidden"
                        }`}
                      >
                        s
                      </span>
                      &#41;
                    </i>
                  </p>
                </span>
                <p>{CurrencySplitter(orderTotal(order))} &#8363;</p>
              </div>
              <p
                className={`w-24 text-center rounded-sm
                ${
                  order.status.toLowerCase() === "pending"
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
                order.status.toLowerCase() === "pending"
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
              {order.productOrderedList.map((product) => {
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
                      {product.quantityPerSize.map((item) => {
                        return (
                          <span className="flex gap-1">
                            <p className="font-extrabold">{item.size}:</p>
                            <p>{item.quantity}</p>
                          </span>
                        );
                      })}
                    </span>
                    <span className="w-full text-center">
                      {CurrencySplitter(
                        sumQuantity(product.quantityPerSize) * product.price
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
              order.status.toLowerCase() === "pending"
                ? `${pendingColor.dark}`
                : order.status.toLowerCase() === "in delivery"
                ? `${deliveryColor.dark}`
                : ``,
            marginTop: "5px",
          },
        };
        if (
          order.status.toLowerCase() === "pending" ||
          order.status.toLowerCase() === "in delivery"
        ) {
          setInProgressList((prev) => [...prev, newItem]);
        }
      });
    }
    getCollapseList();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>ORDER</p>
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
