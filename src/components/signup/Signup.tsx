"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axiosInstance, { setAuthToken } from "../../utils/axiosInstance";
import { useAppDispatch } from "../../redux/hook";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { showToast } from "../toast/toast";
import {
  dela,
  montserrat_400,
  montserrat_500,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import bg from "../../assets/logo/bg1.jpg"

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        email,
        username,
        password,
        phone,
      });
      // localStorage.setItem("userId", id);
      console.log("Registration response:", response.data.user);

      // Assuming the token is in response.data.token
      const { token, user } = response.data;
   
      
      const id=user._id
      let accessToken = token;
      await setAuthToken(token);
      dispatch(setCredentials({ accessToken, user ,id}));
      showToast("Registration successful", "success");
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error.response.data);
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
        height: "800px",
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
            <p className={`text-3xl font-black ${dela.className}`}>SIGN UP</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
          </div>
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
          </div>
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="phone">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
          </div>
          <div className="space-y-2">
            <Label className={`${montserrat_600.className}`} style={{ fontSize: "18px" }} htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
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
            Sign Up
          </Button>
        </CardFooter>
        <div className={`text-center text-sm ${montserrat_400.className}`}>
          Have an account?
          <Link className="underline ml-2" href="/login">
            Log In
          </Link>
        </div>
      </Card>
    </div>
  );
}
