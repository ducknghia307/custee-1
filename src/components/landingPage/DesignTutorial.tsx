import React from "react";
import Link from "next/link";
import image6 from "../../assets/images/landingPage/image_6.jpg";
import image7 from "../../assets/images/landingPage/image_7.png";
import { dela, montserrat_400 } from "@/assets/fonts/font";

export default function DesignTutorial() {
  return (
    <div className={`mt-24 text-center ${dela.className}`}>
      <h1 className="text-4xl">DESIGN TUTORIAL</h1>
      <div className="min-w-[80vw] max-w-[80vw] h-[50vh] flex flex-row justify-between mx-auto mt-8">
        <div
          className="bg-cover h-full w-[45%] bg-top bg-no-repeat rounded-xl flex flex-col justify-end
             text-start text-white"
          style={{
            backgroundImage: `url(${image6.src})`,
          }}
        >
          <Link
            href="/"
            className="xl:max-w-[80%] font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
          >
            Bottega veneta Women Exclusive Series
          </Link>
          <Link
            href="/"
            className={`bg-transparent text-white font-light px-2 py-1 mx-2 mb-2 rounded-3xl border border-white max-w-fit hover:underline text-[80%] md:text-[100%] ${montserrat_400.className}`}
          >
            Shop Now
          </Link>
        </div>
        <div
          className="bg-cover h-full w-[45%] bg-top bg-no-repeat rounded-xl flex flex-col justify-end
             text-start text-white"
          style={{
            backgroundImage: `url(${image7.src})`,
          }}
        >
          <Link
            href="/"
            className="xl:max-w-[80%] font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
          >
            John Lewis : Any Day Collections
          </Link>
          <Link
            href="/"
            className={`bg-transparent text-white font-light px-2 py-1 mx-2 mb-2 rounded-3xl border border-white max-w-fit hover:underline text-[80%] md:text-[100%] ${montserrat_400.className}`}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
