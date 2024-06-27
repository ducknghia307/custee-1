import React, { useEffect, useState } from "react";
import { dela, montserrat_400, montserrat_700 } from "@/assets/fonts/font";
import dateFormat from "@/assistants/date.format";
import CurrencySplitter from "@/assistants/currencySpliter.js";
import { axiosInstance } from "@/utils/axiosInstance";
import Link from "next/link";

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

export default function OrderListItemInfo({ order }: { order: Order | null }) {
  const [statusColor, setStatusColor] = useState<string>("#F3EBA0");

  const getOrderStatus = () => {
    if (order?.status.match("pending")) {
      return (
        <p className="text-yellow-600 hover:text-yellow-700 cursor-default">
          PENDING
        </p>
      );
    } else if (order?.status.match("delivering")) {
      return (
        <p className="text-sky-700 hover:text-sky-800 cursor-default">
          IN DELIVERY
        </p>
      );
    } else if (order?.status.match("completed")) {
      return (
        <p className="text-green-700 hover:text-green-800 cursor-default">
          COMPLETED
        </p>
      );
    } else if (order?.status.match("cancelled")) {
      return (
        <p className="text-red-700 hover:text-red-800 cursor-default">
          CANCELLED
        </p>
      );
    }
  };

  useEffect(() => {
    if (order?.status.match("delivering")) {
      setStatusColor("#BAE6FD");
    } else if (order?.status.match("completed")) {
      setStatusColor("#BBF7D0");
    } else if (order?.status.match("cancelled")) {
      setStatusColor("#FECACA");
    }
  }, []);

  return order === null ? null : (
    <div
      className={`w-full flex items-center justify-between rounded-t-lg px-4 py-2 ${montserrat_400.className}`}
      style={{
        backgroundColor: `${statusColor}`,
      }}
    >
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex items-center justify-center gap-4 px-4">
          <div className={`rounded-full w-1 h-1 bg-black`}></div>
          <div className={`${montserrat_700.className} text-lg`}>
            ID: {order.code}
          </div>
        </div>
        <div className="font-extralight text-xs ml-10">
          {dateFormat(order.createdAt, "ddd, mmm dd yyyy - HH:MM")}
        </div>
      </div>

      <div
        className={`flex items-center gap-16 ${dela.className} text-slate-600 text-xl`}
      >
        <span
          className={`${
            order.isPaid ? "text-green-600" : ""
          } flex items-center gap-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className={`${order.isPaid ? "inline" : "hidden"}`}
          >
            <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
          </svg>
          <p
            className={`${montserrat_400.className} ${
              order.isPaid ? "inline" : "hidden"
            } text-xs mr-2`}
          >
            PAID
          </p>
          <p>{CurrencySplitter(order.total)}&nbsp;</p>
          <span className="underline">đ</span>
        </span>
        <div className={`${montserrat_400.className} text-sm`}>
          {getOrderStatus()}
        </div>
      </div>
    </div>
  );
}
