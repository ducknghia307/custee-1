"use client";
import { usePathname } from "next/navigation";
import { HSDropdown } from "preline/preline";
import { useEffect } from "react";

export default function PrelineLoader() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      HSDropdown.autoInit();
    }, 100);
  }, [path]);

  return <></>;
}
