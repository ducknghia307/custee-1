"use client";

import React, { useState, useEffect } from 'react';
import { dela, montserrat_400, montserrat_500, montserrat_600, montserrat_700 } from "@/assets/fonts/font";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Image from 'next/image';
import profile from "../../assets/logo/profile.png";
import addprofile from "../../assets/logo/addprofile.png";
import { MdOutlineCancel } from 'react-icons/md';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(profile);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [designImages, setDesignImages] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check if all form fields are filled
        const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
        setIsFormValid(allFieldsFilled);
    }, [formData]);

    // Handle file change specifically for the profile image
    const handleProfileFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setProfileImage(URL.createObjectURL(file));
            setIsDefaultImage(false);
        }
    };

    // Handle file change specifically for the addprofile image
    const handleDesignFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const newImageUrl = URL.createObjectURL(file);
            setDesignImages(currentImages => [newImageUrl, ...currentImages]);
        }
    };

    // Trigger file input for changing profile photo
    const triggerProfileFileInput = () => {
        document.getElementById('profile-file-upload').click();
    };

    const triggerDesignFileInput = () => {
        document.getElementById('design-file-upload').click();
    };

    const handleRemoveImage = (index) => {
        setDesignImages(currentImages => currentImages.filter((_, i) => i !== index));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phoneNumber' && !/^\d*$/.test(value)) {
            return; // Only allow digits for phone number
        }
        setFormData({ ...formData, [name]: value });
    };

    const borderStyle = isDefaultImage ? 'bg-purple-300' : 'border border-solid border-[#fff394]';

    return (
        <div className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
            <Navbar />
            <div className="w-full flex flex-col justify-center items-center mt-32">
                <p className={`text-3xl font-black ${dela.className}`}>ACCOUNT</p>
            </div>
            <div className="w-full max-w-3xl mx-auto flex flex-row justify-center gap-10 mt-16">
                <div className="flex flex-col items-center">
                    <div className={`relative w-36 h-36 rounded-full overflow-hidden ${borderStyle}`}>
                        <Image
                            src={profileImage}
                            alt="Profile"
                            layout="fill"
                            objectFit={isDefaultImage ? 'contain' : 'cover'}
                            objectPosition="center"
                        />
                    </div>
                    <input type="file" id="profile-file-upload" className="hidden" onChange={handleProfileFileChange} />
                    <button className={`text-purple-500 text-20 mt-2 ${montserrat_400.className}`} onClick={triggerProfileFileInput}>
                        Change profile photo
                    </button>
                </div>
                <form className="w-full max-w-md space-y-2 ml-4">
                    <div className="flex items-center">
                        <label className={`w-1/3 font-black  text-right pr-5 ${montserrat_400.className}`}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                            style={{ backgroundColor: "#fff" }}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className={`w-1/3 font-black  text-right pr-5 ${montserrat_400.className}`}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                            style={{ backgroundColor: "#fff" }}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className={`w-1/3 font-black  text-right pr-5 ${montserrat_400.className}`}>Phone number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                            style={{ backgroundColor: "#fff" }}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className={`w-1/3 font-black  text-right pr-5 ${montserrat_400.className}`}>Date of birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                            style={{ backgroundColor: "#fff" }}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className={`w-1/3 font-black  text-right pr-5 ${montserrat_400.className}`}>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-2/3 p-2 border border-gray-300 rounded ${montserrat_400.className}`}
                            style={{ backgroundColor: "#fff" }}
                        />
                    </div>
                </form>
            </div>
            <button
                type="button"
                className={`mt-10 px-10 py-2 text-white rounded ${montserrat_600.className}`}
                style={{
                    fontSize: "20px",
                    backgroundColor: isFormValid ? "#784BE6" : "rgba(120, 75, 230, 0.5)",
                    color: "#fff",
                    cursor: isFormValid ? "pointer" : "not-allowed"
                }}
                disabled={!isFormValid}
            >
                Update Your Profile
            </button>
            <div className="w-full max-w-2xl mx-auto mb-10 mt-10">
                <p className={`mb-2 font-black ${montserrat_700.className}`} style={{ fontSize: "22px", fontWeight: "bolder" }}>Your designs</p>
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
                        <div key={index} style={{ backgroundColor: "#fbf7d6" }} className="relative w-60 h-40 border border-gray-300 rounded flex justify-center items-center">
                            <button
                                onClick={() => handleRemoveImage(index)}
                                style={{ position: 'absolute', top: '5px', right: '5px', padding: '2px 8px', cursor: 'pointer', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: "50%" }}
                            >
                                ×
                            </button>
                            <Image
                                src={image}
                                alt="Design"
                                width={120}
                                height={120}
                                style={{ opacity: "100%" }}
                            />
                        </div>
                    ))}
                    <input type="file" id="design-file-upload" className="hidden" onChange={handleDesignFileChange} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
