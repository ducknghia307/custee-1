import React, { useState } from "react";
import Link from "next/link";
import "../styles/TrendyDesigns.css";
import image8 from "../../assets/images/landingPage/image_8.jpg";
import image9 from "../../assets/images/landingPage/image_9.png";
import image10 from "../../assets/images/landingPage/image_10.png";
import image11 from "../../assets/images/landingPage/image_11.png";
import { dela, montserrat_600, montserrat_400 } from "@/assets/fonts/font";

export default function TrendyDesigns() {
  const [designList, setDesignList] = useState([
    {
      id: 1,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image: image8.src,
    },
    {
      id: 2,
      name: "Levis Stripes",
      category: "Men's T-Shirt",
      image: image9.src,
    },
    {
      id: 3,
      name: "H&M Regular Fit",
      category: "Men's T-Shirt",
      image: image10.src,
    },
    {
      id: 4,
      name: "Jack & Jones Re",
      category: "Men's T-Shirt",
      image: image11.src,
    },
    {
      id: 5,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image: image8.src,
    },
    {
      id: 6,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image: image8.src,
    },
    {
      id: 7,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image: image8.src,
    },
    {
      id: 8,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image: image8.src,
    },
  ]);

  const slideNext = () => {
    var container = document.getElementById("container");
    sideScroll(container!, "right", 5, 1500, 40);
  };

  const slideBack = () => {
    var container = document.getElementById("container");
    sideScroll(container!, "left", 5, 1500, 40);
  };

  function sideScroll(
    element: HTMLElement,
    direction: String,
    speed: number,
    distance: number,
    step: number
  ) {
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  return (
    <div className="w-screen mt-24 flex flex-col justify-center text-center">
      <h1 className={`font-extrabold text-4xl ${dela.className}`}>
        TRENDY DESIGNS
      </h1>
      <div
        className={`w-screen flex flex-row text-sm opacity-80 text-gray-500 font-bold gap-10 justify-center mt-6 ${montserrat_600.className}`}
      >
        <Link
          href="/"
          className="hover:underline hover:text-gray-700 cursor-pointer"
        >
          Shirts
        </Link>
        <Link
          href="/"
          className="hover:underline hover:text-gray-700 cursor-pointer"
        >
          Jackets
        </Link>
        <Link
          href="/"
          className="hover:underline hover:text-gray-700 cursor-pointer"
        >
          Hoodies
        </Link>
        <Link
          href="/"
          className="hover:underline hover:text-gray-700 cursor-pointer"
        >
          Polos
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center gap-1">
        <button
          onClick={slideBack}
          className="border border-gray-500 px-4 py-2 ml-4 rounded-full font-extralight hover:bg-gray-600 hover:text-white"
        >
          &lt;
        </button>
        <div
          id="container"
          className="flex flex-nowrap flex-row min-w-[90%] max-w-[90%] gap-10 mx-auto mt-16 overflow-x-auto"
        >
          {designList?.map((design, i) => {
            return (
              <Link
                href="/"
                key={i}
                className="relative h-64 min-w-[22.3%] bg-green-500 bg-center bg-cover bg-no-repeat rounded-xl border border-gray-500 overflow-hidden cursor-pointer"
                style={{ backgroundImage: `url(${design.image})` }}
              >
                <div className="absolute bottom-0 w-full h-16 bg-yellow-100 flex flex-row justify-between items-center group">
                  <div className="flex flex-col justify-center gap-1 ml-3 text-start">
                    <p
                      className={`text-[80%] font-bold group-hover:underline ${montserrat_600.className}`}
                    >
                      {design.name}
                    </p>
                    <p className="text-[50%]">{design.category}</p>
                  </div>
                  <div className="rounded-full h-6 w-6 bg-violet-500 border mr-2 cursor-pointer hover:bg-violet-700 flex justify-center items-center">
                    <p
                      className={`text-[5px] text-white ${montserrat_400.className}`}
                    >
                      Icon
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <button
          onClick={slideNext}
          className="border border-gray-500 px-4 py-2 mr-4 rounded-full font-extralight hover:bg-gray-600 hover:text-white"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
