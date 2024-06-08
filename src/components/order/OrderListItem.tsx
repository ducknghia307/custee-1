import React from "react";
import OrderListItemDetails from "./OrderListItemDetails";
import OrderListItemInfo from "./OrderListItemInfo";

interface Order {
  _id: string;
  userId: any;
  code: string;
  total: number;
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

export default function OrderListItem({ order }: { order: Order | null }) {
  return order === null ? null : (
    <div className="w-full flex flex-col">
      <OrderListItemInfo order={order} />
      <div className="border-b border-black w-full"></div>
      <OrderListItemDetails order={order} />
    </div>
  );
}
