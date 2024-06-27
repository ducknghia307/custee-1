"use client";
import React, { useEffect } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import background from "@/assets/images/thankYou/gradient01.png";
import { dela, montserrat_500, montserrat_700 } from "@/assets/fonts/font";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosInstance";

export default function Page() {
  const packedData = JSON.parse(sessionStorage.orderPackedData);
  const orderCode = packedData.order.code;

  const createOrder = async () => {
    if (packedData) {
      await axiosInstance
        .post(`/api/order`, packedData.order)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      await axiosInstance
        .get(`/api/order/code/${orderCode}`)
        .then((res) => {
          console.log("FOUND ORDER: ", res.data.metadata._id)
          const orderId = res.data.metadata._id;
          packedData.checkoutList.map((item: any) => {
            axiosInstance
              .post(`/api/orderItem`, {
                productId: item.productId._id,
                orderId: orderId,
                quantityPerSize: item.quantityPerSize,
                unitPrice: item.productId.price,
              })
              .then((res) => {
                console.log("CREATE ORDER ITEM: ", res.data);
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Packed data: ", packedData);
    }
  };

  const updatePaidStatus = async () => {
    await axiosInstance
      .get(`/api/payos/getPaymentLinkInformation/${orderCode}`)
      .then((res) => {
        console.log("Payment data: ", res.data);
        if (res.data.metadata.status === "PAID") {
          axiosInstance
            .patch(`/api/order/paidStatus/${orderCode}`)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("Packed data: ", packedData);
    if (!orderCode) window.location.replace("/");
    createOrder();
    if (packedData.order.paymentMethod.toLowerCase().match("card")) {
      updatePaidStatus();
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden">
      <Navbar />
      <div
        className={`w-screen h-screen flex items-center justify-center bg-no-repeat bg-cover ${montserrat_500.className}`}
        style={{
          backgroundImage: `url(${background.src})`,
        }}
      >
        <div className="w-1/2 flex flex-col gap-4 text-center">
          <p
            className={`${dela.className} text-[400%] text-wrap text-[#784BE6] tracking-wider drop-shadow-2xl`}
            style={{
              textShadow: "2px 2px #000",
            }}
          >
            THANK YOU FOR YOUR PURCHASE
          </p>
          <p className="text-[150%]">
            Your order{" "}
            <span className="text-[#784BE6] hover:underline">#{orderCode}</span>{" "}
            has been placed !
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <Link
              href="/order"
              className={`px-8 py-4 bg-white text-black rounded-full text-xl cursor-pointer hover:underline hover:bg-gray-200 ${montserrat_700.className}`}
            >
              CHECK ORDER
            </Link>
            <Link href="/cart" className="text-sm hover:underline">
              BACK
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
