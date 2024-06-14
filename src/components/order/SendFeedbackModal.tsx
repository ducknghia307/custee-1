import React, { useState } from "react";
import { Input, Modal, Rate } from "antd";
import { montserrat_400, montserrat_700 } from "@/assets/fonts/font";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosInstance";

export default function SendFeedbackModal({
  orderCode,
  open,
  setOpen,
}: {
  orderCode: string;
  open: boolean;
  setOpen: Function;
}) {
  const [productQuality, setProductQuality] = useState(0);
  const [serviceQuality, setServiceQuality] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const handleSendFeedBack = async () => {
    console.log(`ORDER ${orderCode}`);
    console.log("Product: ", productQuality);
    console.log("Service: ", serviceQuality);
    console.log("Feedback Text: ", feedbackText);
    console.log("IsPublic: ", isPublic);
  };

  return (
    <Modal
      title="Sending feedback"
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
      <div
        className={`w-full flex flex-col items-start gap-4 my-4 ${montserrat_400.className}`}
      >
        <div className="w-2/3 flex items-start justify-between gap-1">
          <p>CusTee Product</p>
          <Rate
            value={productQuality}
            onChange={(rating) => setProductQuality(rating)}
          />
        </div>

        <div className="w-2/3 flex items-start justify-between gap-1">
          <p>Custee Service</p>
          <Rate
            value={serviceQuality}
            onChange={(rating) => setServiceQuality(rating)}
          />
        </div>
      </div>
      <Input.TextArea
        rows={4}
        autoSize={true}
        placeholder="Please share us your experience using CusTee..."
        maxLength={500}
        onChange={(e) => {
          setFeedbackText(e.target.value);
        }}
        className="py-2 mb-4"
      />
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
          className="rounded-sm"
        />
        <p className="inline font-light text-xs">
          Your feedback about CusTee will be revealed publicly to share with
          others.
        </p>
      </div>
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          onClick={() => setOpen(false)}
          className="text-gray-700 text-xs mr-4 hover:text-gray-500 hover:underline"
        >
          Cancel
        </button>
        <button
          disabled={productQuality === 0 || serviceQuality === 0}
          onClick={handleSendFeedBack}
          className={`px-6 py-2 flex items-center gap-2 rounded-lg  text-white ${montserrat_700.className} bg-green-500 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-200`}
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
        </button>
      </div>
    </Modal>
  );
}
