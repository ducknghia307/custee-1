import React from "react";

export default function Frontliner() {
  return (
    <div className="w-screen min-h-max flex flex-col justify-center overflow-x-hidden overflow-y-visible font-arimo">
      <div
        className="w-[130%] min-h-[60vh] mt-[-50px] bg-gradient-to-tr from-[#9376DB] from-10% via-[#F2F3E3] via-50% to-[#9376DB] to-90%
         z-10 rounded-[100%] flex flex-col justify-center items-center gap-8 ml-[-15%] "
      >
        <p className="font-medium text-[12px] italic text-[#9376DB]">
          Experience fashion like never before...
        </p>
        <h3 className="text-5xl font-extrabold text-[#784BE6] font-sans">
          Custom Tee, Unique Me
        </h3>
        <p className="w-[40%] text-center text-[10px] font-light hidden sm:block">
          Discover a world of fashion-forward trends, curated collections, and
          timeless pieces that inspire. Unleash your inner fashionista and
          embark a journey of confidence, elegance and impeccable style.
        </p>
        <button className="bg-[#784BE6] hover:bg-[#6832E8] px-8 py-2 rounded-2xl font-medium text-white text-sm">
          DESIGN NOW!
        </button>
      </div>
      <div className="flex flex-row justify-center gap-5 mt-[-3%]">
        <div
          className="w-[20%] h-96 rounded-xl bg-center bg-cover"
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
      <div className="w-screen min-h-[40vh] z-10 bg-white mt-[-7%] rounded-[100%] text-center"></div>
    </div>
  );
}
