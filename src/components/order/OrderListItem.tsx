import React, { useEffect, useState } from "react";
import OrderListItemDetails from "./OrderListItemDetails";
import OrderListItemInfo from "./OrderListItemInfo";
import { axiosInstance } from "@/utils/axiosInstance";

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

export default function OrderListItem({ order }: { order: Order }) {
  const [orderItemList, setOrderItemList] = useState<OrderItem[]>([]);
  const getOrderItemList = async () => {
    await axiosInstance
      .get(`/api/orderItem/order/${order._id}`)
      .then((res) => {
        setOrderItemList(res.data.metadata);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrderItemList();
  }, []);

  return order === null ? null : (
    <div className="w-full flex flex-col">
      <OrderListItemInfo order={order} />
      <div className="border-b border-black w-full"></div>
      <OrderListItemDetails order={order} orderItemList={orderItemList} />
    </div>
  );
}
