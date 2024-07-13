"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";
import { dela, montserrat_400, montserrat_700 } from "@/assets/fonts/font";
import CurrencySplitter from "@/assistants/currencySpliter";
import { generateNumericCode } from "@/assistants/generators";
import CheckoutProductList from "@/components/checkout/ProductList";
import CheckoutContactDetails from "@/components/checkout/ContactDetails";
import CheckoutPaymentMethod from "@/components/checkout/PaymentMethod";
import CheckoutDeliveryMethod from "@/components/checkout/DeliveryMethod";
import CheckoutDiscount from "@/components/checkout/Discount";
import { axiosInstance } from "@/utils/axiosInstance";
import Loading from "@/components/loading/Loading";

export default function Page() {
  const [checkoutList, setCheckoutList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalIncludingDelivery, setTotalIncludingDelivery] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState<{
    method: string;
    cost: number;
  }>({ method: "", cost: 0 });
  const [deliveryInfo, setDeliveryInfo] = useState<{
    recipientName: string;
    phone: string;
    address: string;
  }>({
    recipientName: "",
    phone: "",
    address: "",
  });
  const [discountValue, setDiscountValue] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.userId;

  const getDeliveryInfo = (value: any) => {
    setDeliveryInfo(value);
  };

  const getProductList = (value: any) => {
    setCheckoutList(value);
    setTotal(0);
    value.map((item: any) => {
      setTotal(
        (oldTotal) =>
          oldTotal + sumQuantity(item.quantityPerSize) * item.productId.price
      );
    });
  };

  const getPaymentMethod = (value: any) => {
    setPaymentMethod(value);
  };

  const getDeliveryMethod = (value: any) => {
    setDeliveryOptions(value);
    setTotalIncludingDelivery(0);
    setTotalIncludingDelivery(total + value.cost);
  };

  const getDiscountValue = (value: any) => {
    setDiscountValue(value);
    setDiscountAmount(total * value);
  };

  const sumQuantity = (quantityArray: any[]) => {
    var sum = 0;
    quantityArray.map((item) => {
      sum += item.quantity;
    });
    return sum;
  };

  const getHiddenPhoneNumber = (phone: string) => {
    return "0 " + "*****" + phone.slice(-4, -3) + " " + phone.slice(-3);
  };

  const handleCompleteOrder = async () => {
    const newOrderCode = generateNumericCode(8);
    const packedData = {
      order: {
        userId: userId,
        code: newOrderCode,
        total:
          totalIncludingDelivery > 0
            ? totalIncludingDelivery - discountAmount
            : total - discountAmount,
        paymentMethod: paymentMethod,
        deliveryInfo: deliveryInfo,
        deliveryOptions: deliveryOptions,
        discountValue: discountValue,
      },
      checkoutList: checkoutList,
    };
    console.log("Data: ", packedData);
    sessionStorage.setItem("orderPackedData", JSON.stringify(packedData));

    //Data to create payment link
    if (paymentMethod.toLowerCase().match("card")) {
      setIsLoading(true);
      var transactionItems: any[] = [];
      checkoutList.map((item) => {
        const newItem = {
          name: item.productId.name,
          price: item.productId.price,
          quantity: sumQuantity(item.quantityPerSize),
        };
        transactionItems.push(newItem);
      });
      const createPaymentLinkData = {
        orderCode: parseInt(newOrderCode),
        amount:
          totalIncludingDelivery > 0
            ? totalIncludingDelivery - discountAmount
            : total - discountAmount,
        description: "Custee Order",
        cancelUrl: "https://custee.vercel.app/cart",
        returnUrl: "https://custee.vercel.app/checkout/completed",
        buyerName: deliveryInfo.recipientName,
        buyerPhone: getHiddenPhoneNumber(deliveryInfo.phone),
        buyerAddress: deliveryInfo.address,
        items: transactionItems,
        expiredAt: Math.round(new Date().getTime() / 1000) + 5 * 60,
      };
      axiosInstance
        .post("/api/payos/createPaymentLink", createPaymentLinkData)
        .then((res) => {
          console.log("createPaymentLinkData result: ", res.data);
          setTimeout(() => {
            window.location.replace(res.data.metadata.checkoutUrl);
            setIsLoading(false);
          }, 3000);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("COD selected");
      window.location.replace("/checkout/completed");
    }
  };

  return (
    <div>
      <main className="flex flex-col items-center justify-between min-h-screen overflow-x-hidden">
        <Navbar />
        <div
          className={`w-full mx-4 lg:w-2/3 flex flex-col items-center justify-center my-28 ${montserrat_400.className}`}
        >
          <p className={`text-3xl font-black ${dela.className} mb-16`}>
            CHECKOUT
          </p>

          <CheckoutContactDetails getDeliveryInfo={getDeliveryInfo} />

          <CheckoutProductList getProductList={getProductList} />

          <CheckoutPaymentMethod getPaymentMethod={getPaymentMethod} />

          <CheckoutDeliveryMethod getDeliveryMethod={getDeliveryMethod} />

          <CheckoutDiscount getDiscountValue={getDiscountValue} total={total} />

          {/* Total */}
          <div
            className={`w-full flex justify-between items-start gap-32 px-8 py-4 mt-4 rounded-lg bg-[#F1E15B]/25 text-xl text-[#784BE6] ${dela.className}`}
          >
            <div className="w-1/3">
              <p>TOTAL</p>
            </div>
            <div className="w-3/4 text-end mr-8">
              {CurrencySplitter(
                totalIncludingDelivery > 0
                  ? totalIncludingDelivery - discountAmount
                  : total - discountAmount
              )}
              &ensp;đ
            </div>
          </div>

          <div className="w-full mt-4 flex items-center justify-between">
            <p className="w-1/2 text-xs opacity-70">
              * Please make sure you have provided your phone number and the
              address that you would love to receive your shirts by.
            </p>
            <div className="flex items-center gap-4 ">
              <p
                className={`${montserrat_400.className} text-[#784BE6] text-sm cursor-pointer hover:underline`}
                onClick={() => window.location.replace("/cart")}
              >
                Cancel
              </p>
              <button
                className={`px-10 py-4 bg-[#784BE6] ${montserrat_700.className} min-w-fit text-white rounded-full hover:bg-[#4317B0] disabled:opacity-70 disabled:bg-gray-300 disabled:cursor-not-allowed`}
                disabled={
                  paymentMethod === "" ||
                  deliveryOptions.method === "" ||
                  deliveryInfo.phone === "" ||
                  deliveryInfo.address === ""
                }
                onClick={() => handleCompleteOrder()}
              >
                COMPLETE ORDER
              </button>
            </div>
          </div>
          {isLoading ? <Loading /> : null}
        </div>
        <Footer />
      </main>
    </div>
  );
}
