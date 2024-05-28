"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {axiosInstance} from "../../utils/axiosInstance";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { showToast } from "../toast/toast";
import {
  dela,
  montserrat_400,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import bg from "../../assets/logo/bg1.jpg"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Email must be a valid email address";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    setEmailError(emailError);
  
    if (!emailError) {
      try {
        await axiosInstance.post("/auth/requestOTP", { email });
        showToast("OTP sent to email", "success");
        router.push("/getotp");
      } catch (error) {
        console.log(error);
        
        showToast("Error sending OTP", "error");
      }
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
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
        className="space-y-1"
      >
        <CardHeader className="space-y-1">
          <div className="w-full flex flex-col justify-center items-center mt-8 mb-4">
            <p className={`text-3xl font-black ${dela.className}`}>FORGOT PASSWORD</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            style={{ backgroundColor: "#784BE6", fontSize: "17px", padding: "20px 0" }}
            className={`w-full ${montserrat_700.className}`}
            type="submit"
            onClick={handleSubmit}
          >
            Get OTP
          </Button>
        </CardFooter>
        <div className={`text-center text-sm ${montserrat_400.className}`} style={{ paddingTop: "20px" }}>
          Remembered your password? Back to
          <Link className="underline ml-1" href="/login">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
