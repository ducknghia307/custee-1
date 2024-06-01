"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import {
  dela,
  montserrat_400,
  montserrat_500,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import { axiosInstance } from "@/utils/axiosInstance";
import { Collapse, Select } from "antd";
import CurrencySplitter from "@/assistants/currencySpliter";
import { generateOrderCode } from "@/assistants/generators";
import "./style.css";

export default function page() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [checkoutList, setCheckoutList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalIncludingDelivery, setTotalIncludingDelivery] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState<{
    method: string;
    cost: number;
  }>({ method: "", cost: 0 });
  const [discountValue, setDiscountValue] = useState(0);

  const userId = localStorage.userId;

  const getUserInfo = async () => {
    if (userId) {
      await axiosInstance
        .get(`/api/user/${userId}`)
        .then((res: any) => {
          setCurrentUser(res.data.metadata);
        })
        .catch((err: any) => console.log(err));
    }
  };

  const getCheckoutList = () => {
    const list = JSON.parse(sessionStorage.checkoutList);
    setCheckoutList(list);
    setTotal(0);
    list.map((item: any) => {
      setTotal(
        (oldTotal) =>
          oldTotal + sumQuantity(item.quantityPerSize) * item.productId.price
      );
    });
  };

  useEffect(() => {
    getUserInfo();
    getCheckoutList();
  }, []);

  const handleSelectPaymentMethod = (value: string) => {
    setPaymentMethod(value);
  };
  const handleSelectDelivery = (value: string) => {
    setDeliveryOptions(JSON.parse(value));
    setTotalIncludingDelivery(0);
    setTotalIncludingDelivery(total + JSON.parse(value).cost);
  };
  const handleSelectDiscount = (value: string) => {
    setDiscountValue(parseFloat(value));
    setDiscountAmount(total * parseFloat(value));
  };

  const sumQuantity = (quantityArray: any[]) => {
    var sum = 0;
    quantityArray.map((item) => {
      sum += item.quantity;
    });
    return sum;
  };

  const handleCompleteOrder = async () => {
    const newOrderCode = generateOrderCode(6, "");
    await axiosInstance
      .post(`/api/order`, {
        userId: userId,
        code: newOrderCode,
        paymentMethod: paymentMethod,
        deliveryOptions: deliveryOptions,
        discountValue: discountValue,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    await axiosInstance
      .get(`/api/order/code/${newOrderCode}`)
      .then((res) => {
        const orderId = res.data.metadata._id;
        checkoutList.map((item) => {
          axiosInstance
            .post(`/api/orderItem`, {
              productId: item.productId,
              orderId: orderId,
              unitPrice: item.productId.price,
              quantityPerSize: item.quantityPerSize,
            })
            .then((res) => {
              console.log(res.data);
              sessionStorage.setItem("orderCode", newOrderCode);
              window.location.replace("/checkout/completed");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <main className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden">
        <Navbar />
        <div
          className={`w-full mx-4 lg:w-2/3 flex flex-col items-center justify-center my-28 ${montserrat_400.className}`}
        >
          <p className={`text-3xl font-black ${dela.className} mb-16`}>
            CHECKOUT
          </p>

          {/* Personal information */}
          <div className="w-full flex justify-between items-start gap-32 px-8 py-4 rounded-lg bg-[#F1E15B]/25 text-sm">
            <div className="w-1/3 flex flex-col gap-4">
              <p className={`${montserrat_600.className} text-lg`}>
                Contact details
              </p>
              <p className="text-xs text-[#784BE6] cursor-pointer hover:underline">
                Edit info
              </p>
            </div>
            <div className="w-full flex flex-col gap-4">
              <p>{currentUser.username}</p>
              <p>{currentUser.phone}</p>
              <p>{currentUser.address}</p>
            </div>
          </div>

          {/* Checkout product list */}
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

          {/* Payment method */}
          <div className="w-full flex justify-between items-start gap-32 px-8 py-4 bg-[#F1E15B]/25 text-sm border-b-2 border-[#784BE6]">
            <div className="w-1/3 flex flex-col gap-4">
              <p className={`${montserrat_600.className} text-lg`}>
                Payment method
              </p>
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
              >
                {paymentMethod === "Card" ? "**** ***** ****** 7890" : null}
              </div>
            </div>
          </div>

          {/* Delivery method */}
          <div className="w-full flex justify-between items-start gap-32 px-8 py-4 bg-[#F1E15B]/25 text-sm border-b-2 border-[#784BE6]">
            <div className="w-1/3 flex flex-col gap-4">
              <p className={`${montserrat_600.className} text-lg`}>
                Shipping agent
              </p>
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
                    value: JSON.stringify({
                      method: "ultra fast",
                      cost: 50000,
                    }),
                    label: "Ultra-fast",
                  },
                  {
                    value: JSON.stringify({
                      method: "fast",
                      cost: 30000,
                    }),
                    label: "Fast",
                  },
                  {
                    value: JSON.stringify({
                      method: "regular",
                      cost: 10000,
                    }),
                    label: "Regular",
                  },
                ]}
                onSelect={(value: string) => handleSelectDelivery(value)}
                className={`w-1/2 ${montserrat_400.className}`}
              ></Select>
              <div
                className={`${montserrat_400.className} min-w-fit text-sm flex items-center text-xs text-gray-800`}
              >
                {deliveryOptions.cost > 0 ? (
                  <>{CurrencySplitter(deliveryOptions.cost)} &#8363;</>
                ) : null}
              </div>
            </div>
          </div>

          {/* Discount */}
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

          {/* Total */}
          <div
            className={`w-full flex justify-between items-start gap-32 px-8 py-4 mt-4 rounded-lg bg-[#F1E15B]/25 text-xl text-[#784BE6] ${dela.className}`}
          >
            <div className="w-1/3">
              <p>TOTAL</p>
            </div>
            <div className="w-3/4 text-end mr-8">
              {CurrencySplitter(
                totalIncludingDelivery > 0
                  ? totalIncludingDelivery - discountAmount
                  : total - discountAmount
              )}
              &ensp;đ
            </div>
          </div>

          <div className="w-full mt-4 flex items-center justify-end gap-8">
            <p
              className={`${montserrat_400.className} text-[#784BE6] text-sm cursor-pointer hover:underline`}
              onClick={() => window.location.replace("/cart")}
            >
              Cancel
            </p>
            <button
              className={`px-10 py-4 bg-[#784BE6] ${montserrat_700.className} text-white rounded-full hover:bg-[#4317B0] disabled:opacity-70 disabled:bg-gray-300 disabled:cursor-not-allowed`}
              disabled={paymentMethod === "" || deliveryOptions.method === ""}
              onClick={() => handleCompleteOrder()}
            >
              COMPLETE
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
