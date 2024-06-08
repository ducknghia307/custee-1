"use client";
import React from "react";
import CurrencySplitter from "@/assistants/currencySpliter";

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
    cost: number;
  };
  discountValue: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function OrderDetails({ order }: { order: Order }) {
  const getPaymentMethod = () => {
    if (order?.paymentMethod.toLowerCase().match("CARD")) {
      return (
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979ZM20.0049 10.9998H4.00488V18.9998H20.0049V10.9998ZM20.0049 8.99979V4.99979H4.00488V8.99979H20.0049ZM14.0049 14.9998H18.0049V16.9998H14.0049V14.9998Z"></path>
          </svg>
          Paid online
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M12.0004 16C14.2095 16 16.0004 14.2091 16.0004 12 16.0004 9.79086 14.2095 8 12.0004 8 9.79123 8 8.00037 9.79086 8.00037 12 8.00037 14.2091 9.79123 16 12.0004 16ZM21.0049 4.00293H3.00488C2.4526 4.00293 2.00488 4.45064 2.00488 5.00293V19.0029C2.00488 19.5552 2.4526 20.0029 3.00488 20.0029H21.0049C21.5572 20.0029 22.0049 19.5552 22.0049 19.0029V5.00293C22.0049 4.45064 21.5572 4.00293 21.0049 4.00293ZM4.00488 15.6463V8.35371C5.13065 8.017 6.01836 7.12892 6.35455 6.00293H17.6462C17.9833 7.13193 18.8748 8.02175 20.0049 8.3564V15.6436C18.8729 15.9788 17.9802 16.8711 17.6444 18.0029H6.3563C6.02144 16.8742 5.13261 15.9836 4.00488 15.6463Z"></path>
          </svg>
          Cash on delivery
        </div>
      );
    }
  };
  return (
    <div className="w-1/2 flex flex-col items-start border-l border-black px-4">
      <div className="w-full flex items-start justify-center border-b border-gray-200 py-4">
        <div className="w-full flex flex-col items-start justify-center gap-2">
          <p className="font-bold">Payment</p>
          <p className="text-sm">{getPaymentMethod()}</p>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-2">
          <p className="font-bold">Delivery</p>
          <div className="flex flex-col items-start gap-1">
            <p className="opacity-50 text-xs">Address</p>
            <p>{order?.deliveryInfo.phone}</p>
            <p>{order?.deliveryInfo.address}</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="opacity-50 text-xs">Delivery method</p>
            <p>{order?.deliveryOptions.method} delivery</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start justify-center py-4">
        <div className="w-full flex flex-col items-start justify-center gap-2">
          <p className="font-bold">Need help?</p>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 14H13V16H11V14ZM8.56731 8.81346C8.88637 7.20919 10.302 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13H11V11H12C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.2723 8 10.6656 8.51823 10.5288 9.20577L8.56731 8.81346Z"></path>
            </svg>
            <p>Order Issues</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
            >
              <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
            </svg>
          </div>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
            </svg>
            <p>Delivery Info</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
            >
              <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
            </svg>
          </div>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M17.0005 18.1716L14.4649 15.636L13.0507 17.0503L18.0005 22L22.9502 17.0503L21.536 15.636L19.0005 18.1716V11C19.0005 6.58172 15.4187 3 11.0005 3C6.58218 3 3.00046 6.58172 3.00046 11V20H5.00046V11C5.00046 7.68629 7.68675 5 11.0005 5C14.3142 5 17.0005 7.68629 17.0005 11V18.1716Z"></path>
            </svg>
            <p>Return policy</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
            >
              <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
            </svg>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-2">
          <p className="font-bold">Summary</p>
          <div className="w-full flex justify-between">
            <p>Subtotal</p>
            <p>
              {order?.discountValue! > 0
                ? CurrencySplitter(
                    order?.total! +
                      order?.total! * order?.discountValue! -
                      order?.deliveryOptions.cost!
                  )
                : CurrencySplitter(
                    order?.total! - order?.deliveryOptions.cost!
                  )}
              &ensp;&#8363;
            </p>
          </div>
          <div className="w-full flex justify-between text-xs opacity-60">
            <p>Delivery cost</p>
            <p>
              {CurrencySplitter(order?.deliveryOptions.cost)}
              &ensp;&#8363;
            </p>
          </div>
          <div className="w-full flex justify-between text-xs opacity-60 border-b border-black border-dashed pb-4">
            <p>Discount</p>
            <p>
              {order?.discountValue === 0 ? (
                <>0&ensp;&#8363;</>
              ) : (
                <>
                  &#40;{order?.discountValue! * 100}%&#41; &ensp;
                  {CurrencySplitter(order?.total! * order?.discountValue!)}
                  &ensp;&#8363;
                </>
              )}
            </p>
          </div>
          <div className="w-full flex justify-between font-extrabold">
            <p>TOTAL</p>
            <p>
              {CurrencySplitter(order?.total)}
              &ensp;&#8363;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
