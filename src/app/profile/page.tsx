"use client";

import React, { useState, useEffect } from "react";
import {
  dela,
  montserrat_400,
  montserrat_500,
  montserrat_600,
  montserrat_700,
} from "@/assets/fonts/font";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import profile from "../../assets/logo/profile.png";
import addprofile from "../../assets/logo/addprofile.png";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { uploadImage } from "@/redux/features/auth/authSlice";
import { showToast } from "@/components/toast/toast";
import { axiosInstance } from "@/utils/axiosInstance";

const Profile = () => {
  const [isDefaultImage, setIsDefaultImage] = useState(true);
  const [designImages, setDesignImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonText, setButtonText] = useState("Update Your Profile");
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    dateOfBirth: "", // Add dateOfBirth to formData
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const id = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    axiosInstance
      .get(`/api/user/${id}`)
      .then((res) => {
        const dateOfBirth = res.data.metadata.dateOfBirth
          ? new Date(res.data.metadata.dateOfBirth).toISOString().split("T")[0]
          : "";
        setFormData({
          avatar: res.data.metadata.avatar,
          username: res.data.metadata.username,
          email: res.data.metadata.email,
          phone: res.data.metadata.phone,
          gender: res.data.metadata.gender || "",
          address: res.data.metadata.address,
          dateOfBirth, // Initialize dateOfBirth
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleProfileFileChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedProfileImage(file);
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
      setIsDefaultImage(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDesignFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setDesignImages((currentImages) => [newImageUrl, ...currentImages]);
    }
  };

  const triggerProfileFileInput = () => {
    document.getElementById("profile-file-upload").click();
  };

  const triggerDesignFileInput = () => {
    document.getElementById("design-file-upload").click();
  };

  const handleRemoveImage = (index) => {
    setDesignImages((currentImages) =>
      currentImages.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let avatarUrl = formData.avatar;

      if (selectedProfileImage) {
        avatarUrl = await dispatch(uploadImage(id, selectedProfileImage));
        setFormData({ ...formData, avatar: avatarUrl });
      }

      const response = await axiosInstance.patch(`/api/user/${id}`, {
        ...formData,
        avatar: avatarUrl,
      });

      console.log("Profile updated successfully:", response.data);
      showToast("Profile updated successfully", "success");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const borderStyle = isDefaultImage
    ? "bg-purple-300"
    : "border border-solid border-[#fff394]";

  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <p className={`text-3xl font-black ${dela.className}`}>ACCOUNT</p>
      </div>
      <div className="w-full max-w-3xl mx-auto flex flex-row justify-center gap-10 mt-16">
        <div className="flex flex-col items-center">
          <div
            className={`relative w-36 h-36 rounded-full mt-10 overflow-hidden ${borderStyle}`}
            style={{
              border: "1px ridge purple",
            }}
          >
            <Image
              src={formData.avatar || profile}
              alt="Profile"
              layout="fill"
            />
          </div>

          <input
            type="file"
            id="profile-file-upload"
            className="hidden"
            onChange={handleProfileFileChange}
          />
          {isEditing && (
            <button
              className={`text-purple-500 text-20 mt-2 ${montserrat_400.className}`}
              onClick={triggerProfileFileInput}
            >
              Change profile photo
            </button>
          )}
        </div>
        <div className="w-full max-w-md space-y-2">
          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Username", name: "username", type: "text" },
            { label: "Phone number", name: "phone", type: "tel" },
            { label: "Gender", name: "gender", type: "select" },
            { label: "Address", name: "address", type: "text" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" }, // Add dateOfBirth field
          ].map((field) => (
            <div key={field.name} className="flex items-center">
              <label
                className={`w-1/3 font-black text-right pr-5 ${montserrat_400.className}`}
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: isEditing ? "#fff" : "#F0F0F0",
                  }}
                  disabled={!isEditing}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                  style={{
                    border: field.name === "email" ? "none" : "1px solid #ccc",
                    backgroundColor:
                      field.name === "email"
                        ? "#fff"
                        : isEditing
                        ? "#fff"
                        : "#F0F0F0",
                  }}
                  disabled={!isEditing || field.name === "email"}
                />
              )}
            </div>
          ))}
          {isEditing ? (
            <div>
              <button
                className={`mt-16 px-10 py-2 text-white rounded ${montserrat_600.className}`}
                onClick={toggleEdit}
                style={{
                  marginTop: "30px",
                  fontSize: "18px",
                  backgroundColor: "red",
                  color: "#fff",
                }}
              >
                Cancel
              </button>{" "}
              <button
                type="submit"
                onClick={handleFormSubmit}
                className={`mt-16 px-10 py-2 text-white rounded ${montserrat_600.className}`}
                style={{
                  marginTop: "30px",
                  fontSize: "18px",
                  backgroundColor: "green",
                  color: "#fff",
                }}
              >
                Confirm
              </button>{" "}
            </div>
          ) : (
            <div>
              <button
                className={`mt-16 px-10 py-2 text-white rounded ${montserrat_600.className}`}
                onClick={toggleEdit}
                style={{
                  marginTop: "30px",
                  fontSize: "18px",
                  backgroundColor: "#784BE6",
                  color: "#fff",
                }}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto mb-10 mt-10">
        <p
          className={`mb-2 font-black ${montserrat_700.className}`}
          style={{ fontSize: "22px", fontWeight: "bolder" }}
        >
          Your designs
        </p>
        <div className="grid grid-flow-col auto-cols-max gap-6 overflow-x-auto pb-2">
          <div
            style={{ backgroundColor: "#fbf7d6" }}
            className="w-60 h-40 border border-gray-300 rounded flex justify-center items-center cursor-pointer hover:border-purple-400 transition duration-300"
            onClick={triggerDesignFileInput}
          >
            <Image
              src={addprofile}
              alt="Add Design"
              width={80}
              height={80}
              style={{ opacity: "50%" }}
            />
          </div>
          {designImages.map((image, index) => (
            <div
              key={index}
              style={{ backgroundColor: "#fbf7d6" }}
              className="relative w-60 h-40 border border-gray-300 rounded flex justify-center items-center overflow-hidden"
            >
              <Image
                src={image}
                alt={`Design ${index + 1}`}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
              <button
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          id="design-file-upload"
          className="hidden"
          onChange={handleDesignFileChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
