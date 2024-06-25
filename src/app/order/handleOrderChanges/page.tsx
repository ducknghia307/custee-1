"use client";
import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect } from "react";

export default function Page() {
  const getPageStatus = async () => {
    if (!sessionStorage.payNowOrder) window.location.replace("/order");
    else {
      const payNowOrder = JSON.parse(sessionStorage.payNowOrder);
      console.log("PayNowOrder: ", payNowOrder);
      await axiosInstance
        .get(`/api/payos/getPaymentLinkInformation/${payNowOrder.code}`)
        .then((res) => {
          if (res.data.metadata.status === "CANCELLED") {
            axiosInstance
              .patch(`/api/order/${payNowOrder.code}`, {
                paymentLink: payNowOrder.paymentLink,
              })
              .then((res) => {
                console.log("Cancel payment link: ", res.data);
              })
              .catch((err) => console.log(err));
            sessionStorage.setItem("payNowCancelled", payNowOrder.code);
          } else if (res.data.metadata.status === "PAID") {
            axiosInstance
              .patch(`/api/order/${payNowOrder.code}`, {
                paymentMethod: "Card",
              })
              .then((res) => {
                console.log("Update payment method: ", res.data);
              })
              .catch((err) => console.log(err));

            axiosInstance
              .patch(`/api/order/paidStatus/${payNowOrder.code}`)
              .then((res) => {
                console.log("Update paid status: ", res.data);
              })
              .catch((err) => console.log(err));
            sessionStorage.setItem("payNowSucceeded", payNowOrder.code);
          }
        });
      window.location.replace("/order");
    }
  };

  useEffect(() => {
    getPageStatus();
  });
}
