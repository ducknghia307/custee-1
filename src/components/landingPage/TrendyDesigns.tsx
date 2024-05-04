import React, { useState } from "react";
import Link from "next/link";
import "../styles/TrendyDesigns.css";

export default function TrendyDesigns() {
  const [designList, setDesignList] = useState([
    {
      id: 1,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/4395/74e6/df3c610f75fbdc29d3ce5b323e7f440e?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JadfikGhoAvPplxdbnElPrroUh~x1ZY6dsR2wuo7mn2-32Aa42URHzUzXZATp3osQMoNwJ365519gecpz~sIovxiIZHyei~4q1zqxojnK5OJFL3zsmb5yMUQkVEPoOPTl7xiwA6xDEG0d0PGkPL2ugnWSYn-C~aJ~MgqcOngrotb8FhEBI67euPwwo0TOavtQ4Vx-EYGtsezrFZQLzDMPMnZ7XlyhqGMZevDYCITqE90fKoeaZ6JP0rh6idpuju9yTVnK56LFASxecI121ClKWCRj6naYer1H4L-fZdunexvv94LKbVnNZ38g883-~FQDm0hYrq6OZ6Zgtwwk275dw__",
    },
    {
      id: 2,
      name: "Levis Stripes",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/10c6/cd47/4dca44f322af93281ae774160f97db05?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hK3DBBQzdQo0J4fNpannxohMzqJ0qtv2BAkGeYjvmgen3KJSqhO8MsdL7HdkRxWjXgibL154YKMKNmfPM9KEguqygBdPLNpMLVFt86Jid7MaBMEPOVUziS4-rhl2RnnCGUAfQ~bFxPGuzaftbb5A56SK~nFWak6orfkShX2nMV-H61twAEsRO5kpHiE3h1ifjBv5QJ6xEgLm5QRWoms0Wsh2nzClCGnmeUU4rBZt3lGP18H0YdmZwNo3fsnMv7TXIeSgi8cp2Qe~xJoUshM~d6wWcUFb9SARP70wczl9PiMDA9BtNq0VJz~O9W23lnucenldBuGyOrnx2R8E0RJ07w__",
    },
    {
      id: 3,
      name: "H&M Regular Fit",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/a619/ef0a/688c8f2a495c6b032ad2a503619c2b37?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OQDTrdXz3r7OuOtxxjv7~bqDpus3m2hh0UWiOEtIxjzK1cu5ME4yVtzDfksVqqbq0EKPXzXR3E7JeJQpJRNaIKhjeG6DtpjRwloV4Z5gkcVwTMVCCy5Eu2fnj6AObSxL~niiOOD4mqIV3OmvoOiwMgsdWa2r9nTzlvEnhlYEsBnNkrgwcF39P0SxPOZgC7dAoWIwdCimcWAP-J-03Ryukc5tZ-PS1zvg2oP5uJCBEKPxjXl9e050RMS1IZLx5Slz8r~z~NVo138Z9oiKDpIgU~1sV81LiixqSHW1yFy-eEXcHcr1ZxXwq9CXwWvriNMfBkzJDg~45R~mo2vZDJ1kZQ__",
    },
    {
      id: 4,
      name: "Jack & Jones Re",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/c7cf/20e2/902b071b2c775fa690c26b84008c2647?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py1j~IYJ0rn230W4jAqveL56atkEGpXUUtUi-Z1Wh6lHSQ9qb5fupc7RQJZTzQkjvU9ZJ6VdV3Al~UMcJAPcdDNZBS5Yt0telIh9Fejp-XvHnEoNCV6amGE-AKs4QscV9SEknAJVeuWGVUmGlJHQzXqTsWPNG6vGRMVMVA3GqKh2yIp60IMLMblRTG~AB9tU1R3ioQl1GxtgnJjz6kt2rmiBQQEHT1B8EC3SKPS1fgD86d3Wnk9MD22pSml~zwbdOQdHsi0z2SR0eWzz9HgL75HL97wEV9gRBUglatF7rQxG5QTFE3ASMSb06xkc6LBT2pVny~LLWJzNIN2jPIU9cw__",
    },
    {
      id: 5,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/c7cf/20e2/902b071b2c775fa690c26b84008c2647?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py1j~IYJ0rn230W4jAqveL56atkEGpXUUtUi-Z1Wh6lHSQ9qb5fupc7RQJZTzQkjvU9ZJ6VdV3Al~UMcJAPcdDNZBS5Yt0telIh9Fejp-XvHnEoNCV6amGE-AKs4QscV9SEknAJVeuWGVUmGlJHQzXqTsWPNG6vGRMVMVA3GqKh2yIp60IMLMblRTG~AB9tU1R3ioQl1GxtgnJjz6kt2rmiBQQEHT1B8EC3SKPS1fgD86d3Wnk9MD22pSml~zwbdOQdHsi0z2SR0eWzz9HgL75HL97wEV9gRBUglatF7rQxG5QTFE3ASMSb06xkc6LBT2pVny~LLWJzNIN2jPIU9cw__",
    },
    {
      id: 6,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/c7cf/20e2/902b071b2c775fa690c26b84008c2647?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py1j~IYJ0rn230W4jAqveL56atkEGpXUUtUi-Z1Wh6lHSQ9qb5fupc7RQJZTzQkjvU9ZJ6VdV3Al~UMcJAPcdDNZBS5Yt0telIh9Fejp-XvHnEoNCV6amGE-AKs4QscV9SEknAJVeuWGVUmGlJHQzXqTsWPNG6vGRMVMVA3GqKh2yIp60IMLMblRTG~AB9tU1R3ioQl1GxtgnJjz6kt2rmiBQQEHT1B8EC3SKPS1fgD86d3Wnk9MD22pSml~zwbdOQdHsi0z2SR0eWzz9HgL75HL97wEV9gRBUglatF7rQxG5QTFE3ASMSb06xkc6LBT2pVny~LLWJzNIN2jPIU9cw__",
    },
    {
      id: 7,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/c7cf/20e2/902b071b2c775fa690c26b84008c2647?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py1j~IYJ0rn230W4jAqveL56atkEGpXUUtUi-Z1Wh6lHSQ9qb5fupc7RQJZTzQkjvU9ZJ6VdV3Al~UMcJAPcdDNZBS5Yt0telIh9Fejp-XvHnEoNCV6amGE-AKs4QscV9SEknAJVeuWGVUmGlJHQzXqTsWPNG6vGRMVMVA3GqKh2yIp60IMLMblRTG~AB9tU1R3ioQl1GxtgnJjz6kt2rmiBQQEHT1B8EC3SKPS1fgD86d3Wnk9MD22pSml~zwbdOQdHsi0z2SR0eWzz9HgL75HL97wEV9gRBUglatF7rQxG5QTFE3ASMSb06xkc6LBT2pVny~LLWJzNIN2jPIU9cw__",
    },
    {
      id: 8,
      name: "Levis Dri- FIT",
      category: "Men's T-Shirt",
      image:
        "https://s3-alpha-sig.figma.com/img/c7cf/20e2/902b071b2c775fa690c26b84008c2647?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=py1j~IYJ0rn230W4jAqveL56atkEGpXUUtUi-Z1Wh6lHSQ9qb5fupc7RQJZTzQkjvU9ZJ6VdV3Al~UMcJAPcdDNZBS5Yt0telIh9Fejp-XvHnEoNCV6amGE-AKs4QscV9SEknAJVeuWGVUmGlJHQzXqTsWPNG6vGRMVMVA3GqKh2yIp60IMLMblRTG~AB9tU1R3ioQl1GxtgnJjz6kt2rmiBQQEHT1B8EC3SKPS1fgD86d3Wnk9MD22pSml~zwbdOQdHsi0z2SR0eWzz9HgL75HL97wEV9gRBUglatF7rQxG5QTFE3ASMSb06xkc6LBT2pVny~LLWJzNIN2jPIU9cw__",
    },
  ]);

  const slideNext = () => {
    var container = document.getElementById("container");
    sideScroll(container!, "right", 5, 1500, 10);
  };

  const slideBack = () => {
    var container = document.getElementById("container");
    sideScroll(container!, "left", 5, 1500, 10);
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
    <div className="w-screen mt-36 flex flex-col justify-center text-center">
      <h1 className="font-extrabold text-4xl font-arimo">TRENDY DESIGNS</h1>
      <div className="w-screen flex flex-row text-sm opacity-80 text-gray-500 font-bold gap-10 justify-center mt-6">
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
          className="flex flex-nowrap flex-row min-w-[90%] max-w-[90%] gap-10 mx-auto my-16 overflow-x-auto"
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
                    <p className="text-[80%] font-bold group-hover:underline">
                      {design.name}
                    </p>
                    <p className="text-[50%]">{design.category}</p>
                  </div>
                  <div className="rounded-full h-6 w-6 bg-violet-500 border mr-2 cursor-pointer hover:bg-violet-700 flex justify-center items-center">
                    <p className="text-[5px] text-white">Icon</p>
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
