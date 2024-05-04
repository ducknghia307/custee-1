"use client";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Frontliner from "@/components/landingPage/Frontliner";
import HotNews from "@/components/landingPage/HotNews";
import TrendyDesigns from "@/components/landingPage/TrendyDesigns";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 overflow-x-hidden">
      <Navbar />
      <Frontliner />
      <HotNews />
      <TrendyDesigns />
      <Footer />
    </main>
  );
}
