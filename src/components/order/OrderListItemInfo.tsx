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

export default function OrderListItemInfo({ order }: { order: Order | null }) {
  const [statusColor, setStatusColor] = useState<string>("#F3EBA0");

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
        <p>
          {CurrencySplitter(order.total)}&ensp;
          <span className="underline">đ</span>
        </p>
        <button
          className={`text-blue-700 ${montserrat_400.className} text-sm hover:text-blue-900 hover:underline`}
        >
          <Link href={`/order/details/${order.code}`}>View details</Link>
        </button>
      </div>
    </div>
  );
}
