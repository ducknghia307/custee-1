"use client";
import React, { useEffect, useState } from "react";
import { montserrat_600 } from "@/assets/fonts/font";
import { axiosInstance } from "@/utils/axiosInstance";
import { Modal, Select } from "antd";
import axios from "axios";

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

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [addressInfo, setAddressInfo] = useState({
    province: "",
    district: "",
    ward: "",
    details: "",
  });

  const { userId } = localStorage.userId;

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

  const fetchProvinceList = async () => {
    await axiosInstance
      .get("/api/address/provinces")
      .then((res: any) => {
        const provincesList = res.data.metadata.map((item: any) => ({
          ...item,
          label: item.province_name,
          value: JSON.stringify({
            id: item.province_id,
            name: item.province_name,
          }),
        }));
        console.log("Provinces: ", provincesList);
        setProvinceList(provincesList);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectProvince = async (value: any) => {
    const selectedProvince = JSON.parse(value);
    setAddressInfo({
      province: selectedProvince.name,
      district: "",
      ward: "",
      details: "",
    });
    console.log("Select province value: ", JSON.parse(value));
    await axiosInstance
      .get(`/api/address/districts/${selectedProvince.id}`)
      .then((res) => {
        const districtsList = res.data.metadata.map((item: any) => ({
          ...item,
          label: item.district_name,
          value: JSON.stringify({
            id: item.district_id,
            name: item.district_name,
          }),
        }));
        setDistrictList(districtsList);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectDistrict = async (value: any) => {
    const selectedDistrict = JSON.parse(value);
    setAddressInfo({
      ...addressInfo,
      district: selectedDistrict.name,
      ward: "",
      details: "",
    });
    console.log("Select province value: ", JSON.parse(value));
    await axiosInstance
      .get(`/api/address/wards/${selectedDistrict.id}`)
      .then((res) => {
        const wardsList = res.data.metadata.map((item: any) => ({
          ...item,
          label: item.ward_name,
          value: JSON.stringify({
            id: item.ward_id,
            name: item.ward_name,
          }),
        }));
        setWardList(wardsList);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectWard = (value: any) => {
    const selectedWard = JSON.parse(value);
    setAddressInfo({
      ...addressInfo,
      ward: selectedWard.name,
      details: "",
    });
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
            className={`text-[8px] absolute left-[1%] bottom-[95%] z-10 opacity-70`}
          >
            Name:
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
            className={`text-[8px] absolute left-[1%] bottom-[95%] z-10 opacity-70`}
          >
            Phone number: <span className="text-red-600 text-xs">*</span>
          </p>
          <input
            type="text"
            placeholder="Enter phone number"
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
            className={`text-[8px] absolute left-[1%] bottom-[95%] z-10 opacity-70`}
          >
            Address: <span className="text-red-600 text-xs">*</span>
          </p>
          {deliveryInfo.address.length > 0 ? (
            <p className="px-3 text-xs">
              {deliveryInfo.address}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                onClick={() => setIsAddingAddress(true)}
                className="inline fill-gray-500 hover:fill-black duration-100 ml-2 cursor-pointer"
              >
                <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
              </svg>
            </p>
          ) : (
            <button
              onClick={() => {
                fetchProvinceList();
                setIsAddingAddress(true);
              }}
              className="text-xs font-semibold text-white p-2 bg-sky-500 hover:bg-sky-700 rounded-lg duration-200"
            >
              + Add a new address
            </button>
          )}
        </div>
        <Modal
          title="Add a new address"
          open={isAddingAddress}
          onCancel={(e) => {
            e.stopPropagation();
            setIsAddingAddress(false);
          }}
          footer={null}
        >
          <div
            className={`w-full flex flex-col items-start gap-4 p-4 ${montserrat_600.className}`}
          >
            <div className="flex items-center gap-2">
              <p>Select a city or province:</p>
              <Select
                showSearch
                size="small"
                popupMatchSelectWidth={250}
                className="w-[15em] font-montserrat bg-transparent border border-gray-300 rounded-xl py-4"
                placeholder={
                  <p className="pr-8">Select a city or province...</p>
                }
                options={provinceList}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .normalize()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onSelect={handleSelectProvince}
              />
            </div>

            <div className="flex items-center gap-2">
              <p>Select a district:</p>
              <Select
                showSearch
                disabled={addressInfo.province.length === 0}
                size="small"
                popupMatchSelectWidth={250}
                className="w-[15em] font-montserrat bg-transparent border border-gray-300 rounded-xl py-4"
                placeholder={<p className="pr-8">Select a district...</p>}
                options={districtList}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .normalize()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onSelect={handleSelectDistrict}
              />
            </div>

            <div className="flex items-center gap-2">
              <p>Select a ward:</p>
              <Select
                showSearch
                disabled={addressInfo.district.length === 0}
                size="small"
                popupMatchSelectWidth={250}
                className="w-[15em] font-montserrat bg-transparent border border-gray-300 rounded-xl py-4"
                placeholder={<p className="pr-8">Select a ward...</p>}
                options={wardList}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .normalize()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onSelect={handleSelectWard}
              />
            </div>

            <div className="w-full flex flex-col items-start gap-2">
              <p>Enter your detailed address:</p>
              <input
                type="text"
                placeholder="No. Street, ..."
                disabled={addressInfo.ward.length === 0}
                value={addressInfo.details}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    details: e.target.value,
                  });
                }}
                className="w-full border-gray-300 rounded-xl text-xs disabled:cursor-not-allowed"
              />
            </div>

            <div className="w-full flex items-center gap-4 mt-8">
              <button
                onClick={() => {
                  setAddressInfo({
                    province: "",
                    district: "",
                    ward: "",
                    details: "",
                  });
                  setIsAddingAddress(false);
                }}
                className="grow rounded-xl p-4 border border-gray-400 hover:bg-slate-100 duration-200 text-xs"
              >
                Cancel
              </button>
              <button
                disabled={addressInfo.details.length === 0}
                onClick={() => {
                  setDeliveryInfo({
                    ...deliveryInfo,
                    address:
                      addressInfo.details +
                      ", " +
                      addressInfo.ward +
                      ", " +
                      addressInfo.district +
                      ", " +
                      addressInfo.province,
                  });
                  setIsAddingAddress(false);
                }}
                className="grow rounded-xl p-4 bg-sky-700 hover:bg-sky-900 disabled:cursor-not-allowed disabled:bg-gray-300 duration-200 text-xs text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
