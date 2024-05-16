import React from "react";
import Link from "next/link";
import image5 from "../../assets/images/landingPage/image_5.jpg";
import { dela, montserrat_400, montserrat_500 } from "@/assets/fonts/font";

export default function SeasonalVoucher() {
  return (
    <div className="flex flex-row justify-between my-10 min-w-[80vw] max-w-[80vw] h-56 border-2 border-black bg-[#784BE6] text-white rounded-xl overflow-hidden">
      <div className="flex flex-col justify-center items-start mx-4">
        <p className={`text-[150%] md:text-[200%] font-bold ${dela.className}`}>
          Save 50% this Holiday season
        </p>
        <p
          className={`mt-4 font-light text-[70%] hidden md:block 2xl:text-[100%] ${montserrat_500.className}`}
        >
          It is time to revamp your fashion game without breaking the bank! Dive
          into our exclusive 50% off sale and discover unbearable deals on the
          most coveted styles.
        </p>
        <Link
          href="/"
          className={`bg-transparent text-white font-light px-6 py-2 my-4 rounded-3xl border-2 border-white max-w-fit hover:underline text-[90%] md:text-[100%] ${montserrat_400.className}`}
        >
          Shop Now
        </Link>
      </div>
      <div
        style={{
          backgroundImage: `url(${image5.src})`,
        }}
        className="bg-cover bg-no-repeat bg-center w-[80vh] h-inherit"
      ></div>
    </div>
  );
}
