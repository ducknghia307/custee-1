"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../../../../components/ui/dashboard/products/editProduct/editProduct.module.css";
import { MdArrowBackIos, MdCameraAlt } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { axiosInstance } from "@/utils/axiosInstance";
import { showToast } from "@/components/toast/toast";
import { uploadImage } from "@/redux/features/auth/authSlice";

const EditProductPage = () => {
    const router = useRouter();
    const params = useParams();
    const productId = params.id; // Get product ID from the URL
    const formRef = useRef(null); // Create a ref for the form

    const [selectedFrontImage, setSelectedFrontImage] = useState<string | null>(null);
    const [selectedBackImage, setSelectedBackImage] = useState<string | null>(null);

    interface ProductData {
      name: string;
      pattern: string;
      price: string;
      size: string[]; // Define size as string array if the sizes are string values like 'S', 'M', etc.
      images: {
          front: string;
          back: string;
      };
  }
  
  const [productData, setProductData] = useState<ProductData>({
      name: '',
      pattern: '',
      price: '',
      size: [],
      images: {
          front: '',
          back: ''
      }
  });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (productId) {
            // Fetch product data by ID
            const fetchProductData = async () => {
                try {
                    const response = await axiosInstance.get(`/api/product/${productId}`);
                    const product = response.data.metadata;
                    console.log("Fetched product data:", product);

                    setProductData({
                        name: product.name,
                        pattern: product.pattern,
                        price: product.price,
                        size: product.size || [],
                        images: {
                            front: product.images.front,
                            back: product.images.back
                        }
                    });
                    setSelectedFrontImage(product.images.front);
                    setSelectedBackImage(product.images.back);
                } catch (error) {
                    console.error("Error fetching product data:", error);
                }
            };

            fetchProductData();
        }
    }, [productId]);

    const handleFileChange = async (e, type) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileUrl = URL.createObjectURL(file);

            if (type === 'front') {
                setSelectedFrontImage(fileUrl);
            } else if (type === 'back') {
                setSelectedBackImage(fileUrl);
            }

            try {
                const imageUrl = await dispatch(uploadImage(productId, file));
                setProductData((prevData) => ({
                    ...prevData,
                    images: {
                        ...prevData.images,
                        [type]: imageUrl
                    }
                }));
                showToast("Image uploaded successfully", "success");
            } catch (error) {
                console.error("Error uploading image:", error);
                showToast("Failed to upload image", "error");
            }
        }
    };

    const handleSizeChange = (size) => {
        setProductData((prevData) => {
            const newSize = prevData.size.includes(size)
                ? prevData.size.filter((s) => s !== size)
                : [...prevData.size, size];
            return { ...prevData, size: newSize };
        });
    };

    const triggerFileInput = (type) => {
        document.getElementById(`${type}-upload`).click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch(`/api/product/${productId}`, productData);
            console.log("Product data updated successfully", response.data);
            router.push('/dashboard/products');
        } catch (error) {
            console.error("Error updating product data:", error);
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
                <Link href="/dashboard/products">
                    <button className={styles.addButton}>
                        <MdArrowBackIos size={20} className={styles.backIcon} />
                    </button>
                </Link>
                <h1 className={styles.headerTitle}>Update Product</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.uploadImageContainer}>

                <div className={styles.uploadImage}>
          <input type="file" id="front-upload" className={styles.fileInput} onChange={(e) => handleFileChange(e, 'front')} />
          <label htmlFor="front-upload" className={styles.imageUploadLabel} onClick={() => triggerFileInput('front')}>
            {selectedFrontImage ? (
              <img src={selectedFrontImage} alt="Front Image" className={styles.imagePreview} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <MdCameraAlt size={20} />
              </div>
            )}
          </label>
          <p className={styles.uploadText} onClick={() => triggerFileInput('front')}>Upload Front Photo</p>
        </div>

        <div className={styles.uploadImage}>
          <input type="file" id="back-upload" className={styles.fileInput} onChange={(e) => handleFileChange(e, 'back')} />
          <label htmlFor="back-upload" className={styles.imageUploadLabel} onClick={() => triggerFileInput('back')}>
            {selectedBackImage ? (
              <img src={selectedBackImage} alt="Back Image" className={styles.imagePreview} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <MdCameraAlt size={20} />
              </div>
            )}
          </label>
          <p className={styles.uploadText} onClick={() => triggerFileInput('back')}>Upload Back Photo</p>
        </div>
                </div>

                <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Product Name</label>
              <input type="text" name="name" value={productData.name} onChange={handleInputChange} placeholder="Enter product name" />
            </div>
            <div className={styles.inputGroup}>
              <label>Pattern</label>
              <input type="text" name="pattern" value={productData.pattern} onChange={handleInputChange} placeholder="Enter product pattern" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Price</label>
              <input type="text" name="price" value={productData.price} onChange={handleInputChange} placeholder="Enter price" />
            </div>
            {/* <div className={styles.inputGroup}>
              <label>Size</label>
              <div className={styles.sizeSelector}>
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <label key={size}>
                    <input type="checkbox" value={size} checked={productData.size.includes(size)} onChange={() => handleSizeChange(size)} /> {size}
                  </label>
                ))}
              </div>
            </div> */}
          </div>
        </form>
                <button type="submit" className={styles.submitButton} onClick={submitForm}>Update Now</button>
            </div>
        </div>
    );
}

export default EditProductPage;
