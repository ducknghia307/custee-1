"use client";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Frontliner from "@/components/landingPage/Frontliner";
import HotNews from "@/components/landingPage/HotNews";

export default function Home() {
  const [state, setState] = useState(true);
  const [number, setNumber] = useState(3);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 overflow-x-hidden">
      <Navbar />
      <Frontliner />
      <HotNews />
      <Footer />
    </main>
  );
}
