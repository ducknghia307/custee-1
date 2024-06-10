"use client";
import React, { useEffect, useState } from "react";
import { montserrat_600 } from "@/assets/fonts/font";
import CurrencySplitter from "@/assistants/currencySpliter";

export default function CheckoutProductList({ getProductList }: any) {
    const [checkoutList, setCheckoutList] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    const getCheckoutList = () => {
        const list = JSON.parse(sessionStorage.checkoutList);
        setCheckoutList(list);
        getProductList(list)
        setTotal(0);
        list.map((item: any) => {
            setTotal(
                (oldTotal) =>
                    oldTotal + sumQuantity(item.quantityPerSize) * item.productId.price
            );
        });
    };

    useEffect(() => {
        getCheckoutList();
    }, []);

    const sumQuantity = (quantityArray: any[]) => {
        var sum = 0;
        quantityArray.map((item) => {
            sum += item.quantity;
        });
        return sum;
    };

    return (
        <div className="w-full flex flex-col justify-center items-center rounded-t-lg bg-[#F1E15B]/25 text-sm mt-2">
            <div
                className={`w-full flex flex-row py-3 border-b-2 border-[#784BE6]/25 ${montserrat_600.className} text-lg`}
            >
                <p className="w-full text-center">Product</p>
                <p className="w-full text-center">Price</p>
                <p className="w-full text-center">Quantity</p>
                <p className="w-full text-center">Total</p>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-1 mt-2">
                {checkoutList.map((item: any) => {
                    return (
                        <div
                            key={item._id}
                            className="w-full flex flex-row items-center justify-center"
                        >
                            <span className="w-full">
                                <img
                                    src={item.productId.image}
                                    alt=""
                                    className="w-24 mx-auto"
                                />
                            </span>
                            <p className="w-full text-center">
                                {CurrencySplitter(item.productId.price)} &#8363;
                            </p>
                            <div className="w-full text-center flex items-center justify-center gap-4">
                                {item.quantityPerSize.map((q: any) => {
                                    if (q.quantity > 0)
                                        return (
                                            <span
                                                key={q.size}
                                                className="flex items-center gap-1"
                                            >
                                                <p>{q.size}: </p>
                                                <p className="font-bold">{q.quantity} </p>
                                            </span>
                                        );
                                })}
                            </div>
                            <p className="w-full text-center">
                                {CurrencySplitter(
                                    item.productId.price * sumQuantity(item.quantityPerSize)
                                )}{" "}
                                &#8363;
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>


    );
}
