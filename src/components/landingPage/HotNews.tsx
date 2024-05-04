import React from "react";
import image1 from "../../assets/images/image_2024-04-23_195525778.png";
import Link from "next/link";

export default function HotNews() {
  return (
    <div className="w-screen text-center mt-[-5%] z-20 m-2">
      <h1 className="font-extrabold text-4xl font-arimo">HOT NEWS</h1>
      <div className="flex flex-row w-[80%] h-[80vh] gap-2 justify-center align-items-center mx-auto mt-36 font-arimo">
        <div className="flex flex-col w-[60%] justify-center gap-2">
          <div
            className="w-full bg-cover h-[50%] bg-center bg-no-repeat rounded-xl flex flex-col justify-end
             text-start text-white"
            style={{
              backgroundImage: `url(${image1.src})`,
            }}
          >
            <Link
              href="/"
              className="font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
            >
              Collection For Couples
            </Link>
            <p className="font-light text-[10px] m-2 sm:text-[70%]">
              Our Collection for Couple Features coordinated designs and
              patterns, allowing couples to showcase their unity through
              fashion.
            </p>
          </div>
          <div className="w-full h-[50%] flex flex-row gap-2">
            <div
              className="w-[50%] bg-cover h-full bg-center rounded-xl flex flex-col justify-end
              text-start text-white"
              style={{
                backgroundImage:
                  "url(https://s3-alpha-sig.figma.com/img/0a0e/8d76/3952bbcba8a93f0999df457bce601942?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mi-BtNuJc7~hLs2vAit~EmNsldxRPf-y-qj-WghQpxzFkTikGVfzFnX1hdEqjH2q18bVdUVa08EU-DDCi881tCA0fE7fFGNPn18aTUSoG0VbgWgLF6SrCJuaTTWIc7nxSrYjpPd5BYJYdSKmViSDiAI93ud9HcRq6SWAwAo~D3AtwEEF6V-fRyeZKWirpOIvCFETiZWZJ5tB5xEmpYAGltUG~m6QYPhfdUZ8psLHyKN5d2bGbKzGFUdcaCAICySXDthf-dFNwSmtQ1oAzR8-m8BG4I2UUYLTq2h~1c20cmfN41aYDVZ~mPBrkKy87ThWNtLka1YsRNb2iCIkfH9M6Q__)",
              }}
            >
              <Link
                href="/"
                className="font-black text-[100%] m-2 cursor-pointer hover:underline md:text-[200%]"
              >
                Leather Watch
              </Link>
            </div>
            <div
              className="w-[50%] bg-cover h-full bg-center rounded-xl flex flex-col justify-end
              text-start text-white cursor-pointer"
              style={{
                backgroundImage:
                  "url(https://s3-alpha-sig.figma.com/img/844f/fbd5/25cb0a88fadebc90d43146edec42cef9?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=if8tS~w2Gz4TRPKMjz-rxa6LnQVg8BfTblOFjZesA-MlUBh8oK0umQZApJnISd66ju63eIjIwz9hYS4NQZNoz8vGAWREHHSxi0Os0ufgDSh9xAhT6NcEFK4V394JjBvKH53XhXtDRStFijPIHQef~HzPzjdUNE-cT6zWfI5bMJrba2jihQtmu2MiDVVPi03soebk4PWp2Dchzi2hy8PtZ9Gqm~E0bX5ACqVBWMTXljFPEojQELhBc9hGLvK1HMkCGmO9q5L0B~XlqUGpKUph1tlOSqWRpF3eWpDvyC4sHacf7G1zMSDM7Dk2XTGuSphtXQbfBnGHay1FiiO8YCLkYw__)",
              }}
            >
              <Link
                href="/"
                className="font-black text-[100%] m-2 hover:underline md:text-[200%]"
              >
                New Tote Bags Collection
              </Link>
            </div>
          </div>
        </div>
        <div
          className="w-[35%] bg-cover h-full bg-center rounded-xl flex flex-col justify-end
           text-start text-white"
          style={{
            backgroundImage:
              "url(https://s3-alpha-sig.figma.com/img/b6fc/2a16/bbe38c16145694cba4ecc2dd516fe9d0?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aNvEvl55n-V7e5tF7Me~-M1MGmUu1oO2GTaIG~yPyDbaRUUiVePxB5VBzI~pMzfy7Rl6WE7bm6DVyHwWMF6f4NeasMGlLf6ejGoYAlZeuaGHR3eqNaWC0My~b49h6VYzISov8CiVcuubQrkX8QLnn5Gt2fba-r3QYBJoy5pSJLoW~LIsCJ8CHDEuPnL9LRZdZyEFP7a9OEvdqss2PC37kx5k7yHicLm0HhygbyJqvwLAUh5eq2E~pwDXq6ZKghIn92cf~-nbbHp2dMm6U0KLtZ8KvsmV5AZGfsoL5lg~lHdBmtcJVWlYlqWXE50QHFzO52bTNLm5fCEZfnPQfmUhMQ__)",
          }}
        >
          <Link
            href="/"
            className="font-black text-[100%] mx-2 cursor-pointer hover:underline md:text-[200%]"
          >
            Sheer Bomber Jacket
          </Link>
          <p className="font-light text-[10px] m-2 sm:text-[70%]">
            Introducing our stylish and versatile sheer clergy caped bomber
            jacket.
          </p>
          <button className="bg-transparent border-white rounded-xl border-2 w-[90%] py-1 mx-auto mb-2 hover:underline md:w-[50%]">
            <Link href="/" className="font-thin">
              Shop Now &rarr;
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
