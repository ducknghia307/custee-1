import React from "react";
import { Modal } from "antd";
import { montserrat_400, montserrat_700 } from "@/assets/fonts/font";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosInstance";

export default function CancelOrderModal({
  orderCode,
  open,
  setOpen,
}: {
  orderCode: string;
  open: boolean;
  setOpen: Function;
}) {
  const cancelOrder = async () => {
    await axiosInstance
      .patch(`/api/order/status/${orderCode}`, {
        status: "cancelled",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    sessionStorage.setItem("cancelOrderCode", orderCode);
    window.location.replace("/order");
  };
  return (
    <Modal
      title="Cancel order"
      open={open}
      centered
      closable={true}
      maskClosable={true}
      footer={null}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
    >
      <p className={`text-lg font-extralight mb-4 ${montserrat_400.className}`}>
        Are you sure to cancel this order?
      </p>
      <p className="font-light text-xs mt-2">
        If you have paid for this order, please make sure that you have read
        our&nbsp;
        <Link
          href="/policy"
          className="underline hover:underline hover:text-sky-800"
        >
          Return Policy
        </Link>
        .
      </p>
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          onClick={cancelOrder}
          className="text-red-500 text-xs mr-4 hover:text-red-700 hover:underline"
        >
          Cancel this order
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className={`px-6 py-2 flex items-center gap-2 rounded-lg ${montserrat_700.className} bg-sky-500 hover:bg-sky-700 text-white`}
        >
          Keep this order
        </button>
      </div>
    </Modal>
  );
}
