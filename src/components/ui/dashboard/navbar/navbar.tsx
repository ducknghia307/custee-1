"use client"
import { usePathname } from "next/navigation"
import styles from "../navbar/navbar.module.css"
import { MdOutlineNotifications } from "react-icons/md"
import Image from "next/image"
import logo from "../../../../assets/logo/avatar1.jpg";
import React, { useEffect, useRef, useState } from "react"
import shirt from "../../../../assets/logo/shirt.webp";

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isIconClicked, setIsIconClicked] = useState(false);

    const dropdownRef = useRef(null);

    const handleIconClick = () => {
        setIsIconClicked(prev => !prev); // Đảo trạng thái của isIconClicked
        if (!isIconClicked) {
            setIsDropdownOpen(true); // Mở dropdown nếu icon được click
        } else {
            setIsDropdownOpen(false); // Đóng dropdown nếu icon được click lại
        }
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
    // Thêm event listener khi component mount
    document.addEventListener("mousedown", handleOutsideClick);

    // Trả về một hàm cleanup để loại bỏ event listener khi component unmount
    return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
    };
}, []);


    const pathname = usePathname()
    return (
        <div className={styles.container}>
            {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}
            <div className={styles.icons}>
                <MdOutlineNotifications size={24} onClick={handleIconClick} />
                {isDropdownOpen && (
                    <div ref={dropdownRef} className={styles.dropdown}>
                        <div className={styles.dropdownHeader}>
                            <span>Notification</span>
                        </div>
                        <div className={styles.dropdownContent}>
                            <div className={styles.dropdownItem}>
                                <div className={styles.itemHeader}>
                                    <span>User 1</span>
                                    <span>2 Orders</span>
                                </div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemProduct}>
                                        <Image src={shirt} alt="" className={styles.productImage} />
                                        <span className={styles.productName}>Custom Shirt 1</span>
                                    </div>
                                    <div className={styles.itemProduct}>
                                        <Image src={shirt} alt="" width={44} height={44} />
                                        <span className={styles.productName}>Custom Shirt 2</span>
                                    </div>
                                </div>
                                <div className={styles.itemTotal}>
                                    <span>Total: 500.000đ</span>
                                </div>
                            </div>
                            <div className={styles.dropdownItem}>
                                <div className={styles.itemHeader}>
                                    <span>User 2</span>
                                    <span>1 Order</span>
                                </div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemProduct}>
                                        <Image src={shirt} alt="" className={styles.productImage} />
                                        <span className={styles.productName}>Custom Shirt 3</span>
                                    </div>
                                </div>
                                <div className={styles.itemTotal}>
                                    <span>Total: 250.000đ</span>
                                </div>
                            </div>
                            <div className={styles.dropdownItem}>
                                <div className={styles.itemHeader}>
                                    <span>User 2</span>
                                    <span>1 Order</span>
                                </div>
                                <div className={styles.itemContent}>
                                    <div className={styles.itemProduct}>
                                        <Image src={shirt} alt="" className={styles.productImage} />
                                        <span className={styles.productName}>Custom Shirt 3</span>
                                    </div>
                                </div>
                                <div className={styles.itemTotal}>
                                    <span>Total: 250.000đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.user}>
                <Image src={logo} alt="" className={styles.userImage} />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Moni Roy</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
