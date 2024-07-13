import React, { useEffect, useState } from "react";
import { montserrat_400, montserrat_600 } from "@/assets/fonts/font";
import { Steps } from "antd";
import dateFormat from "@/assistants/date.format";
import moment from "moment";
import "./Order.css";
import CancelOrderModal from "./CancelOrderModal";
import ChangeDeliveryModal from "./ChangeDeliveryModal";
import { toast } from "react-toastify";
import SendFeedbackModal from "./SendFeedbackModal";
import Link from "next/link";
import { payNowRedirect } from "./PayNowRedirect";

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

export default function OrderListItemDetails({
  order,
  orderItemList,
}: {
  order: Order;
  orderItemList: OrderItem[];
}) {
  const [statusColor, setStatusColor] = useState<string>("#F9F4CE");
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [isUpdatingDelivery, setIsUpdatingDelivery] = useState(false);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [isRedirectingToPaymentLink, setIsRedirectingToPaymentLink] =
    useState(false);
  const estimatedDelivery = moment(order?.createdAt).add(4, "days").toDate();

  useEffect(() => {
    if (order?.status.match("delivering")) {
      setStatusColor("#E0F2FE");
    } else if (order?.status.match("processing")) {
      setStatusColor("#ffccff");
    } else if (order?.status.match("completed")) {
      setStatusColor("#DCFCE7");
    } else if (order?.status.match("cancelled")) {
      setStatusColor("#FEE2E2");
    }

    if (
      sessionStorage.updatedDeliveryInfo &&
      sessionStorage.updatedDeliveryInfo.match("true")
    ) {
      toast.success(
        `Order ${order?.code} delivery information has been successfully updated.`
      );
      sessionStorage.removeItem("updatedDeliveryInfo");
    }
  }, []);

  const getPaymentMethods = (code: string) => {
    if (code.toLowerCase().match("card")) {
      return "Paid online";
    } else {
      return "Cash on delivery";
    }
  };

  const getDeliveryStatus = (status: string) => {
    if (status.toLowerCase().match("pending")) {
      return (
        <div className="max-w-full flex items-center justify-center gap-1 text-xs opacity-90">
          <p className="text-wrap max-w-56 opacity-70">
            We are figuring out the last check and preparing to deliver &nbsp;
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-2 inline"
            >
              <circle cx="4" cy="12" r="3">
                <animate
                  id="spinner_qFRN"
                  begin="0;spinner_OcgL.end+0.25s"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.6s"
                  values="12;6;12"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
              </circle>
              <circle cx="12" cy="12" r="3">
                <animate
                  begin="spinner_qFRN.begin+0.1s"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.6s"
                  values="12;6;12"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
              </circle>
              <circle cx="20" cy="12" r="3">
                <animate
                  id="spinner_OcgL"
                  begin="spinner_qFRN.begin+0.2s"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.6s"
                  values="12;6;12"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
              </circle>
            </svg>
          </p>
        </div>
      );
    } else if (status.toLowerCase().match("delivering")) {
      return (
        <Steps
          direction="vertical"
          current={1}
          items={[
            {
              title: "Order placed",
              subTitle: dateFormat(order?.createdAt, "dddd, mmm dd"),
              description: <div className="py-2"></div>,
            },
            {
              title: "Estimated delivery date",
              description: (
                <div className="text-sm font-bold italic">
                  {moment(estimatedDelivery).from(moment(order?.createdAt))}
                </div>
              ),
              subTitle: dateFormat(estimatedDelivery, "dddd, mmm dd"),
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
                </svg>
              ),
            },
          ]}
        />
      );
    } else if (status.toLowerCase().match("completed")) {
      return (
        <Steps
          direction="vertical"
          current={2}
          items={[
            {
              title: "Order placed",
              subTitle: dateFormat(order?.createdAt, "dddd, mmm dd"),
              description: <div className="py-2"></div>,
            },
            {
              title: "Delivered date",
              description: (
                <div className="text-sm font-bold text-green-500">
                  <p>Successfully delivered.</p>
                  <div className="flex items-center gap-1">
                    <p className="min-w-fit">
                      We are glad you had it in your hand
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM7 13H9C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path>
                    </svg>
                  </div>
                </div>
              ),
              subTitle: dateFormat(estimatedDelivery, "dddd, mmm dd"),
            },
          ]}
        />
      );
    } else if (status.toLowerCase().match("cancelled")) {
      return (
        <div className="w-full flex items-center justify-center text-red-600 gap-1 text-sm opacity-70">
          This order has been cancelled.
        </div>
      );
    }
  };

  const getButtonGroup = (status: string) => {
    if (status.toLowerCase().match("pending")) {
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
              orderCode={order!.code}
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
    } else if (status.toLowerCase().match("delivering")) {
      return (
        <div className={`${montserrat_600.className}`}>
          <button
            onClick={() => setIsUpdatingDelivery(true)}
            className="text-sky-600 mr-4 hover:text-sky-700 hover:underline"
          >
            Change delivery information
            <ChangeDeliveryModal
              orderCode={order!.code}
              deliveryInfo={order!.deliveryInfo}
              open={isUpdatingDelivery}
              setOpen={setIsUpdatingDelivery}
            />
          </button>
        </div>
      );
    } else if (status.toLowerCase().match("completed")) {
      return (
        <div
          className={`${montserrat_600.className} flex items-center justify-center gap-2 mr-4`}
        >
          <Link
            href="/cart"
            className="px-4 py-1 flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
            </svg>
            Buy more
          </Link>
          <button
            onClick={() => setIsSendingFeedback(true)}
            className="px-4 py-1 flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-700 text-white"
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
              orderCode={order!.code}
              open={isSendingFeedback}
              setOpen={setIsSendingFeedback}
            />
          </button>
        </div>
      );
    }
    // else if (status.toLowerCase().match("cancelled")) {
    //   return (
    //     <div className={`${montserrat_600.className}`}>
    //       <Link
    //         href="/cart"
    //         className="px-4 py-1 flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-700 text-white mr-4"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           width="16"
    //           height="16"
    //           fill="currentColor"
    //         >
    //           <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
    //         </svg>
    //         Re-order
    //       </Link>
    //     </div>
    //   );
    // }
  };

  return order === null ? null : (
    <div className="flex flex-col gap-2">
      <div
        className={`w-full flex items-start justify-center px-16 py-2 rounded-b-lg ${montserrat_400.className}`}
        style={{
          backgroundColor: `${statusColor}`,
        }}
      >
        <div className="w-full flex justify-center items-start gap-8">
          <div className="w-full flex flex-col items-start gap-2 text-xs">
            <p className="w-full text-start text-xs opacity-70">
              Order options
            </p>
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M18.0049 6.99979H21.0049C21.5572 6.99979 22.0049 7.4475 22.0049 7.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H18.0049V6.99979ZM4.00488 8.99979V18.9998H20.0049V8.99979H4.00488ZM4.00488 4.99979V6.99979H16.0049V4.99979H4.00488ZM15.0049 12.9998H18.0049V14.9998H15.0049V12.9998Z"></path>
              </svg>
              {getPaymentMethods(order.paymentMethod)}
              <span className="text-[10px] opacity-70">
                {order.isPaid ? (
                  <span className="flex items-center gap-1 text-green-600">
                    Paid
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="currentColor"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                    </svg>
                  </span>
                ) : (
                  ""
                )}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
              </svg>
              {order.deliveryOptions.method.charAt(0).toUpperCase() +
                order.deliveryOptions.method.slice(1)}{" "}
              delivery
            </span>
          </div>

          <div className="w-full flex flex-col items-start gap-2 text-xs">
            <p className="w-full text-start text-xs opacity-70">
              Delivery Info
            </p>
            <p>{order.deliveryInfo.recipientName}</p>
            <p>{order.deliveryInfo.phone}</p>
            <p>{order.deliveryInfo.address}</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-2 text-sm">
          <p className="w-full text-center text-xs opacity-70 mb-2">
            Order status details
          </p>
          <div className="w-full flex items-center justify-center">
            {getDeliveryStatus(order.status)}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-between gap-4 my-auto pl-4 text-end">
        <button
          className={`text-blue-700 ${montserrat_400.className} text-xs hover:text-blue-900 hover:underline`}
        >
          {order.status !== "cancelled" ? (
            <Link href={`/order/details/${order.code}`}>View details</Link>
          ) : null}
        </button>
        {getButtonGroup(order.status)}
      </div>
    </div>
  );
}
