import dateFormat from "@/assistants/date.format";
import { Breadcrumb } from "antd";
import React, { useState } from "react";
import moment from "moment";
import OrderItemComponent from "./OrderItem";
import CancelOrderModal from "../CancelOrderModal";
import ChangeDeliveryModal from "../ChangeDeliveryModal";
import SendFeedbackModal from "../SendFeedbackModal";
import { payNowRedirect } from "../PayNowRedirect";
import { montserrat_600 } from "@/assets/fonts/font";

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

export default function OrderInfo({
  order,
  orderItemList,
}: {
  order: Order;
  orderItemList: OrderItem[];
}) {
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [isUpdatingDelivery, setIsUpdatingDelivery] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const estimatedDelivery = moment(order?.createdAt).add(4, "days").toDate();

  const breadcrumbItems = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/order",
      title: "Order",
    },
    {
      title: `Order ${order.code}`,
    },
  ];

  const getOrderStatus = () => {
    if (order?.status.match("pending")) {
      return (
        <p className="text-yellow-600 hover:text-yellow-700 cursor-default">
          PENDING
        </p>
      );
    } else if (order?.status.match("delivering")) {
      return (
        <p className="text-sky-700 hover:text-sky-800 cursor-default">
          IN DELIVERY
        </p>
      );
    } else if (order?.status.match("completed")) {
      return (
        <p className="text-green-700 hover:text-green-800 cursor-default">
          COMPLETED
        </p>
      );
    } else if (order?.status.match("cancelled")) {
      return (
        <p className="text-red-700 hover:text-red-800 cursor-default">
          CANCELLED
        </p>
      );
    }
  };

  const getButtonGroup = () => {
    if (order.status.toLowerCase() === "pending") {
      return (
        <div
          className={`${montserrat_600.className} flex items-center justify-center gap-2 mr-4`}
        >
          <button
            onClick={() => setIsCancellingOrder(true)}
            className="text-red-500 mr-4 hover:text-red-700 hover:underline"
          >
            Cancel order
            <CancelOrderModal
              orderCode={order.code}
              open={isCancellingOrder}
              setOpen={setIsCancellingOrder}
            />
          </button>
          {order?.paymentMethod.toLowerCase().match("card") ||
          order.isPaid ? null : (
            <button
              onClick={() => {
                payNowRedirect({
                  order: order,
                  items: orderItemList,
                });
              }}
              className="px-4 py-1 flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-700 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M18.0049 6.99979H21.0049C21.5572 6.99979 22.0049 7.4475 22.0049 7.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H18.0049V6.99979ZM4.00488 8.99979V18.9998H20.0049V8.99979H4.00488ZM4.00488 4.99979V6.99979H16.0049V4.99979H4.00488ZM15.0049 12.9998H18.0049V14.9998H15.0049V12.9998Z"></path>
              </svg>
              Pay now
            </button>
          )}
        </div>
      );
    } else if (order.status.toLowerCase() === "delivering") {
      return (
        <button
          onClick={() => setIsUpdatingDelivery(true)}
          className="px-4 py-1 flex items-center gap-2 rounded-lg bg-sky-600 text-white mr-4 hover:bg-sky-700"
        >
          Change delivery information
          <ChangeDeliveryModal
            orderCode={order.code}
            deliveryInfo={order.deliveryInfo}
            open={isUpdatingDelivery}
            setOpen={setIsUpdatingDelivery}
          />
        </button>
      );
    } else if (order.status.toLowerCase() === "completed") {
      return (
        <button
          onClick={() => setIsUpdatingDelivery(true)}
          className="px-4 py-1 flex items-center gap-2 rounded-lg bg-green-600 text-white mr-4 hover:bg-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path>
          </svg>
          Send feedback
          <SendFeedbackModal
            orderCode={order.code}
            open={isUpdatingDelivery}
            setOpen={setIsUpdatingDelivery}
          />
        </button>
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="w-full flex items-center justify-between">
        <p className="text-3xl font-bold">Order ID: {order.code}</p>
        <div className="flex items-center gap-4">{getButtonGroup()}</div>
      </div>
      <div className="flex items-start justify-start">
        <div className="pr-4 border-r border-black">
          Order date:&emsp;{dateFormat(order.createdAt, "mmm dd, yyyy")}
        </div>
        <div className="flex items-center gap-2 text-green-600 font-black pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
          </svg>
          <p>
            Estimated delivery:&emsp;
            {dateFormat(estimatedDelivery, "mmm dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="min-h-80 max-h-80 w-full flex flex-col items-center justify-start gap-2 border-t border-gray-300 px-2 overflow-x-hidden overflow-y-auto">
        {orderItemList
          ? orderItemList.map((item: OrderItem) => {
              return <OrderItemComponent orderItem={item} />;
            })
          : order._id}
      </div>
    </div>
  );
}
