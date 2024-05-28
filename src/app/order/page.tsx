"use client";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    window.location.replace("/order/in_progress");
  }, []);
}
