import React from "react";
import Navbar from "@/components/navbar/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-24">
        <p className="text-3xl font-black font-arimo">CART</p>
        <table></table>
      </div>
    </>
  );
}
