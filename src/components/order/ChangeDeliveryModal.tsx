import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { montserrat_700 } from "@/assets/fonts/font";
import { axiosInstance } from "@/utils/axiosInstance";

interface DeliveryInfo {
  recipientName: string;
  phone: string;
  address: string;
}

export default function ChangeDeliveryModal({
  orderCode,
  deliveryInfo,
  open,
  setOpen,
}: {
  orderCode: string;
  deliveryInfo: DeliveryInfo;
  open: boolean;
  setOpen: Function;
}) {
  const [updatedDeliveryInfo, setUpdatedDeliveryInfo] =
    useState<DeliveryInfo>(deliveryInfo);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const updateOrderDelivery = async () => {
    await axiosInstance
      .patch(`/api/order/deliveryInfo/${orderCode}`, {
        recipientName: updatedDeliveryInfo.recipientName,
        phone: updatedDeliveryInfo.phone,
        address: updatedDeliveryInfo.address,
      })
      .then((res) => {
        console.log("Updated delivery info: ", res.data);
        setOpen(false);
        sessionStorage.setItem("updatedDeliveryInfo", "true");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (updatedDeliveryInfo !== deliveryInfo) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [updatedDeliveryInfo]);

  useEffect(() => {
    if (
      (updatedDeliveryInfo.phone.startsWith("0") &&
        updatedDeliveryInfo.phone.length > 11) ||
      !/^[0-9\-\+]{9,15}$/.test(updatedDeliveryInfo.phone)
    ) {
      setIsInvalidPhone(true);
    } else {
      setIsInvalidPhone(false);
    }
  }, [updatedDeliveryInfo.phone]);

  return (
    <Modal
      title="Update delivery information"
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
      <div className="flex flex-col items-start gap-2">
        <div className="w-full flex flex-col gap-1">
          <p className="text-[10px] opacity-70 pl-1">Recipient's name</p>
          <input
            type="text"
            value={updatedDeliveryInfo.recipientName}
            onChange={(e) => {
              setUpdatedDeliveryInfo({
                ...updatedDeliveryInfo,
                recipientName: e.target.value,
              });
            }}
            className="w-2/3 rounded-lg"
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <p className="text-[10px] opacity-70 pl-1">Phone number</p>
          <div>
            <input
              type="text"
              value={updatedDeliveryInfo.phone}
              maxLength={13}
              onChange={(e) => {
                setUpdatedDeliveryInfo({
                  ...updatedDeliveryInfo,
                  phone: e.target.value.replace(/ /g, ""),
                });
              }}
              className="w-2/3 rounded-lg"
            />
            <span
              className={`ml-2 text-[10px] text-red-500 ${
                isInvalidPhone ? "visible" : "invisible"
              }`}
            >
              <span className="font-black pr-1">X</span> Invalid phone number
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <p className="text-[10px] opacity-70 pl-1">Address</p>
          <input
            type="text"
            value={updatedDeliveryInfo.address}
            onChange={(e) => {
              setUpdatedDeliveryInfo({
                ...updatedDeliveryInfo,
                address: e.target.value,
              });
            }}
            className="w-2/3 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          onClick={(e) => {
            setUpdatedDeliveryInfo(deliveryInfo);
            e.stopPropagation();
            setOpen(false);
          }}
          className="text-red-500 text-xs mr-4 hover:text-red-700 hover:underline"
        >
          Abort changes
        </button>
        <button
          disabled={!isChanged || isInvalidPhone}
          onClick={updateOrderDelivery}
          className={`px-6 py-2 flex items-center gap-2 rounded-lg text-white ${montserrat_700.className} bg-sky-500 hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          Update information
        </button>
      </div>
    </Modal>
  );
}
