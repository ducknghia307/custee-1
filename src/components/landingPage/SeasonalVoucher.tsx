import React from "react";
import Link from "next/link";

export default function SeasonalVoucher() {
  return (
    <div className="flex flex-row my-10 min-w-[80vw] max-w-[80vw] h-56 border-2 border-black bg-[#784BE6] text-white rounded-xl overflow-hidden">
      <div className="flex flex-col justify-center items-start mx-4">
        <p className="text-[250%] font-arimo font-bold">
          Save 50% this Holiday season
        </p>
        <p className="mt-4 font-light text-[100%] hidden md:block sm:text-[120%]">
          It’s time to revamp your fashion game without breaking the bank! Dive
          into our exclusive 50% off sale and discover unbearable deals on the
          most coveted styles.
        </p>
        <Link
          href="/"
          className="bg-transparent text-white font-light px-6 py-2 my-4 rounded-3xl border-2 border-white max-w-fit hover:underline text-[90%] md:text-[100%]"
        >
          Shop Now
        </Link>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://s3-alpha-sig.figma.com/img/4f12/e57d/21468f021e23e2f21f9d725b187a3d5d?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Uz9IVbrlhfK6wpajbCYLa4VI246zxb~XA4Oo-YkMSiEGTm6xyj8~YDz3w3v3hTivaP3moREZ4McMfPdukG0pV9QPV~GsAfsRoCk2aq1GFE9dqp-wXphoDuiqbpQPsIhC~z8JB6ebLceng9nWeIwXFeaJk-ZYN6U-yWDQX8e-i2NB6oYa4CNRRiLBnE2aQcMNcryQgAPOo3w8ec3WWrNfxGxSNqtaF4ByMQ6RjLDshJ3SdzDiyQlDkG-8UOx~cSVD94pEA9gFxVsWP1n39JskTohNAEieWYS-tZbhK2ydu5Y1asY1Oet7aEMrJ-4sskBLyC1VokT7jn9pRW6JFGHN8w__)",
        }}
        className="bg-cover bg-no-repeat bg-center w-[80vh] h-inherit"
      ></div>
    </div>
  );
}
