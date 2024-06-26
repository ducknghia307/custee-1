"use client"
import { useState } from "react";
import styles from "../../../../../components/ui/dashboard/usermanagement/addUser/addUser.module.css"
import { MdArrowBackIos, MdCameraAlt } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCalendarMonth } from 'react-icons/md';
import Link from "next/link";

const AddUserPage = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState(new Date());

    const handleFileChange = ({ target }) => {
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };

    const focusDatePickerInput = () => {
        const inputElement = document.querySelector<HTMLInputElement>('.react-datepicker__input-container input');
        if (inputElement) {
            inputElement.focus();
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
                <h1 className={styles.headerTitle}>Add New User</h1>
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

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>User Name</label>
                            <input type="text" placeholder="Enter user name" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Address</label>
                            <input type="text" placeholder="Enter user address" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input type="email" placeholder="Enter user email" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Phone Number</label>
                            <input type="text" placeholder="Enter user phone number" />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="Enter password" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Date of Birth</label>
                        <div className={styles.datePickerContainer}>
                            <DatePicker
                                selected={birthDate}
                                onChange={(date) => setBirthDate(date)}
                                customInput={<input type="text" placeholder="Enter user birthday" />}
                                dateFormat="dd/MM/yyyy"
                            />
                            <MdCalendarMonth
                                size={20}
                                className={styles.calendarIcon}
                                onClick={focusDatePickerInput}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Gender</label>
                        <div className={styles.sizeSelector}>
                            <label>
                                <input type="radio" name="gender" value="Male" /> Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" /> Female
                            </label>
                        </div>
                    </div>
                </form>
                <button type="submit" className={styles.submitButton}>Add New User</button>
            </div>
        </div>
    );
}

export default AddUserPage;
