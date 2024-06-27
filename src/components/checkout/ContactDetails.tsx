"use client";
import React, { useEffect, useState } from "react";
import { montserrat_600 } from "@/assets/fonts/font";
import { axiosInstance } from "@/utils/axiosInstance";

interface DeliveryInfo {
  recipientName: string;
  phone: string;
  address: string;
}

export default function CheckoutContactDetails({ getDeliveryInfo }: any) {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [editModeOn, setEditModeOn] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    recipientName: "",
    phone: "",
    address: "",
  });
  const {userId} = localStorage.userId;

  const getUserInfo = async () => {
    if (userId) {
      await axiosInstance
        .get(`/api/user/${userId}`)
        .then((res: any) => {
          setCurrentUser(res.data.metadata);
          setDeliveryInfo({
            recipientName: res.data.metadata.username,
            phone: res.data.metadata.phone,
            address: res.data.metadata.address ? res.data.metadata.address : "",
          });
          getDeliveryInfo({
            recipientName: res.data.metadata.username,
            phone: res.data.metadata.phone,
            address: res.data.metadata.address ? res.data.metadata.address : "",
          });
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getDeliveryInfo(deliveryInfo);
  }, [deliveryInfo]);

  return (
    <div className="w-full flex justify-between items-start gap-32 px-8 py-5 rounded-lg bg-[#F1E15B]/25 text-sm">
      <div className="w-1/3 flex flex-col gap-4">
        <p className={`${montserrat_600.className} text-lg`}>Contact details</p>
        <p
          className="text-xs text-[#784BE6] w-fit cursor-pointer hover:underline"
          onClick={(e) => {
            setEditModeOn(!editModeOn);
            if (!editModeOn) document.getElementById("first-edit")?.focus();
          }}
        >
          {editModeOn ? "Confirm" : "Edit info"}
        </p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="relative flex items-center gap-2">
          <p
            className={`${
              editModeOn ? "inline" : "hidden"
            } text-[8px] absolute left-[1%] bottom-[95%] z-10 opacity-70`}
          >
            Recipient&apos;s name:
          </p>
          <input
            id="first-edit"
            type="text"
            placeholder="Name (optional)"
            value={deliveryInfo.recipientName}
            onChange={(e) => {
              setDeliveryInfo({
                ...deliveryInfo,
                recipientName: e.target.value,
              });
            }}
            onFocus={() => setEditModeOn(true)}
            className="rounded-xl text-xs bg-transparent border-none focus:border"
          />
        </div>

        <div className="relative flex items-center gap-2">
          <p
            className={`${
              editModeOn ? "inline" : "hidden"
            } text-[8px] absolute left-[1%] bottom-[95%] z-10 opacity-70`}
          >
            Phone number: <span className="text-red-600 text-xs">*</span>
          </p>
          <input
            type="text"
            placeholder="Phone number"
            value={deliveryInfo.phone}
            onChange={(e) => {
              setDeliveryInfo({
                ...deliveryInfo,
                phone: e.target.value,
              });
            }}
            onFocus={() => setEditModeOn(true)}
            className="rounded-xl text-xs bg-transparent border-none focus:border"
          />
        </div>

        <div className="relative flex items-center gap-2">
          <p
            className={`${
              editModeOn ? "inline" : "hidden"
            } text-[8px] absolute left-[1%] bottom-[95%] z-10 opacity-70`}
          >
            Address: <span className="text-red-600 text-xs">*</span>
          </p>
          <input
            type="text"
            placeholder="Address"
            value={deliveryInfo.address}
            onChange={(e) => {
              setDeliveryInfo({
                ...deliveryInfo,
                address: e.target.value,
              });
            }}
            onFocus={() => setEditModeOn(true)}
            className="rounded-xl text-xs bg-transparent border-none focus:border"
          />
        </div>
      </div>
    </div>
  );
}
