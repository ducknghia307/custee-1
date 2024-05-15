"use client"

import { useState } from "react";
import styles from "../../../../components/ui/dashboard/products/addProduct/addProduct.module.css"
import { MdArrowBackIos, MdCameraAlt } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCalendarMonth } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Link from "next/link";


const EditProductPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);  

    const handleFileChange = ({ target }) => {
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setSelectedImage(URL.createObjectURL(file));  
        }
    };

    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };

    return (
        <div >
            <div className={styles.headerContainer}>
                <Link href="/dashboard/products">
                    <button className={styles.addButton}>
                        <MdArrowBackIos size={20} className={styles.backIcon} />
                    </button>
                </Link>
                <h1 className={styles.headerTitle}>Update Product</h1>
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
                    <p className={styles.uploadText} onClick={triggerFileInput}>Upload Photo</p>                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Product Name</label>
                            <input type="text" placeholder="Enter your product name" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Class</label>
                            <input type="text" placeholder="Enter class" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>Category</label>
                            <input type="text" placeholder="Enter category" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Price</label>
                            <input type="text" placeholder="Enter price" />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Description</label>
                        <textarea placeholder="Enter description"></textarea>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Size</label>
                        <div className={styles.sizeSelector}>
                            <label><input type="checkbox" value="S" /> S</label>
                            <label><input type="checkbox" value="M" /> M</label>
                            <label><input type="checkbox" value="L" /> L</label>
                            <label><input type="checkbox" value="XL" /> XL</label>
                        </div>
                    </div>
                </form>
                <button type="submit" className={styles.submitButton}>Update Now</button>
            </div>
        </div>
    );
}

export default EditProductPage