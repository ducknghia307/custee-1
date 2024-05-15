"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import styles from "../../../components/ui/dashboard/products/products.module.css"
import shirt from "../../../assets/logo/shirt.webp";
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import Search from "@/components/ui/dashboard/search/search";
import ModalDelete from "@/components/ui/dashboard/usermanagement/deleteUser/deleteModal";

export default function ProductsPage() {

  const [selectedReason, setSelectedReason] = useState('');

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>Product Management</h3>
      <div className={styles.top}>
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>
            <MdOutlineAdd />
            Add New Product
          </button>
        </Link>
        <Search placeholder="Search for a product..." />

      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Image</td>
            <td>Product Name</td>
            <td>Class</td>
            <td>Size</td>
            <td>Price</td>
            <td>Category</td>
            <td>Description</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff" }}>
          <tr>
            <td>
              <div className={styles.user}>
                <Image src={shirt} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>Basic T-shirt</td>
            <td>Custom</td>
            <td>S</td>
            <td>100.000đ</td>
            <td>T-shirt</td>
            <td>Áo để thiết kế</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image src={shirt} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>Basic T-shirt</td>
            <td>Custom</td>
            <td>S</td>
            <td>100.000đ</td>
            <td>T-shirt</td>
            <td>Áo để thiết kế</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)} />
              </div>
            </td>
          </tr><tr>
            <td>
              <div className={styles.user}>
                <Image src={shirt} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>Basic T-shirt</td>
            <td>Custom</td>
            <td>S</td>
            <td>100.000đ</td>
            <td>T-shirt</td>
            <td>Áo để thiết kế</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)} />
              </div>
            </td>
          </tr><tr>
            <td>
              <div className={styles.user}>
                <Image src={shirt} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>Basic T-shirt</td>
            <td>Custom</td>
            <td>S</td>
            <td>100.000đ</td>
            <td>T-shirt</td>
            <td>Áo để thiết kế</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)} />
              </div>
            </td>
          </tr><tr>
            <td>
              <div className={styles.user}>
                <Image src={shirt} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>Basic T-shirt</td>
            <td>Custom</td>
            <td>S</td>
            <td>100.000đ</td>
            <td>T-shirt</td>
            <td>Áo để thiết kế</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/products/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
      <ModalDelete open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <h3 className={styles.h3header}>
            Do you want to delete this shirt?
          </h3>
          {/* <hr className="border-t-solid border-1 border-grey" /> */}
          <div className={styles.buttonConfirm}>
            {/* <button className={styles.buttonBan} onClick={() => setOpen(false)}> */}
            <button className={styles.buttonYes} >
              Yes
            </button>
            <button className={styles.buttonNo} >
              No
            </button>
          </div>
        </div>
      </ModalDelete>
    </div>


  );
}
