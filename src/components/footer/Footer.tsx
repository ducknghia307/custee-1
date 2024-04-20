import React from "react";
import logo from "../../assets/logo/custee-transparent.png";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="h-48 w-full bg-black absolute inset-x-0 bottom-0 flex flex-col justify-center items-center rounded-lg">
      <div className="border-b border-slate-300 h-[80%] w-[85%] flex flex-row justify-between pb-2">
        <div className="flex flex-col w-max">
          <Link href="/">
            <img src={logo.src} alt="" className="w-[15rem]" />
          </Link>
          <p className="text-white font-thin text-[8px] italic">
            Design amazing digital experiences that create more happiness in the
            world.
          </p>
          <div className="flex flex-row gap-2 mt-2 items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRahuIATDVzXTaEQ5_0JjnlxHnafwOutBfplI5HeekMmQ&s"
              alt=""
              className="w-[1rem]"
            />
            <p className="text-white font-light text-[8px] hover:underline hover:cursor-pointer">
              custeeteam@gmail.com
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <img
              src="https://cdn-icons-png.freepik.com/256/3616/3616230.png"
              alt=""
              className="w-[1rem]"
            />
            <p className="text-white font-light text-[8px] hover:underline hover:cursor-pointer">
              0987654321
            </p>
          </div>
        </div>
        <div className="hidden flex-row text-slate-200 w-[40%] justify-between sm:flex">
          <div className="flex flex-col gap-2">
            <p className="opacity-50 text-[10px] font-extrabold my-2">Shop</p>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Men's Product
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Women's Product
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Winter Edition
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Accessories
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Discounts
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="opacity-50 text-[10px] font-medium my-2">Company</p>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              About Us
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Careers
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Investors
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              News
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Purpose
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="opacity-50 text-[10px] font-medium my-2">Support</p>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Order Status
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Shipping & Delivery
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Returns
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Payment Option
            </Link>
            <Link href="/" className="text-[10px] font-bold hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="h-4 w-[80%] text-slate-200 mt-2 flex flex-row justify-between">
        <div className="text-[7px] opacity-30">
          &copy; 2024 Custee. All rights reserved.
        </div>
        <div className="flex flex-row gap-3">
          <Link href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjBIUrMkO93vOAU6ORZOyPcee85V92ZhcNUsZUQcKQlQ&s"
              alt=""
              className="w-[1rem]"
            />
          </Link>
          <Link href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_GnBRa2Qj_EhpFtLWFV6PgkpKzuzVLb9Nrv-mXABoA&s"
              alt=""
              className="w-[1rem]"
            />
          </Link>
          <Link href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4EpEtUu0LhRrVgI00RqfDt4u3fvKdv170bsh0HY46Zg&s"
              alt=""
              className="w-[1rem]"
            />
          </Link>
          <Link href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXLfMDvX0789k62ABHECpFRL2itALwt5iQrQV33j-G4w&s"
              alt=""
              className="w-[1rem]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
