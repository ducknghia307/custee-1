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

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
};

export function SignupForm() {
  //   const [formState, formAction] = useFormState(
  //     registerUserAction,
  //     INITIAL_STATE
  //   );

  return (
    <div className="w-full max-w-md">
      <form>
        <Card style={{ minHeight: "450px", width: "500px" }}>
          <CardHeader className="space-y-1">
            <CardTitle className=" text-center text-3xl font-bold">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone"
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
            <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
        
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign Up</Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="login">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
