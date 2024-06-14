import React from "react";
import CurrencySplitter from "@/assistants/currencySpliter";
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

export default function OrderItem({ orderItem }: { orderItem: OrderItem }) {
  const sumQuantity = (quantityArray: any) => {
    return quantityArray.reduce(
      (n: any, { quantity }: { quantity: any }) => n + quantity,
      0
    );
  };
  return (
    <div className="min-h-24 w-full flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <img src={orderItem.productId.images.front} alt="" className="w-20" />
        <div className="flex flex-col items-start gap-1 px-2">
          <p className="font-bold">{orderItem.productId.name}</p>
          <div className="flex items-center justify-center gap-4">
            <p className="text-sm pr-4 border-r border-gray-400 opacity-50">
              {CurrencySplitter(orderItem.unitPrice)} &#8363;
            </p>
            {orderItem.quantityPerSize.map((q: any) => {
              if (q.quantity > 0)
                return (
                  <span className="flex flex-row items-center gap-1 text-sm">
                    <span className="font-bold">{q.size}:</span>
                    <span>{q.quantity}</span>
                  </span>
                );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="font-bold text-lg">
          {CurrencySplitter(
            sumQuantity(orderItem.quantityPerSize) * orderItem.unitPrice
          )}{" "}
          &#8363;
        </div>
        <div className="text-sm opacity-50">
          Quantity: {sumQuantity(orderItem.quantityPerSize)}
        </div>
      </div>
    </div>
  );
}
