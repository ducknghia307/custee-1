import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Account() {
  return (
    <div className="flex flex-col justify-between min-h-[1000px]">
      <Navbar />
      <div className="mt-20">Account page</div>
      <Footer />
    </div>
  );
}
