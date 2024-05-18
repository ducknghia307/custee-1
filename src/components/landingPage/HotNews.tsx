import React from "react";
import image1 from "../../assets/images/landingPage/image_1.png";
import image2 from "../../assets/images/landingPage/image_2.jpg";
import image3 from "../../assets/images/landingPage/image_3.jpg";
import image4 from "../../assets/images/landingPage/image_4.jpg";
import Link from "next/link";
import { dela, montserrat_500, montserrat_600 } from "@/assets/fonts/font";

export default function HotNews() {
  return (
    <div className={`w-screen text-center mt-[-5%] z-10 m-2 ${dela.className}`}>
      <h1 className="text-4xl">HOT NEWS</h1>
      <div className="flex flex-row w-[80%] h-[80vh] gap-2 justify-center align-items-center mx-auto mt-12">
        <div className="flex flex-col w-[60%] justify-center gap-2">
          <div
            className="w-full bg-cover h-[50%] bg-center bg-no-repeat rounded-xl flex flex-col justify-end
             text-start text-white"
            style={{
              backgroundImage: `url(${image1.src})`,
            }}
          >
            <Link
              href="/"
              className="font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
            >
              Collection For Couples
            </Link>
            <p
              className={`font-light text-[10px] m-2 sm:text-[70%] ${montserrat_500.className}`}
            >
              Our Collection for Couple Features coordinated designs and
              patterns, allowing couples to showcase their unity through
              fashion.
            </p>
          </div>
          <div className="w-full h-[50%] flex flex-row gap-2">
            <div
              className="w-[50%] bg-cover h-full bg-center rounded-xl flex flex-col justify-end
              text-start text-white"
              style={{
                backgroundImage: `url(${image2.src})`,
              }}
            >
              <Link
                href="/"
                className="text-[100%] m-2 cursor-pointer hover:underline md:text-[200%]"
              >
                Leather Watch
              </Link>
            </div>
            <div
              className="w-[50%] bg-cover h-full bg-center rounded-xl flex flex-col justify-end
              text-start text-white cursor-pointer"
              style={{
                backgroundImage: `url(${image3.src})`,
              }}
            >
              <Link
                href="/"
                className="font-black text-[100%] m-2 hover:underline md:text-[200%]"
              >
                New Tote Bags Collection
              </Link>
            </div>
          </div>
        </div>
        <div
          className="w-[35%] bg-cover h-full bg-center rounded-xl flex flex-col justify-end
           text-start text-white"
          style={{
            backgroundImage: `url(${image4.src})`,
          }}
        >
          <Link
            href="/"
            className="font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
          >
            Sheer Bomber Jacket
          </Link>
          <p
            className={`font-light text-[10px] m-2 sm:text-[70%] ${montserrat_500.className}`}
          >
            Introducing our stylish and versatile sheer clergy caped bomber
            jacket.
          </p>
          <button
            className={`w-fit bg-transparent border-white rounded-xl border px-4 py-1 mx-4 mb-2 font-light hover:bg-white hover:text-black hover:font-bold ${montserrat_600.className}`}
          >
            <Link href="/">Shop Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
