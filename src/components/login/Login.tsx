"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { publicAxios, setAuthToken } from "../../utils/axiosInstance";
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
import {
  dela,
  montserrat_400,
  montserrat_500,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import bg from "../../assets/logo/bg1.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  // console.log("NEXT_PUBLIC_FIREBASE_APIKEY",process.env.NEXT_PUBLIC_FIREBASE_APIKEY)
  // console.log("NEXT_PUBLIC_FIREBASE_AUTHDOMAIN",process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN)
  // console.log("NEXT_PUBLIC_FIREBASE_PROJECTID",process.env.NEXT_PUBLIC_FIREBASE_PROJECTID)
  // console.log("NEXT_PUBLIC_FIREBASE_STORAGEBUCKET",process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET)
  // console.log("NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID",process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID)
  // console.log("NEXT_PUBLIC_FIREBASE_APPID",process.env.NEXT_PUBLIC_FIREBASE_APPID)
  // console.log("NEXT_PUBLIC_FIREBASE_MEASUREMENTID",process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!email) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Email must be a valid email address";
    }
    return "";
  };

  // const validatePassword = (password) => {
  //   if (!password) {
  //     return "Password is required";
  //   } else if (password.length < 8) {
  //     return "Password must be at least 8 characters long";
  //   }
  //   return "";
  // };

  async function loginUser(email: string, password: string) {
    try {
      const response = await publicAxios.post("/auth", { email, password });
      showToast("Login successful!", "success");
      const { accessToken, user } = response.data;
      console.log(response);

      const id = user.id;
      localStorage.setItem("userId", id);
      setAuthToken(accessToken);
      console.log("Login successful, token set");
      dispatch(setCredentials({ accessToken, id, user }));
      if (user.role === "user") router.push("/");
      else if (user.role === "admin") router.push("/dashboard");
    } catch (error) {
      showToast("Something went wrong", "error");
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const emailError = validateEmail(email);
    // const passwordError = validatePassword(password);

    // setEmailError(emailError);
    // setPasswordError(passwordError);

    // if (!emailError) {
    try {
      await loginUser(email, password);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Your account is banned.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
    // }
  };

  const handleLogInGoogle = async () => {
    try {
      console.log("Attempting to sign in with Google...");
      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in result:", result);

      // Send the user details to your backend
      const response = await publicAxios.post("/auth/google_login", {
        username: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      });

      console.log("Backend response:", response);
      console.log("Logged in user:", result.user);
      // Additional logic if needed
      const { accessToken,user } = response.data;
      const id = response.data.user.id
      setAuthToken(accessToken);
     

      console.log("Login successful, token set");
      dispatch(setCredentials({ accessToken, id, user }));
      showToast("Login successful!", "success");
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      showToast("Error signing in with Google", "error");
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
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        className="space-y-1"
      >
        <CardHeader className="space-y-1">
          <div className="w-full flex flex-col justify-center items-center mt-8 mb-4">
            <p className={`text-3xl font-black ${dela.className}`}>ACCOUNT</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
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
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${montserrat_400.className}`}
              style={{ height: "40px", fontSize: "15px" }}
            />
            {/* {emailError && <p style={{ color: "red" }}>{emailError}</p>} */}
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
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiFillEye className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            {/* {passwordError && <p style={{ color: "red" }}>{passwordError}</p>} */}
          </div>
          <div className="text-right text-sm">
            <Link
              className={`underline ml-2 ${montserrat_400.className}`}
              href="forgotpassword"
            >
              Forgot password?
            </Link>
          </div>
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
            Log In
          </Button>
        {errorMessage && <p style={{ color: "red", marginTop:"20px" }}>{errorMessage}</p>}
        </CardFooter>
        <div
          className="mt-4 text-center text-sm"
          style={{
            width: "100%",
            height: "45px",
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
              gap: "5px",
            }}
            className={`rounded-md border-2 bg-stone-50 ${montserrat_400.className}`}
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src="google.png"
              alt="Google"
            ></img>
            Google
          </button>
        </div>
        <div
          className={`text-center text-sm ${montserrat_400.className}`}
          style={{ paddingTop: "20px" }}
        >
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
}
