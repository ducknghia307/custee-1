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
import { axiosInstance } from "@/utils/axiosInstance";
import EmptyCartImage from "../../assets/images/cart/empty-cart.png";
import Link from "next/link";
import { Image, InputNumber } from "antd";
import Loading from "@/components/loading/Loading";

interface Product {
  _id: string;
  userId: string;
  name: string;
  price: number;
  pattern: string;
  images: {
    front: string;
    back: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
interface CartItem {
  _id: string;
  userId: string;
  productId: Product;
  quantityPerSize: {
    size: string;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default function Page() {
  const [checkedList, setCheckedList] = useState<CartItem[]>([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchCartItem = async () => {
    if (userId) {
      setIsLoading(true);
      axiosInstance
        .get(`/api/cartItem/user/${userId}`)
        .then((res: any) => {
          console.log("FETCHED: ", res.data.metadata);
          const fetched = res.data.metadata;
          fetched.map((item: CartItem) => {
            return sortSize(item);
          });
          setCartItemList(fetched);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    setIsLoading(false);
  };

  const sumQuantity = (quantityArray: any) => {
    return quantityArray.reduce(
      (n: number, { quantity }: { quantity: number }) => n + quantity,
      0
    );
  };

  const checkboxChanged = (event: any) => {
    const checkedItem = cartItemList.find(
      (element) => element._id == event.target.value
    );
    const allCheckboxes = document.querySelector("#choose-all-checkbox") as any;
    if (checkedItem && allCheckboxes) {
      if (event.target.checked) {
        setCheckedList((prevCheckedList) => [...prevCheckedList, checkedItem]);
      } else {
        allCheckboxes.checked = false;
        setCheckedList((prevCheckedList) =>
          prevCheckedList.filter((item) => item._id != checkedItem._id)
        );
      }
    }
  };

  const allCheckboxChanged = (e: any) => {
    if (e.target.checked) {
      setCheckedList(cartItemList);
    } else {
      setCheckedList([]);
    }
  };

  const updateTotal = () => {
    let total = 0;
    checkedList.forEach((item) => {
      total += sumQuantity(item.quantityPerSize) * item.productId.price;
    });
    setCurrentTotal(total);
  };

  const updateQuantity = async (
    cartItemId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity >= 0 && quantity < 100) {
      try {
        const res = await axiosInstance.patch(`/api/cartItem/${cartItemId}`, {
          size: size,
          quantity: quantity,
        });
        console.log("Update quantity: ", res.data);
        await fetchCartItem();
        setCheckedList((prevCheckedList) =>
          prevCheckedList.filter((item) => item._id !== cartItemId)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const sortSize = (cartItem: CartItem) => {
    var ordering: any = {},
      sortOrder = ["S", "M", "L", "XL", "XXL", "XXXL"];
    for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
    return cartItem.quantityPerSize.sort(function (a: any, b: any) {
      return (
        ordering[a.size] - ordering[b.size] || a.name.localeCompare(b.quantity)
      );
    });
  };

  const deleteCartItem = async (id: string) => {
    await axiosInstance
      .delete(`/api/cartItem/${id}`)
      .then((res: any) => {
        console.log("Delete cartItem: ", res.data);
        fetchCartItem();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  useEffect(() => {
    updateTotal();
  }, [checkedList]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16 overflow-x-hidden">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-28">
        <p className={`text-3xl font-black ${dela.className}`}>CART</p>
        {isLoading ? <Loading /> : null}
        {cartItemList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 font-thin py-16">
            <img src={EmptyCartImage.src} alt="" className="w-36 -z-10" />
            <p className={`${montserrat_600.className} text-lg`}>
              NO ITEMS IN CART
            </p>
            <p
              className={`${montserrat_400.className} text-xs opacity-80 text-gray-500`}
            >
              Go get some from your{" "}
              <Link
                href="/cart/temp"
                className="underline bold hover:text-black"
              >
                collection
              </Link>
              &nbsp;!
            </p>
          </div>
        ) : (
          <div className="relative w-3/4 rounded-xl flex flex-col mt-8 overflow-x-hidden overflow-y-auto">
            <div
              className={`w-full h-10 bg-[#784BE6]/50 ${montserrat_500.className} flex flex-row items-center justify-center`}
            >
              <p className="w-full text-center">Product</p>
              <p className="w-3/4 text-center">Price</p>
              <p className="w-1/4 text-center">Quantity</p>
              <p className="w-3/4 text-center">Total</p>
            </div>
            <div
              className={`w-full min-h-fit max-h-96 bg-[#F1E15B]/40 flex flex-col items-start justify-start overflow-x-hidden overflow-y-auto scrollbar scrollbar-track-violet-200 scrollbar-thumb-violet-500 active:scrollbar-thumb-violet-800
             ${montserrat_500.className}`}
            >
              {cartItemList.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="relative group w-full bg-transparent flex flex-row justify-center items-center min-h-48 max-h-48 pl-[20px] border-b border-gray-600 last:border-none overflow-hidden hover:bg-[#F1E15B]/50 transition-all duration-75"
                  >
                      <div className="flex flex-row items-center w-full">
                      <div className="flex">
                        <input
                          id={`checkbox-${item._id}`}
                          type="checkbox"
                          className="border-gray-200 rounded text-yellow-600 cursor-pointer focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          onChange={(event) => checkboxChanged(event)}
                          value={item._id}
                          checked={
                            checkedList.find(
                              (element) => element._id === item._id
                            )
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div className="flex items-center justify-center flex-row w-full">
                        <Image width="100px" src={item.productId.images.front} />
                        <Image width="100px" src={item.productId.images.back} />
                        <p className="ml-1">{item.productId.name}</p>
                      </div>
                    </div>

                    <div className="min-w-fit w-3/4 text-center">
                      {CurrencySplitter(item.productId.price)} &#8363;
                    </div>
                    <div
                      className={`group flex flex-col items-center min-w-fit w-1/4 text-center`}
                    >
                      {item.quantityPerSize.map((q, key) => {
                        return (
                          <div
                            key={key}
                            className="group/size w-full flex flex-row justify-between items-center text-sm"
                          >
                            <span
                              className={`font-extrabold flex flex-row items-center justify-between gap-2 ${
                                q.quantity === 0
                                  ? "hidden group-hover:flex"
                                  : ""
                              }`}
                            >
                              <div className="w-12 text-end">{q.size}: </div>
                              <div className="flex items-center justify-center gap-1">
                                <InputNumber
                                  className="bg-transparent w-fit max-w-10"
                                  variant="borderless"
                                  controls={false}
                                  min={0}
                                  max={99}
                                  value={q.quantity}
                                  onBlur={(event) =>
                                    updateQuantity(
                                      item._id,
                                      q.size,
                                      parseInt(event.target.value)
                                    )
                                  }
                                />
                                <div className="flex items-center justify-center gap-1 invisible group-hover/size:visible">
                                  <span className="flex flex-col">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="15"
                                      height="15"
                                      fill="currentColor"
                                      className="rounded-sm hover:bg-[#CDBC2A] cursor-pointer"
                                      onClick={() =>
                                        updateQuantity(
                                          item._id,
                                          q.size,
                                          q.quantity + 1
                                        )
                                      }
                                    >
                                      <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                                    </svg>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="15"
                                      height="15"
                                      fill="currentColor"
                                      className="rounded-sm hover:bg-[#CDBC2A] cursor-pointer"
                                      onClick={() =>
                                        updateQuantity(
                                          item._id,
                                          q.size,
                                          q.quantity - 1
                                        )
                                      }
                                    >
                                      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                                    </svg>
                                  </span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="20"
                                    className={`fill-red-500 hover:fill-red-600 cursor-pointer ${
                                      q.quantity === 0 ? "!invisible" : ""
                                    }`}
                                    onClick={() =>
                                      updateQuantity(item._id, q.size, 0)
                                    }
                                  >
                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                  </svg>
                                </div>
                              </div>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="min-w-fit w-3/4 text-center">
                      {CurrencySplitter(
                        sumQuantity(item.quantityPerSize) * item.productId.price
                      )}{" "}
                      &#8363;
                    </div>
                    <div className="absolute top-50 right-1 lg:right-5 xl:right-10 hidden group-hover:flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        className="fill-red-500 hover:fill-red-600 cursor-pointer"
                        onClick={() => deleteCartItem(item._id)}
                      >
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                      </svg>
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
                  checked={
                    checkedList.length == cartItemList.length &&
                    checkedList.length > 0
                  }
                />
                <label
                  htmlFor="choose-all-checkbox"
                  className="text-xl cursor-pointer"
                >
                  {checkedList.length == cartItemList.length ||
                  checkedList.length === 0 ? (
                    <>
                      Select all &#40;{cartItemList.length} item
                      {cartItemList.length <= 1 ? "" : "s"}&#41;
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
                  <Link href="/cart/temp" className="underline text-[#F1E15B]">
                    Select or type
                  </Link>
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
                  : "bg-[#F1E15B]/50 cursor-not-allowed"
              }`}
                  disabled={checkedList.length === 0}
                  onClick={() => {
                    sessionStorage.setItem(
                      "checkoutList",
                      JSON.stringify(checkedList)
                    );
                    window.location.replace("/checkout");
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
