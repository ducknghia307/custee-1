import React from "react";
import Link from "next/link";

export default function DesignTutorial() {
  return (
    <div className="mt-24 text-center">
      <h1 className="font-extrabold text-4xl font-arimo">DESIGN TUTORIAL</h1>
      <div className="min-w-[80vw] max-w-[80vw] h-[50vh] flex flex-row justify-between mx-auto mt-8">
        <div
          className="bg-cover h-full w-[45%] bg-top bg-no-repeat rounded-xl flex flex-col justify-end
             text-start text-white"
          style={{
            backgroundImage: `url(https://s3-alpha-sig.figma.com/img/a22a/8c60/23a72874bfbe5676ac7bcbabdc86655d?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IR95Vm97NHZjeLhYst1HvDp7nhLAHeMrbqWLnkeAs5rJsxktb57h65513RnNMMF-ka2ZNI99H6SNeSRSt8KwJ47K~G2VE6h14QDG-LGOZ-Ah9lPZVXF-gN5DJZBqb1dVPG2oXRcHfJOuV4~SJq1el84WztBGtfyxrs5t1c~366JX31DZJdToyFZ7v1AKedNuNd8lQB4yAYbStDPCLcxmQUZrsi8KxLOt8FZk16Ccw5BAOOZkFx~qBqRcbVcBAIwgF8g57D~rHvtK9dTZ7bJyu3GUZFwS1SowHBfN7MMQD5hgy-gprkS05Rijibs1i9dMOj6iqNYzgOva2b84PgwjVg__)`,
          }}
        >
          <Link
            href="/"
            className="font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
          >
            Bottega veneta Women Exclusive Series
          </Link>
          <Link
            href="/"
            className="bg-transparent text-white font-light px-2 py-1 mx-2 mb-2 rounded-3xl border-2 border-white max-w-fit hover:underline text-[80%] md:text-[100%]"
          >
            Shop Now
          </Link>
        </div>
        <div
          className="bg-cover h-full w-[45%] bg-top bg-no-repeat rounded-xl flex flex-col justify-end
             text-start text-white"
          style={{
            backgroundImage: `url(https://s3-alpha-sig.figma.com/img/eeee/b488/f6e42c6151922525f853fa07c5b08cff?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FMRdxiAUaORE2XJC1HepdnGjaWSgWRJlXjSxiz1dic3GQGCA7btp5nM0Sf-kJF6jsILTIpDRIUWmXk1Dt~QUuU3V30KpEcIhN1Jb5xdKEH49wLD2Trz1tFTE0RZkwYDFNBQAQx5Sg0yk-zEb-4t2kdQpgTvf2lq8nvZg-SbJC35U~IuYggkTcD8tYUJjmAuL~JKs1Q8f4YD-3B9zhPIYEhWlTyZGUQwkwmi0x55FiLIHvfFLMe5U2Z2hAgN3JxZtZfaD-Bqpy44MVjN74driJvpqzXhHdMiiY-y3C6zsfllQxg0Pxoqk7VGrWft21HY-8-X2Nhs4292CYNOSXTfwcQ__)`,
          }}
        >
          <Link
            href="/"
            className="font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
          >
            John Lewis : Any Day Collections
          </Link>
          <Link
            href="/"
            className="bg-transparent text-white font-light px-2 py-1 mx-2 mb-2 rounded-3xl border-2 border-white max-w-fit hover:underline text-[80%] md:text-[100%]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
