"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

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
// import { ZodErrors } from "@/components/custom/ZodErrors";
// import { StrapiErrors } from "@/components/custom/StrapiErrors";
// import { SubmitButton } from "@/components/custom/SubmitButton";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SigninForm() {
  // const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  return (
    <div>
      <form>
        <Card style={{ height: "450px", width: "500px" }} className="space-y-1">
          <CardHeader className="space-y-1">
            <CardTitle className=" text-center text-3xl font-bold">
              Log In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="text-right text-sm">
              <Link className="underline ml-2" href="signup">
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Log In</Button>
          </CardFooter>
          <div className="mt-4 text-center text-sm " style={{width:"100%", height:"40px", display:"flex", justifyContent:"center"}}>
          <button style={{width:"120px", display:"flex", justifyContent:"center", alignItems:"center"}} className=" rounded-md border-2  bg-stone-50" >
            <img style={{width:"30px", height:"30px"}} src="google.png"></img>
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
