"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import {
  dela,
  montserrat_400,
  montserrat_500,
  montserrat_600,
} from "@/assets/fonts/font";
import CurrencySplitter from "@/assistants/currencySpliter.js";

interface CartItem {
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
  const [checkedList, setCheckedList] = useState<CartItem[]>([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [cartList, setCartList] = useState<CartItem[]>([
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
          size: "2XL",
          quantity: 22,
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
    {
      id: 3,
      productUrl:
        "https://i.pinimg.com/736x/d3/2c/49/d32c49036224247db899f8f44e9f95a5.jpg",
      productName: "Custee T-Shirt",
      price: 450000,
      quantity: [
        {
          size: "XS",
          quantity: 4,
        },
        {
          size: "XL",
          quantity: 1,
        },
      ],
    },
    {
      id: 4,
      productUrl:
        "https://i.pinimg.com/736x/d3/2c/49/d32c49036224247db899f8f44e9f95a5.jpg",
      productName: "Custee T-Shirt 2",
      price: 450000,
      quantity: [
        {
          size: "XS",
          quantity: 10,
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
          size: "XS",
          quantity: 4,
        },
        {
          size: "S",
          quantity: 2,
        },
        {
          size: "M",
          quantity: 1,
        },
        {
          size: "L",
          quantity: 7,
        },
        {
          size: "XL",
          quantity: 12,
        },
      ],
    },
  ]);

  const sumQuantity = (quantityArray: any) => {
    return quantityArray.reduce(
      (n: any, { quantity }: { quantity: any }) => n + quantity,
      0
    );
  };

  const checkboxChanged = (event: any) => {
    const checkedItem = cartList.find(
      (element) => element.id == event.target.defaultValue
    );
    if (checkedItem) {
      if (event.target.checked) {
        setCheckedList([...checkedList, checkedItem]);
      } else {
        document.querySelector("#choose-all-checkbox")!.checked = false;
        const newCheckList = checkedList.filter(
          (item) => item.id != checkedItem.id
        );
        setCheckedList(newCheckList);
      }
    }
  };

  const allCheckboxChanged = (event: any) => {
    if (event.target.checked) {
      setCheckedList(cartList);
    } else {
      setCheckedList([]);
    }
  };

  const updateTotal = () => {
    setCurrentTotal(0);
    checkedList.map((item) => {
      setCurrentTotal(
        (oldTotal) => oldTotal + sumQuantity(item.quantity) * item.price
      );
    });
  };

  useEffect(() => {
    updateTotal();
  }, [checkedList]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16 overflow-x-hidden">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>CART</p>
        <div className="relative w-3/4 rounded-xl flex flex-col mt-8 overflow-x-hidden overflow-y-visible">
          <div
            className={`w-full h-10 bg-[#784BE6]/50 ${montserrat_500.className} flex flex-row items-center justify-center`}
          >
            <p className="w-full text-center">Product</p>
            <p className="w-3/4 text-center">Price</p>
            <p className="w-1/4 text-center">Quantity</p>
            <p className="w-3/4 text-center">Total</p>
          </div>
          <div
            className={`w-full min-h-96 max-h-96 bg-[#F1E15B]/25 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto scrollbar scrollbar-track-violet-200 scrollbar-thumb-violet-500 active:scrollbar-thumb-violet-800
             ${montserrat_500.className}`}
          >
            {cartList.map((item, key) => {
              return (
                <div
                  key={key}
                  className="w-full bg-transparent flex flex-row justify-center items-center min-h-32 max-h-32 pl-[20px] overflow-hidden first:mt-64 hover:bg-[#F1E15B]/50 transition-all duration-75"
                >
                  <div className="flex flex-row items-center gap-2 justify-start w-full text-center">
                    <input
                      id={`checkbox-${item.id}`}
                      type="checkbox"
                      className="border-gray-200 rounded text-yellow-600 cursor-pointer focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      onChange={(event) => checkboxChanged(event)}
                      value={item.id}
                      checked={
                        checkedList.find((element) => element.id === item.id)
                          ? true
                          : false
                      }
                    />
                    <img className="w-16" src={item.productUrl} />
                    <p className="">{item.productName}</p>
                  </div>
                  <div className="min-w-fit w-3/4 text-center">
                    {CurrencySplitter(item.price)} đ
                  </div>
                  <div
                    className={`flex flex-col items-center min-w-fit w-1/4 text-center`}
                  >
                    {item.quantity.map((q) => {
                      return (
                        <div className="group w-full flex flex-row justify-between items-center">
                          <div className="">{q.size}: </div>
                          <span className="font-extrabold flex flex-row items-center gap-2">
                            <span>{q.quantity}</span>
                            <span className="flex flex-col invisible group-hover:visible">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="12"
                                height="12"
                                fill="currentColor"
                                className="rounded-sm hover:bg-[#CDBC2A] cursor-pointer"
                              >
                                <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="12"
                                height="12"
                                fill="currentColor"
                                className="rounded-sm hover:bg-[#CDBC2A] cursor-pointer"
                              >
                                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                              </svg>
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="min-w-fit w-3/4 text-center">
                    {CurrencySplitter(sumQuantity(item.quantity) * item.price)}{" "}
                    đ
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`sticky bottom-0 w-full min-h-32 flex flex-row items-center justify-between bg-violet-500 text-white ${montserrat_600.className}`}
          >
            <div className="w-full flex flex-row items-center justify-start gap-4 pl-16">
              <input
                id="choose-all-checkbox"
                type="checkbox"
                className="border-gray-200 rounded text-yellow-600 cursor-pointer focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                onChange={(event) => allCheckboxChanged(event)}
                checked={checkedList.length == cartList.length}
              />
              <label htmlFor="choose-all-checkbox" className="text-xl">
                {checkedList.length == cartList.length ||
                checkedList.length === 0 ? (
                  <>
                    Select all &#40;{cartList.length} item
                    {cartList.length <= 1 ? "" : "s"}&#41;
                  </>
                ) : (
                  <>
                    Select {checkedList.length} item
                    {checkedList.length <= 1 ? "" : "s"}
                  </>
                )}
              </label>
            </div>
            <div className="w-full flex flex-row items-center justify-between gap-16">
              <div className="flex flex-col items-start justify-around gap-2">
                <p>Vouchers:</p>
                <p>Discount:</p>
                <p>Total cost:</p>
              </div>
              <div className="flex flex-col items-end justify-around gap-2 min-w-fit">
                <p className="underline text-[#F1E15B]">Select or type</p>
                <p>-0 đ</p>
                <p>{CurrencySplitter(currentTotal)} đ</p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className={`px-6 py-2 rounded-full transition-all
              ${
                checkedList.length > 0
                  ? "bg-[#F1E15B] text-black hover:bg-[#CDBC2A]"
                  : "bg-[#F1E15B]/50"
              }`}
                disabled={checkedList.length === 0}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
