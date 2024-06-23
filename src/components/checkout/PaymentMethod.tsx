"use client";
import React, { useState } from "react";
import { montserrat_400, montserrat_600 } from "@/assets/fonts/font";
import { Select } from "antd";
import "./style.css";

export default function CheckoutPaymentMethod({ getPaymentMethod }: any) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSelectPaymentMethod = (value: string) => {
    setPaymentMethod(value);
    getPaymentMethod(value);
  };

  return (
    <div className="w-full flex justify-start items-start gap-32 px-8 py-4 bg-[#F1E15B]/25 text-sm border-b-2 border-[#784BE6]">
      <div className="w-1/3 flex flex-col gap-4">
        <p className={`${montserrat_600.className} text-lg`}>Payment method</p>
      </div>
      <div className="w-full flex flex-row justify-between gap-4">
        <Select
          placeholder="Select"
          size="small"
          dropdownStyle={{
            backgroundColor: "",
          }}
          menuItemSelectedIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
            >
              <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
            </svg>
          }
          suffixIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-[#784BE6]"
            >
              <path d="M12 16L6 10H18L12 16Z"></path>
            </svg>
          }
          options={[
            {
              value: "COD",
              label: "Cash on delivery",
            },
            {
              value: "Card",
              label: "Credit/Debit card",
            },
          ]}
          onSelect={(value: string) => handleSelectPaymentMethod(value)}
          className={`w-1/2 ${montserrat_400.className}`}
        ></Select>

        <div
          className={`${montserrat_400.className} min-w-fit text-sm flex items-center text-xs text-gray-800`}
        ></div>
      </div>
    </div>
  );
}
