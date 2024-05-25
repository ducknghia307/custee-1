"use client";
import { dela } from "@/assets/fonts/font";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { showToast } from "@/components/toast/toast";
import { useAppSelector } from "@/redux/hook";
import axiosInstance, { setAuthToken } from "@/utils/axiosInstance";
import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);
  const handleChangePassword = async () => {
    // Check if new password matches the confirm password
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match");
      return;
    }
    setAuthToken(token);
    try {
      // Make API call to change password
      const response = await axiosInstance.post("/api/user/change_password", {
        userId: userId,
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      // Handle success response
      console.log("Password changed successfully:", response.data.message);
      setErrorMessage(""); // Clear error message
      // Clear form fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password changed successfully", "success");
    } catch (error) {
      // Handle error response
      console.error("Failed to change password:", error.response.data.error);
      setErrorMessage(error.response.data.error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>
          Change Password
        </p>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}
        <div
          style={{
            marginBottom: "20px",
            marginTop: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="mr-4 w-72">
            <label htmlFor="currentPassword">Current Password:</label>
          </div>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className="mr-4 w-72" htmlFor="newPassword">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className="mr-4 w-72" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          onClick={handleChangePassword}
          style={{
            backgroundColor: "#784BE6",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Change Password
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;
