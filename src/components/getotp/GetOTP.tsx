"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { showToast } from "../toast/toast";
import {
  dela,
  montserrat_400,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import bg from "../../assets/logo/bg1.jpg";
import { InputOTPPattern } from "../ui/InputOTPPattern";

export function GetOTPForm() {
  const router = useRouter();
  const [otp, setOTP] = useState("");

  const handleOTPChange = (value) => {
    setOTP(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/otp/verifyOTP", { otp });
      showToast("OTP verified", "success");
      router.push("/resetpassword");
    } catch (error) {
      showToast("Error verifying OTP", "error");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <Card
        style={{
          width: "600px",
          paddingLeft: "80px",
          paddingRight: "80px",
          paddingBottom: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
        className="space-y-1"
      >
        <CardHeader className="space-y-1">
          <div className="w-full flex flex-col justify-center items-center mt-8 mb-4">
            <p className={`text-3xl font-black ${dela.className}`}>ENTER OTP</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <InputOTPPattern onOTPChange={handleOTPChange} />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            style={{
              backgroundColor: "#784BE6",
              fontSize: "17px",
              padding: "20px 0",
            }}
            className={`w-full ${montserrat_700.className}`}
            type="submit"
            onClick={handleSubmit}
          >
            Verify OTP
          </Button>
        </CardFooter>
        <div
          className={`text-center text-sm ${montserrat_400.className}`}
          style={{ paddingTop: "20px" }}
        >
          Remembered your password? Back to
          <Link className="underline ml-1" href="/login">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
