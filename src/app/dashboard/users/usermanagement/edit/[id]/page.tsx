"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../../../../components/ui/dashboard/usermanagement/editUser/editUser.module.css";
import { MdArrowBackIos, MdCameraAlt, MdLockOutline } from "react-icons/md";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAppDispatch } from "@/redux/hook";
import { uploadImage } from "@/redux/features/auth/authSlice";
import { showToast } from "@/components/toast/toast";

const EditUserPage = () => {
    const router = useRouter();
    const params = useParams();
    const userId = params.id; // Get user ID from the URL
    const formRef = useRef(null); // Create a ref for the form
    const [selectedImage, setSelectedImage] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        address: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '', // Add dateOfBirth to userData
        avatar: '', // Add avatar to userData
        status: '', // Add status to userData
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userId) {
            // Fetch user data by ID
            const fetchUserData = async () => {
                try {
                    const response = await axiosInstance.get(`/api/user/${userId}`);
                    const user = response.data.metadata;
                    console.log("Fetched user data:", user); 
                    
                    // Format dateOfBirth to yyyy-mm-dd for input type="date"
                    const formattedDateOfBirth = user.dateOfBirth
                        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                        : '';
                    
                    setUserData({
                        username: user.username,
                        address: user.address,
                        email: user.email,
                        phone: user.phone,
                        gender: user.gender,
                        dateOfBirth: formattedDateOfBirth, // Initialize dateOfBirth
                        avatar: user.avatar,
                        status: user.status, // Initialize status
                    });
                    setSelectedImage(user.avatar);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserData();
        }
    }, [userId]);

    const handleFileChange = async ({ target }) => {
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setSelectedImage(URL.createObjectURL(file));

            try {
                const avatarUrl = await dispatch(uploadImage(userId, file));
                setUserData({ ...userData, avatar: avatarUrl });
                showToast("Image uploaded successfully", "success");
            } catch (error) {
                console.error("Error uploading image:", error);
                showToast("Failed to upload image", "error");
            }
        }
    };

    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Exclude the email field from the update payload
            const { email, ...updatedData } = userData;
            console.log(`Updating user with ID: ${userId}`, updatedData);
            const response = await axiosInstance.patch(`/api/user/${userId}`, updatedData);
            console.log("User data updated successfully", response.data);
            router.push('/dashboard/users/usermanagement');
            showToast("Update user successfully", "success")
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const submitForm = () => {
        if (formRef.current) {
            formRef.current.requestSubmit(); // Use requestSubmit to submit the form
        }
    };

    return (
        <div>
            <div className={styles.headerContainer}>
                <Link href="/dashboard/users/usermanagement">
                    <button className={styles.addButton}>
                        <MdArrowBackIos size={20} className={styles.backIcon} />
                    </button>
                </Link>
                <h1 className={styles.headerTitle}>Update User</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.uploadImage}>
                    <input type="file" id="file-upload" className={styles.fileInput} onChange={handleFileChange} />
                    <label htmlFor="file-upload" className={styles.imageUploadLabel}>
                        {selectedImage ? (
                            <img src={selectedImage} alt="Uploaded" className={styles.imagePreview} />
                        ) : (
                            <div className={styles.imagePlaceholder}>
                                <MdCameraAlt size={20} />
                            </div>
                        )}
                    </label>
                    <p className={styles.uploadText} onClick={triggerFileInput}>Upload Photo</p>
                </div>
                <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>User Name</label>
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                placeholder="Enter user name"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={userData.address}
                                onChange={handleInputChange}
                                placeholder="Enter user address"
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <div className={styles.emailWrapper}>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter user email"
                                    disabled
                                    className={styles.disabledInput}
                                />
                                <MdLockOutline className={styles.disabledIcon} />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter user phone number"
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={userData.dateOfBirth}
                            onChange={handleInputChange}
                            placeholder="Enter user date of birth"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Gender</label>
                        <div className={styles.sizeSelector}>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={userData.gender === 'Male'}
                                    onChange={handleInputChange}
                                /> Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={userData.gender === 'Female'}
                                    onChange={handleInputChange}
                                /> Female
                            </label>
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Status</label>
                        <div className={styles.sizeSelector}>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Available"
                                    checked={userData.status === 'Available'}
                                    onChange={handleInputChange}
                                /> Available
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Non-Available"
                                    checked={userData.status === 'Non-Available'}
                                    onChange={handleInputChange}
                                /> Non-Available
                            </label>
                        </div>
                    </div>
                </form>
                <button type="button" className={styles.submitButton} onClick={submitForm}>Update Now</button>
            </div>
        </div>
    );
}

export default EditUserPage;
