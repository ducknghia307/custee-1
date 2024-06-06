"use client";
import React from "react";

export default function page({
  params,
}: {
  params: {
    orderId: string;
  };
}) {
  return <div className="bg-sky-800">Order: {params.orderId}</div>;
}
