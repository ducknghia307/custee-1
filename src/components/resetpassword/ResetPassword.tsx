"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
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
import bg from "../../assets/logo/bg1.jpg";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      await axiosInstance.post("/auth/reset-password", { password });
      showToast("Password reset successfully!", "success");
      router.push("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      showToast("Error resetting password", "error");
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
            <p className={`text-3xl font-black ${dela.className}`}>RESET PASSWORD</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="password">
              New Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
          </div>
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            style={{ backgroundColor: "#784BE6", fontSize: "17px", padding: "20px 0" }}
            className={`w-full ${montserrat_700.className}`}
            type="submit"
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </CardFooter>
        <div className={`text-center text-sm ${montserrat_400.className}`} style={{ paddingTop: "20px" }}>
          Remembered your password?
          <Link className="underline ml-2 mr-2" href="/login">
            Login
          </Link>
          or
          <Link className="underline ml-2" href="/getotp">
            Resend OTP
          </Link>
        </div>
      </Card>
    </div>
  );
}
