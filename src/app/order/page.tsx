"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { dela, montserrat_400, montserrat_600 } from "@/assets/fonts/font";
import OrderListItem from "@/components/order/OrderListItem";
import { axiosInstance } from "@/utils/axiosInstance";
import Loading from "@/components/loading/Loading";
import { toast } from "react-toastify";
import Link from "next/link";
import EmptyCartImage from "../../assets/images/cart/empty-cart.png";

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
    cose: number;
  };
  discountValue: string;
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

export default function page() {
  const userId = localStorage.userId;
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrder = async () => {
    setIsLoading(true);
    if (userId) {
      await axiosInstance
        .get(`/api/order/user/${userId}`)
        .then((res) => {
          console.log("Order: ", res.data);
          setOrderList(res.data.metadata);
        })
        .catch((err) => console.log(err));
    }
    setIsLoading(false);
  };

  const getPageStatus = async () => {
    if (!sessionStorage.payNowOrder) return;
    else {
      const payNowOrder = JSON.parse(sessionStorage.payNowOrder);
      console.log("PayNowOrder: ", payNowOrder);
      await axiosInstance
        .get(`/api/payos/getPaymentLinkInformation/${payNowOrder.code}`)
        .then((res) => {
          if (res.data.metadata.status === "CANCELLED") {
            axiosInstance
              .patch(`/api/order/${payNowOrder.code}`, {
                paymentLink: payNowOrder.paymentLink,
              })
              .then((res) => {
                console.log("Cancel payment link: ", res.data);
              })
              .catch((err) => console.log(err));

            toast.warning("Online payment has been aborted.");
          } else if (res.data.metadata.status === "PAID") {
            axiosInstance
              .patch(`/api/order/paymentMethod/${payNowOrder.code}`, {
                paymentMethod: "Card",
              })
              .then((res) => {
                console.log("Update payment method: ", res.data);
              })
              .catch((err) => console.log(err));

            axiosInstance
              .patch(`/api/order/paidStatus/${payNowOrder.code}`)
              .then((res) => {
                console.log("Update paid status: ", res.data);
              })
              .catch((err) => console.log(err));

            toast.success(`Successfully paid order ${payNowOrder.code}`);
          }
        });
    }
    if (!sessionStorage.cancelOrderCode) return;
    else {
      toast.info(`Order ${sessionStorage.cancelOrderCode} has been cancelled.`);
    }
  };

  useEffect(() => {
    getPageStatus();
    fetchOrder();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>ORDER</p>
        {isLoading ? <Loading /> : null}
        {orderList.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 font-thin py-16">
            <img src={EmptyCartImage.src} alt="" className="w-36 -z-10" />
            <p className={`${montserrat_600.className} text-lg`}>
              NO ORDER YET
            </p>
            <p
              className={`${montserrat_400.className} text-xs opacity-80 text-gray-500`}
            >
              Go get some from your{" "}
              <Link href="/cart" className="underline bold hover:text-black">
                cart
              </Link>
              &nbsp;!
            </p>
          </div>
        ) : null}
        <div className="w-full xl:w-2/3 mx-2 flex flex-col items-center gap-8 mt-8">
          {orderList.map((order: Order) => {
            return <OrderListItem order={order} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
