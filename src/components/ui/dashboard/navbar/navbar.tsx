"use client"
import { usePathname } from "next/navigation"
import styles from "../navbar/navbar.module.css"
import { MdOutlineNotifications } from "react-icons/md"
import Image from "next/image"
import logo from "../../../../assets/logo/avatar1.jpg";
import React, { useEffect, useRef, useState } from "react"
import shirt from "../../../../assets/logo/shirt.webp";
import Link from "next/link"
import { axiosInstance } from "@/utils/axiosInstance"
import { useAppDispatch } from "@/redux/hook"
import { showToast } from "@/components/toast/toast"
import { logOut as logOutAction } from "../../../../redux/features/auth/authSlice";


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

    const dispatch = useAppDispatch();

    async function logOut() {
        try {
            const response = await axiosInstance.post("/auth/logout", {});
            dispatch(logOutAction());
            showToast("Logged out successfully", "");
        } catch (error) {
            showToast("Something went wrong", "error");
            throw error;
        }
    }

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
            {/* <div className={styles.user}>
                <Image src={logo} alt="" className={styles.userImage} />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Moni Roy</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div> */}

            <div className="hs-dropdown relative inline-flex">
                <button
                    id="hs-dropdown-with-title"
                    type="button"
                    className="mr-3 hs-dropdown-toggle inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                >
                    <Image src={logo} alt="" className={styles.userImage} />
                </button>
                <div className={styles.userDetail}>
                    <span className={styles.username}>Moni Roy</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
                <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                    style={{ zIndex: 1000 }}
                    aria-labelledby="hs-dropdown-with-title"
                >
                    <div className="py-2 first:pt-0 last:pb-0">
                        <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500 mb-2">
                            Admin zone
                        </span>
                        <Link
                            className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                            href="/"
                            onClick={logOut}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="currentColor"
                            >
                                <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path>
                            </svg>
                            Log out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
