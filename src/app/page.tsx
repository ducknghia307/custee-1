"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Frontliner from "@/components/landingPage/Frontliner";
import HotNews from "@/components/landingPage/HotNews";
import TrendyDesigns from "@/components/landingPage/TrendyDesigns";
import DesignTutorial from "@/components/landingPage/DesignTutorial";
import SeasonalVoucher from "@/components/landingPage/SeasonalVoucher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 overflow-x-hidden">
      <Navbar />
      <Frontliner />
      <HotNews />
      <TrendyDesigns />
      <DesignTutorial />
      <SeasonalVoucher />
      <Footer />
    </main>
  );
}
