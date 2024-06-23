import Link from "next/link";
import React from "react";

export default function NavigationGroup() {
  return (
    <div className="w-full flex-row gap-8 text-sm font-bold font-monospace items-center justify-center hidden sm:flex">
      <Link
        href="/custom"
        className="w-max text-center ease-in-out duration-100 hover:text-[#784be6] relative hoverMenuItem"
      >
        DESIGN YOUR SHIRT
      </Link>
      <Link
        href="/"
        className="w-max text-center ease-in-out duration-100 hover:text-[#784be6] relative hoverMenuItem"
      >
        NEWS
      </Link>
      <Link
        href="/"
        className="w-max text-center ease-in-out duration-100 hover:text-[#784be6] relative hoverMenuItem"
      >
        FAQ
      </Link>
      <Link
        href="/"
        className="w-max text-center ease-in-out duration-100 hover:text-[#784be6] relative hoverMenuItem"
      >
        CONTACT
      </Link>
      <Link
        href="/"
        className="w-max text-center ease-in-out duration-100 hover:text-[#784be6] relative hoverMenuItem"
      >
        TUTORIAL
      </Link>
    </div>
  );
}
