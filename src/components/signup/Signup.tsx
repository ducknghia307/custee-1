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
import {axiosInstance , setAuthToken } from "../../utils/axiosInstance";
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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.post("/auth/register", {
  //       email,
  //       username,
  //       password,
  //       phone,
  //     });
  //     // localStorage.setItem("userId", id);
  //     console.log("Registration response:", response.data.user);

  //     // Assuming the token is in response.data.token
  //     const { token, user } = response.data;
   
      
  //     const id=user._id
  //     let accessToken = token;
  //     await setAuthToken(token);
  //     dispatch(setCredentials({ accessToken, user ,id}));
  //     showToast("Registration successful", "success");
  //     // Redirect to home page
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Registration error:", error.response.data);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    setUsernameError(usernameError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (!usernameError && !emailError && !phoneError && !passwordError && !confirmPasswordError) {
      try {
        const response = await axiosInstance.post("/auth/register", {
          email,
          username,
          password,
          phone,
        });

        console.log("Registration response:", response.data.user);
        const { token, user } = response.data;
        const id = user._id;
        let accessToken = token;
        await setAuthToken(token);
        dispatch(setCredentials({ accessToken, user, id }));
        showToast("Registration successful", "success");
        router.push("/");
      } catch (error) {
        console.error("Registration error:", error.response.data);
      }
    }
  };

  const validateUsername = (username) => {
    if (!username) {
      return "Username is required";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Email must be a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    if (!phone) {
      return "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
      return "Phone number must be a valid format";
    }
    return "";
  };

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

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        paddingTop:"50px",
        paddingBottom:"30px",
      }}
    >
      <Card
        style={{
          width: "600px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
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
            <Label
              className={`${montserrat_600.className}`}
              style={{ fontSize: "18px" }}
              htmlFor="username"
            >
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
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          </div>
          <div className="space-y-2">
            <Label
              className={`${montserrat_600.className}`}
              style={{ fontSize: "18px" }}
              htmlFor="email"
            >
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
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="space-y-2">
            <Label
              className={`${montserrat_600.className}`}
              style={{ fontSize: "18px" }}
              htmlFor="phone"
            >
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
            {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
          </div>
          <div className="space-y-2">
            <Label
              className={`${montserrat_600.className}`}
              style={{ fontSize: "18px" }}
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            <Label
              className={`${montserrat_600.className}`}
              style={{ fontSize: "18px" }}
              htmlFor="confirmPassword"
            >
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
