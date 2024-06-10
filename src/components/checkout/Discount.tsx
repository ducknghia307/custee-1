"use client";
import React, { useState } from "react";
import { montserrat_400, montserrat_600, } from "@/assets/fonts/font";
import { Select } from "antd";
import CurrencySplitter from "@/assistants/currencySpliter";

export default function CheckoutDiscount({ getDiscountValue, total }: any) {
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);

    const handleSelectDiscount = (value: string) => {
        setDiscountValue(parseFloat(value));
        getDiscountValue(parseFloat(value))
        setDiscountAmount(total * parseFloat(value));
    };

    return (
        <div className="w-full flex justify-between items-start gap-32 px-8 py-4 rounded-b-lg bg-[#F1E15B]/25 text-sm border-b-2 border-[#784BE6]">
            <div className="w-1/3 min-w-fit flex flex-col gap-4">
                <p className={`${montserrat_600.className} text-lg`}>Coupon</p>
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
                <Select
                    allowClear={true}
                    placeholder="Select or type"
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
                            value: "0.1",
                            label: "First purchase (-10%)",
                        },
                    ]}
                    onSelect={(value: string) => handleSelectDiscount(value)}
                    className={`w-1/2 ${montserrat_400.className}`}
                ></Select>
                <div
                    className={`${montserrat_400.className} min-w-fit text-sm flex items-center text-xs text-gray-800`}
                >
                    {discountAmount > 0 ? (
                        <>- {CurrencySplitter(discountAmount)} &#8363;</>
                    ) : null}
                </div>
            </div>
        </div>


    );
}
