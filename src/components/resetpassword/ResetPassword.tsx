"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const router = useRouter();

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (!passwordError && !confirmPasswordError) {
      showToast("Password reset successfully!", "success");
      router.push("/login");
    } else {
      if (passwordError) showToast(passwordError, "error");
      if (confirmPasswordError) showToast(confirmPasswordError, "error");
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
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${montserrat_400.className}`}
                style={{ height: "40px", fontSize: "15px" }}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiFillEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${montserrat_400.className}`}
                style={{ height: "40px", fontSize: "15px" }}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiFillEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            {confirmPasswordError && (
              <p style={{ color: "red" }}>{confirmPasswordError}</p>
            )}
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