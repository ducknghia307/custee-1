"use client";
import React from "react";
import detective from "@/assets/images/notFound/detective.jpg";
import Link from "next/link";
import { montserrat_500 } from "@/assets/fonts/font";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-between">
      <Navbar />
      <div
        className={`min-h-screen flex flex-row items-center justify-center gap-16 ${montserrat_500.className}`}
      >
        <img
          src={detective.src}
          alt=""
          style={{
            width: "300px",
            borderRadius: "50%",
          }}
          className="hidden md:block"
        />

        <div className="flex flex-col items-center justify-center gap-4 text-center text-gray-700">
          <p className="text-[400%] font-bold">404</p>
          <span className="font-bold">
            <p>Looks like this page is missing.</p>
            <p className="hidden md:block">Don't worry though, our best man is on the case.</p>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 mt-2">
            <p className="text-xs">
              Meanwhile, why don't you try again by going
            </p>
            <Link href="/">
              <button
                className="bg-sky-800 text-white font-bold hover:bg-sky-900 rounded-xl mt-2"
                style={{
                  padding: "12px",
                }}
              >
                BACK HOME
              </button>
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
