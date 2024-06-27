"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import styles from "../../../components/ui/dashboard/products/products.module.css";
import shirt from "../../../assets/logo/shirt.webp";
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import Search from "@/components/ui/dashboard/search/search";
import ModalDelete from "@/components/ui/dashboard/usermanagement/deleteUser/deleteModal";
import { axiosInstance } from "@/utils/axiosInstance";

export default function ProductsPage() {
  const [selectedReason, setSelectedReason] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/product");
      console.log("Response Data:", response.data); 
      setProducts(response.data.metadata || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>Product Management</h3>
      <div className={styles.top}>
        {/* <Link href="/dashboard/products/add">
          <button className={styles.addButton}>
            <MdOutlineAdd />
            Add New Product
          </button>
        </Link> */}
        <Search
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div >
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Front Image</td>
              <td>Back Image</td>
              <td>Product Name</td>
              <td>Pattern</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.imageContainer}>
                      <Image
                        src={product.images?.front || shirt}
                        alt={product.name}
                        width={50}
                        height={60}
                        className={styles.userImage}
                      />
                    </div>
                  </td>
                  <td>
                    <div className={styles.imageContainer}>
                      <Image
                        src={product.images?.back || shirt}
                        alt={product.name}
                        width={50}
                        height={60}
                        className={styles.userImage}
                      />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.pattern}</td>
                  <td>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/products/edit/${product._id}`}>
                        <MdOutlineEdit size={20} className={styles.buttonEdit} />
                      </Link>
                      <MdDeleteOutline
                        size={20}
                        className={styles.buttonDelete}
                        onClick={() => {
                          setOpen(true);
                          setSelectedReason(product);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
      <ModalDelete open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <h3 className={styles.h3header}>Do you want to delete this product?</h3>
          <div className={styles.buttonConfirm}>
            <button className={styles.buttonYes} onClick={() => {/* handleDeleteProduct */ }}>
              Yes
            </button>
            <button className={styles.buttonNo} onClick={() => setOpen(false)}>
              No
            </button>
          </div>
        </div>
      </ModalDelete>
    </div>
  );
}
