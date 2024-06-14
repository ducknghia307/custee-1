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
    const [editModeOn, setEditModeOn] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        recipientName: "",
        phone: "",
        address: ""
    });
    const userId = localStorage.userId;

    const getUserInfo = async () => {
        if (userId) {
            await axiosInstance
                .get(`/api/user/${userId}`)
                .then((res: any) => {
                    setCurrentUser(res.data.metadata);
                    setDeliveryInfo({
                        recipientName: res.data.metadata.username,
                        phone: res.data.metadata.phone,
                        address: res.data.metadata.address,
                    });
                    getDeliveryInfo({
                        recipientName: res.data.metadata.username,
                        phone: res.data.metadata.phone,
                        address: res.data.metadata.address,
                    })
                })
                .catch((err: any) => console.log(err));
        }
    };

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        getDeliveryInfo(deliveryInfo)
    }, [deliveryInfo])

    return (
        <div className="w-full flex justify-between items-start gap-32 px-8 py-4 rounded-lg bg-[#F1E15B]/25 text-sm">
            <div className="w-1/3 flex flex-col gap-4">
                <p className={`${montserrat_600.className} text-lg`}>
                    Contact details
                </p>
                <p
                    className="text-xs text-[#784BE6] cursor-pointer hover:underline"
                    onClick={() => {
                        setEditModeOn(!editModeOn);
                        if (!editModeOn)
                            document.getElementById("first-edit")?.focus();
                    }}
                >
                    {editModeOn ? "Confirm" : "Edit info"}
                </p>
            </div>
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <p className={`${editModeOn ? "inline" : "hidden"}`}>
                        Recipient's name:
                    </p>
                    <input
                        id="first-edit"
                        type="text"
                        value={deliveryInfo.recipientName}
                        onChange={(e) => {
                            setDeliveryInfo({
                                ...deliveryInfo,
                                recipientName: e.target.value,
                            });
                        }}
                        onFocus={() => setEditModeOn(true)}
                        onBlur={() => setEditModeOn(false)}
                        className="rounded-xl text-xs bg-transparent border-none focus:border"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <p className={`${editModeOn ? "inline" : "hidden"}`}>
                        Phone number:
                    </p>
                    <input
                        type="text"
                        value={deliveryInfo.phone}
                        onChange={(e) => {
                            setDeliveryInfo({
                                ...deliveryInfo,
                                phone: e.target.value,
                            });
                        }}
                        onFocus={() => setEditModeOn(true)}
                        onBlur={() => setEditModeOn(false)}
                        className="rounded-xl text-xs bg-transparent border-none focus:border"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <p className={`${editModeOn ? "inline" : "hidden"}`}>
                        Address:
                    </p>
                    <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) => {
                            setDeliveryInfo({
                                ...deliveryInfo,
                                address: e.target.value,
                            });
                        }}
                        onFocus={() => setEditModeOn(true)}
                        onBlur={() => setEditModeOn(false)}
                        className="rounded-xl text-xs bg-transparent border-none focus:border"
                    />
                </div>
            </div>
        </div>


    );
}
