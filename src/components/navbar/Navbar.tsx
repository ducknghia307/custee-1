"use client";
import { useState } from "react";
import "./Navbar.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import moment from "moment";
import logo from "../../assets/logo/custee-transparent.png";

export default function Navbar() {
  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      content: "Bạn có một đơn hàng đang được giao.",
      time: new Date(),
    },
    {
      id: 2,
      content: "Đơn hàng của bạn đã được giao thành công.",
      time: new Date(),
    },
    {
      id: 3,
      content:
        "Hiện đang có sản phẩm mới trên trang mới nhất của Custee. Có thể bạn sẽ thích. Hãy tham khảo.",
      time: new Date(),
    },
  ]);

  var prevScrollPos = window.scrollY;
  window.onscroll = () => {
    var currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
      document.getElementById("navbar")!.style.top = "0";
    } else {
      if (currentScrollPos > 50)
        document.getElementById("navbar")!.style.top = "-65px";
    }
    prevScrollPos = currentScrollPos;
  };

  return (
    <div
      id="navbar"
      className="h-14 w-full flex flex-row text-black justify-between font-bold bg-white rounded-sm items-center px-1 gap-2 fixed top-0 drop-shadow-[0_5px_5px_rgba(144,40,231,0.25)] z-50"
    >
      <div className="basis-full">
        <Link href="/">
          <img src={logo.src} alt="" className="w-[12rem]" />
        </Link>
      </div>
      <div className="basis-full flex-row gap-8 text-sm font-bold font-monospace items-center justify-center hidden sm:flex">
        <Link
          href="/"
          className="w-max text-center ease-in-out duration-100 hover:font-extrabold hover:text-[#784be6] relative hoverMenuItem"
        >
          DESIGN YOUR SHIRT
        </Link>
        <Link
          href="/"
          className="w-max text-center ease-in-out duration-100 hover:font-extrabold hover:text-[#784be6] relative hoverMenuItem"
        >
          NEWS
        </Link>
        <Link
          href="/"
          className="w-max text-center ease-in-out duration-100 hover:font-extrabold hover:text-[#784be6] relative hoverMenuItem"
        >
          FAQ
        </Link>
        <Link
          href="/"
          className="w-max text-center ease-in-out duration-100 hover:font-extrabold hover:text-[#784be6] relative hoverMenuItem"
        >
          CONTACT
        </Link>
        <Link
          href="/"
          className="w-max text-center ease-in-out duration-100 hover:font-extrabold hover:text-[#784be6] relative hoverMenuItem"
        >
          TUTORIAL
        </Link>
      </div>
      <div className="basis-full flex-shrink-1 flex-row-reverse gap-2 mr-5 hidden sm:flex">
        <div className="h-10 rounded-lg flex flex-row w-100 items-center px-2 gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                alt=""
                className="w-6"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex flex-col justify-between">
                <div>
                  <DropdownMenuLabel>Hi, John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-row gap-2">
                    <img
                      src="https://cdn-icons-png.freepik.com/256/552/552848.png?semt=ais_hybrid"
                      alt=""
                      className="w-3"
                    />
                    <Link href="/">View Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-row gap-2">
                    <img
                      src="https://icons.veryicon.com/png/o/system/linear-chh/order-27.png"
                      alt=""
                      className="w-3"
                    />
                    <Link href="/">View Orders</Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-row justify-center gap-2 bg-red-500 text-white text-center hover:!bg-red-600 hover:!text-white">
                  <img
                    src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2046-yqonjwjv.png"
                    alt=""
                    className="w-3"
                  />
                  <Link href="/">Log out</Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-10 flex flex-row w-100 items-center px-2">
          <img
            src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
            alt=""
            className="w-6"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative h-10 flex flex-row w-100 items-center px-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"
                alt=""
                className="w-6"
              />
              <div className="absolute bottom-0 right-0 w-[16px] h-[16px] flex justify-center items-center rounded-full bg-red-500 text-white text-[10px] font-light">
                {notificationList.length}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-[250px] border-[1.5px] p-0 border-black overflow-hidden">
            {notificationList.map((noti, i) => {
              return (
                <DropdownMenuItem
                  key={i}
                  className="rounded-none border-b-[1.5px] ml-2 pb-4 border-black ml-[-5px] last:border-none"
                >
                  <li className="list-disc font-semibold text-xs">{noti.content}</li>
                  <div className="absolute bottom-[-4px] right-0 w-[30%] mr-2 font-light text-[8px] italic">
                    {moment(noti.time).fromNow()}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* RESPONSIVE MENU ON SMALL SCREEN */}
      <div className="flex sm:hidden mr-4 basis-full flex-shrink-1 flex-row-reverse gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
              alt=""
              className="w-10 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100%] flex flex-row gap-2">
            <div>
              <DropdownMenuLabel>Custee</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-row gap-2">
                <img
                  src="https://icons.iconarchive.com/icons/iconsmind/outline/512/T-Shirt-icon.png"
                  alt=""
                  className="w-3"
                />
                <Link href="/">Design Your Shirt</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row gap-2">
                <img
                  src="https://static.thenounproject.com/png/750649-200.png"
                  alt=""
                  className="w-3"
                />
                <Link href="/">News</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2498/2498904.png"
                  alt=""
                  className="w-3"
                />
                <Link href="/">FAQ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row gap-2">
                <img
                  src="https://png.pngtree.com/png-vector/20230213/ourmid/pngtree-circle-phone-call-icon-in-black-color-png-image_6596895.png"
                  alt=""
                  className="w-3"
                />
                <Link href="/">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1987/1987955.png"
                  alt=""
                  className="w-3"
                />
                <Link href="/">Tutorial</Link>
              </DropdownMenuItem>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-row gap-2">
                  <img
                    src="https://cdn-icons-png.freepik.com/256/552/552848.png?semt=ais_hybrid"
                    alt=""
                    className="w-3"
                  />
                  <Link href="/">View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-row gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                    alt=""
                    className="w-3"
                  />
                  <Link href="/">View Cart</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-row gap-2">
                  <img
                    src="https://icons.veryicon.com/png/o/system/linear-chh/order-27.png"
                    alt=""
                    className="w-3"
                  />
                  <Link href="/">View Orders</Link>
                </DropdownMenuItem>
              </div>
              <DropdownMenuItem className="flex flex-row justify-center gap-2 bg-red-500 text-white text-center hover:!bg-red-600 hover:!text-white">
                <img
                  src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2046-yqonjwjv.png"
                  alt=""
                  className="w-3"
                />
                <Link href="/">Log out</Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="h-10 flex flex-row w-100 items-center px-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"
            alt=""
            className="w-6"
          />
        </div>
      </div>
    </div>
  );
}
