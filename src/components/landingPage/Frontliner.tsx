"use client"
import React from "react";
import grad_background from "@/assets/images/landingPage/gradient_background.png";
import { dela, montserrat_500, montserrat_600 } from "@/assets/fonts/font";
import { useRouter } from "next/navigation";

export default function Frontliner() {
  const router = useRouter();

  const handleDesignNowClick = () => {
    router.push("/custom");
  };

  return (
    <div className="relative w-screen min-h-max flex flex-col justify-center overflow-hidden">
      <div className="flex flex-row justify-center gap-5 mt-56 mb-32 md:mt-64 xl:mt-80">
        <div
          className="w-[20%] h-[450px] rounded-xl bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3LzQ2MS1mZWxpeC0xNC1jYXJkLW1vY2t1cC5qcGc.jpg')",
          }}
        ></div>
        <div
          className="w-[20%] h-96 rounded-xl bg-bottom bg-cover"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/3d/62/e0/3d62e054a68ebcdb8b86b3c2a86b8d57.jpg')",
          }}
        ></div>
        <div
          className="w-[20%] h-96 rounded-xl bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/564x/62/98/f6/6298f6120716107f96178e0254db9fd5.jpg')",
          }}
        ></div>
        <div
          className="w-[20%] h-96 rounded-xl bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://mockey.ai/wp-content/uploads/sites/15/2024/04/young-female-model-with-frizzy-hair-wearing-tshirt-mockup-scene4-0231-1-converted.webp')",
          }}
        ></div>
      </div>
      <div
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[500px] max-h-[100vh] z-20 rounded-[90%] flex flex-col justify-center items-center gap-8 lg:gap-6 bg-cover bg-center pt-24 overflow-hidden"
        style={{ backgroundImage: `url(${grad_background.src})` }}
      >
        <p
          className={`${montserrat_500.className} text-[10px] lg:text-[16px] hidden md:block`}
        >
          Experience fashion like never before
        </p>
        <h3
          className={`text-[40px] font-extrabold text-[#784BE6] lg:text-[48px] ${dela.className}`}
        >
          Custom Tee, Unique Me
        </h3>
        <p
          className={`w-[40%] text-center text-[8px] lg:text-[12px] hidden md:block ${montserrat_500.className}`}
        >
          Discover a world of fashion-forward trends, curated collections, and
          timeless pieces that inspire. Unleash your inner fashionista and
          embark a journey of confidence, elegance and impeccable style.
        </p>
        <button
          className={`bg-[#784BE6] hover:bg-[#6832E8] px-4 py-2 lg:px-6 lg:py-3 rounded-full font-medium text-white text-xs lg:text-md ${montserrat_600.className}`}
          onClick={handleDesignNowClick}
        >
          DESIGN NOW!
        </button>
      </div>
      <div className="absolute bottom-16 w-full min-h-[200px] z-10 bg-white rounded-[100%]"></div>
    </div>
  );
}
