"use client";
import { dela, montserrat_500 } from "@/assets/fonts/font";
import dateFormat from "@/assistants/date.format";
import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";
import CurrencySplitter from "@/assistants/currencySpliter";

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
    cost: number;
  };
  discountValue: number;
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

export default function OrderInfo({ order }: { order: Order }) {
  const [orderItemList, setOrderItemList] = useState<OrderItem[]>([]);
  const estimatedDelivery = moment(order?.createdAt).add(4, "days").toDate();

  const getOrderItemList = async () => {
    await axios
      .get(`http://localhost:5000/api/orderItem/order/666348b36bd00ae4c76fd8a4`)
      .then((res) => {
        console.log("Order ID: ", order._id);
        console.log("OItemList: ", res.data.metadata);
        setOrderItemList(res.data.metadata);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrderItemList();
  }, []);

  const sumQuantity = (quantityArray: any) => {
    return quantityArray.reduce(
      (n: any, { quantity }: { quantity: any }) => n + quantity,
      0
    );
  };

  const breadcrumbItems = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/order",
      title: "Order",
    },
    {
      title: `Order ${order.code}`,
    },
  ];
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="w-full flex items-center justify-between">
        <p className="text-3xl font-bold">Order ID: {order.code}</p>
        <div className="flex items-center gap-4 opacity-50">
          <button disabled className="hover:underline disabled:cursor-not-allowed">Get invoice</button>
          <button disabled className="px-4 py-1 flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
            </svg>
            Buy more
          </button>
          <button disabled className="px-4 py-1 flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-700 text-white disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
            </svg>
            Send feedback
          </button>
        </div>
      </div>
      <div className="flex items-start justify-start">
        <div className="pr-4 border-r border-black">
          Order date:&emsp;{dateFormat(order.createdAt, "mmm dd, yyyy")}
        </div>
        <div className="flex items-center gap-2 text-green-600 font-black pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
          </svg>
          <p>
            Estimated delivery:&emsp;
            {dateFormat(estimatedDelivery, "mmm dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="min-h-80 max-h-80 w-full flex flex-col items-center justify-center gap-2 border-t border-gray-300 px-2 overflow-x-hidden overflow-y-auto">
        {orderItemList
          ? orderItemList.map((item: OrderItem) => {
              return (
                <div className="min-h-24 w-full flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <img src={item.productId.image} alt="" className="w-20" />
                    <div className="flex flex-col items-start gap-1 px-2">
                      <p className="font-bold">{item.productId.name}</p>
                      <div className="flex items-center justify-center gap-4">
                        <p className="text-sm pr-4 border-r border-gray-400 opacity-50">
                          {CurrencySplitter(item.unitPrice)} &#8363;
                        </p>
                        {item.quantityPerSize.map((q: any) => {
                          return (
                            <span className="flex flex-row items-center gap-1 text-sm">
                              <span className="font-bold">{q.size}:</span>
                              <span>{q.quantity}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="font-bold text-lg">
                      {CurrencySplitter(
                        sumQuantity(item.quantityPerSize) * item.unitPrice
                      )}{" "}
                      &#8363;
                    </div>
                    <div className="text-sm opacity-50">
                      Quantity: {sumQuantity(item.quantityPerSize)}
                    </div>
                  </div>
                </div>
              );
            })
          : order._id}
      </div>
    </div>
  );
}
