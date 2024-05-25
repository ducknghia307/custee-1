"use client";
import React, { useState, useEffect } from "react";
import axiosInstance, {
  setAuthToken,
} from "../../../utils/axiosInstance";
import Navbar from "@/components/navbar/Navbar";
import { useAppSelector } from "@/redux/hook";

const Page = () => {
  const token = useAppSelector((state) => state.auth.token); // Use selector to get the token
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      setAuthToken(token); // Set the token before making API call
      console.log("Token set in axios instance:", token);
    } else {
      console.error("Token not found in Redux state");
    }

    const getUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user");
        setUsers(response.data.metadata);
        console.log("User data:", response.data.metadata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [token]); // Add token as a dependency to useEffect

  return (
    <div>
      <Navbar />
      <h1>All Users</h1>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
