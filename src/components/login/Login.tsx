"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import axiosInstance, { setAuthToken } from "../utils/axiosInstance";
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

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function loginUser(email, password) {
    try {
      const response = await axiosInstance.post("/auth", {
        email,
        password,
      });

      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      // Set the token for future requests
      setAuthToken(accessToken);
      console.log("Log in successfully");
      
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{ height: "450px", width: "500px" }} className="space-y-1">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-3xl font-bold">
              Log In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right text-sm">
              <Link className="underline ml-2" href="signup">
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Log In
            </Button>
          </CardFooter>
          <div
            className="mt-4 text-center text-sm"
            style={{
              width: "100%",
              height: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                width: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="rounded-md border-2 bg-stone-50"
            >
              <img
                style={{ width: "30px", height: "30px" }}
                src="google.png"
                alt="Google"
              ></img>
              Google
            </button>
          </div>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
