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
import dateFormat from "@/assistants/date.format";

interface OrderItem {
  id: string;
  productOrderedList: Product[];
  date: Date;
  status: string;
}

interface Product {
  id: number;
  productUrl: string;
  productName: string;
  price: number;
  quantity: {
    size: string;
    quantity: number;
  }[];
}

export default function page() {
  const [orderList, setOrderList] = useState<OrderItem[]>([
    {
      id: "11111",
      productOrderedList: [
        {
          id: 1234567890,
          productUrl:
            "https://product.hstatic.net/1000042622/product/t2115-1_1b4213bc818b4c3d99e6ed2a5a8ef018_master.jpg",
          productName: "Basic T-Shirt",
          price: 250000,
          quantity: [
            {
              size: "M",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 2,
            },
            {
              size: "XXL",
              quantity: 2,
            },
          ],
        },
      ],
      date: new Date(),
      status: "Pending",
    },
    {
      id: "22222",
      productOrderedList: [
        {
          id: 1234567890,
          productUrl:
            "https://product.hstatic.net/1000042622/product/t2115-1_1b4213bc818b4c3d99e6ed2a5a8ef018_master.jpg",
          productName: "Basic T-Shirt",
          price: 250000,
          quantity: [
            {
              size: "M",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 2,
            },
            {
              size: "XXL",
              quantity: 2,
            },
          ],
        },
      ],
      date: new Date(),
      status: "In delivery",
    },
    {
      id: "33333",
      productOrderedList: [
        {
          id: 1234567890,
          productUrl:
            "https://product.hstatic.net/1000042622/product/t2115-1_1b4213bc818b4c3d99e6ed2a5a8ef018_master.jpg",
          productName: "Basic T-Shirt",
          price: 250000,
          quantity: [
            {
              size: "M",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 2,
            },
            {
              size: "XXL",
              quantity: 2,
            },
          ],
        },
        {
          id: 2,
          productUrl:
            "https://i.pinimg.com/564x/77/f4/22/77f422e813baba93acbc04648800c9d0.jpg",
          productName: "Scarlet T-Shirt",
          price: 330000,
          quantity: [
            {
              size: "L",
              quantity: 4,
            },
            {
              size: "XL",
              quantity: 3,
            },
          ],
        },
      ],
      date: new Date(),
      status: "Completed",
    },
    {
      id: "44444",
      productOrderedList: [
        {
          id: 1234567890,
          productUrl:
            "https://product.hstatic.net/1000042622/product/t2115-1_1b4213bc818b4c3d99e6ed2a5a8ef018_master.jpg",
          productName: "Basic T-Shirt",
          price: 250000,
          quantity: [
            {
              size: "M",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 2,
            },
            {
              size: "XXL",
              quantity: 2,
            },
          ],
        },
        {
          id: 2,
          productUrl:
            "https://i.pinimg.com/564x/77/f4/22/77f422e813baba93acbc04648800c9d0.jpg",
          productName: "Scarlet T-Shirt",
          price: 330000,
          quantity: [
            {
              size: "L",
              quantity: 4,
            },
            {
              size: "XL",
              quantity: 3,
            },
          ],
        },
      ],
      date: new Date(),
      status: "In delivery",
    },
    {
      id: "55555",
      productOrderedList: [
        {
          id: 3,
          productUrl:
            "https://i.pinimg.com/736x/d3/2c/49/d32c49036224247db899f8f44e9f95a5.jpg",
          productName: "Custee T-Shirt",
          price: 450000,
          quantity: [
            {
              size: "S",
              quantity: 4,
            },
            {
              size: "XL",
              quantity: 1,
            },
          ],
        },
        {
          id: 1234567890,
          productUrl:
            "https://product.hstatic.net/1000042622/product/t2115-1_1b4213bc818b4c3d99e6ed2a5a8ef018_master.jpg",
          productName: "Basic T-Shirt",
          price: 250000,
          quantity: [
            {
              size: "M",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 2,
            },
            {
              size: "XXL",
              quantity: 2,
            },
          ],
        },
        {
          id: 5,
          productUrl:
            "https://i.pinimg.com/736x/d3/2c/49/d32c49036224247db899f8f44e9f95a5.jpg",
          productName: "Custee T-Shirt 3",
          price: 1000000,
          quantity: [
            {
              size: "S",
              quantity: 4,
            },
            {
              size: "M",
              quantity: 2,
            },
            {
              size: "L",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 7,
            },
            {
              size: "XXL",
              quantity: 12,
            },
          ],
        },
      ],
      date: new Date(),
      status: "Completed",
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
      total += product.price * sumQuantity(product.quantity);
    });
    return total;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16 overflow-x-hidden">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>ORDER STATUS</p>
        <div className="relative w-[95%] lg:w-3/4 rounded-xl flex flex-col mt-8 overflow-x-hidden overflow-y-visible">
          <div
            className={`w-full h-10 bg-[#784BE6]/50 ${montserrat_500.className} flex flex-row items-center justify-center`}
          >
            <p className="w-1/3 text-center">Order details</p>
            <p className="w-full text-center">Ordered products</p>
            <p className="w-1/3 text-center">Total</p>
          </div>
          <div
            className={`w-full min-h-96 bg-[#F1E15B]/25 flex flex-col items-center justify-start overflow-x-hidden overflow-y-auto scrollbar scrollbar-track-violet-200 scrollbar-thumb-violet-500 active:scrollbar-thumb-violet-800
             ${montserrat_500.className}`}
          >
            {orderList.map((order: OrderItem) => {
              return (
                <div className="w-full min-h-32 h-auto bg-transparent flex flex-row items-start justify-center border-b border-gray-800 last:border-b-0">
                  <div className="w-1/3 text-center flex flex-col items-center py-8">
                    <p>#{order.id}</p>
                    <p>{order.date.toDateString()}</p>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    {order.productOrderedList.map((product: Product) => {
                      return (
                        <div className="w-full min-h-24 h-auto flex flex-row justify-center items-center text-[80%]">
                          <div className="w-full flex flex-row items-center gap-2 justify-start">
                            <img className="w-16" src={product.productUrl} />
                            <p className="max-w-full text-ellipsis whitespace-nowrap overflow-hidden">
                              {product.productName}
                            </p>
                          </div>
                          <div className="w-full text-center hidden md:block">
                            {CurrencySplitter(product.price)} đ
                          </div>
                          <div
                            className={`flex flex-row gap-2 items-center justify-center min-w-fit w-1/4 text-center`}
                          >
                            Quantity:
                            <span className="font-extrabold">
                              {sumQuantity(product.quantity)}
                            </span>
                          </div>
                          <div className="min-w-fit w-full text-center self-center">
                            {CurrencySplitter(
                              sumQuantity(product.quantity) * product.price
                            )}{" "}
                            đ
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`w-1/3 flex flex-col justify-center gap-4 my-auto text-center ${montserrat_700.className} text-xs`}
                  >
                    <p className={`${montserrat_400.className} text-lg`}>
                      {CurrencySplitter(orderTotal(order))} đ
                    </p>
                    {order.status.toLowerCase() == "pending" ? (
                      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1">
                        <div className="rounded-sm px-8 py-1 md:px-3 bg-[#FFA756]/20 text-[#FFA756]">
                          {order.status}
                        </div>
                        <div className="rounded-sm px-9 py-1 md:px-4 bg-[#EF3826]/20 text-[#EF3826]">
                          Cancel
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`w-fit rounded-sm py-1 text-xs mx-auto
                      ${
                        order.status.toLowerCase() == "in delivery"
                          ? "px-5 bg-[#6D9CF6]/20 text-[#6D9CF6]"
                          : ""
                      }
                      ${
                        order.status.toLowerCase() == "completed"
                          ? "px-5 bg-[#00B69B]/20 text-[#00B69B]"
                          : ""
                      }
                      `}
                      >
                        {order.status}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
