"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance, { setAuthToken } from "../../utils/axiosInstance";
import { auth, provider } from "../../config/config"; // Import Firebase auth and provider
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup function
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
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { showToast } from "../toast/toast";

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();


  console.log("NEXT_PUBLIC_FIREBASE_APIKEY",process.env.NEXT_PUBLIC_FIREBASE_APIKEY)
  console.log("NEXT_PUBLIC_FIREBASE_AUTHDOMAIN",process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN)
  console.log("NEXT_PUBLIC_FIREBASE_PROJECTID",process.env.NEXT_PUBLIC_FIREBASE_PROJECTID)
  console.log("NEXT_PUBLIC_FIREBASE_STORAGEBUCKET",process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET)
  console.log("NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID",process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID)
  console.log("NEXT_PUBLIC_FIREBASE_APPID",process.env.NEXT_PUBLIC_FIREBASE_APPID)
  console.log("NEXT_PUBLIC_FIREBASE_MEASUREMENTID",process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID)
  
  async function loginUser(email: string, password: string) {
    try {
      const response = await axiosInstance.post("/auth", { email, password });
      showToast("Login successful!", "success");
      const { accessToken, user } = response.data;
      const id = user.id;

      setAuthToken(accessToken);
      console.log("Login successful, token set");
      console.log(
        "Current headers after login:",
        axiosInstance.defaults.headers.common
      );
      dispatch(setCredentials({ accessToken, id, user }));
    } catch (error) {
      showToast("Something went wrong", "error");
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

  const handleLogInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      
      console.log("Logged in user:", user);
      // Additional logic if needed
    } catch (error) {
      console.error("Error signing in with Google:", error);
      showToast("Error signing in with Google", "error");
    }
  };

  return (
    <div>
     
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
            <Button className="w-full" type="submit" onClick={handleSubmit}>
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
              onClick={handleLogInGoogle} 
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
    
    </div>
  );
}
