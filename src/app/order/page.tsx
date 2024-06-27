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
    cost: number;
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

export default function Page() {
  const userId = localStorage.userId;
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortOrderList = (orderList: Order[]) => {
    var ordering: any = {},
      sortOrder = ["pending", "delivering", "completed", "cancelled"];
    for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
    return orderList.sort(function (a: any, b: any) {
      return ordering[a.status] - ordering[b.status];
    });
  };

  const fetchOrder = async () => {
    setIsLoading(true);
    if (userId) {
      await axiosInstance
        .get(`/api/order/user/${userId}`)
        .then((res) => {
          console.log("Order: ", res.data);
          setOrderList(sortOrderList(res.data.metadata));
        })
        .catch((err) => console.log(err));
    }
    setIsLoading(false);
  };

  const getPageStatus = () => {
    if (sessionStorage.payNowSucceeded) {
      toast.success(
        `You have successfully paid order ${sessionStorage.payNowSucceeded}.`
      );
    } else if (sessionStorage.payNowCancelled) {
      toast.info(
        `Aborted online payment order ${sessionStorage.payNowCancelled}.`
      );
    } else if (sessionStorage.cancelOrderCode) {
      toast.info(`Cancelled order ${sessionStorage.cancelOrderCode}.`);
    }
    setTimeout(() => {
      sessionStorage.clear();
    }, 10000);
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
          {orderList.map((order: Order, key) => {
            return <OrderListItem key={key} order={order} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
