"use client"

import { useState } from 'react';
import styles from "../sidebar/sidebar.module.css"
import { MdAllInbox, MdOutlineLogout, MdOutlineShoppingBag, MdPersonOutline, MdOutlineDashboard, MdKeyboardArrowRight } from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import logo from "../../../../assets/logo/custee-admin.png";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdOutlineDashboard size={18}/>,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdPersonOutline size={18}/>,
                submenus: [
                    {
                        title: "User Management",
                        path: "/dashboard/users/usermanagement",
                        icon: <MdKeyboardArrowRight size={15}/> // You can choose a different icon here
                    }
                ]
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <MdOutlineShoppingBag size={18}/>,
                submenus: [
                    {
                        title: "Product Management",
                        path: "/dashboard/products",
                        icon: <MdKeyboardArrowRight size={15}/> // You can choose a different icon here
                    }
                ]
            },
            {
                title: "Order Lists",
                path: "/dashboard/orderlists",
                icon: <MdAllInbox size={18}/>
            },
            {
                title: "Sign Out",
                path: "/dashboard/sign_out",//temporarily
                icon: <MdOutlineLogout size={18}/>
            },
        ]
    }
];

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState("");
    const [activeSubMenu, setActiveSubMenu] = useState("");

    const toggleSubMenu = (title) => {
        if (activeMenu === title) {
            setActiveMenu("");
            setActiveSubMenu(""); 
        } else {
            setActiveMenu(title);
            if (title === "Users") {
                setActiveSubMenu("User Management");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image src={logo} alt="" className={styles.userImage} />
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li className={styles.listname} key={cat.title}>
                        {cat.list.map((item) => (
                            <>
                                <div onClick={() => toggleSubMenu(item.title)}>
                                    <MenuLink item={item} key={item.title} />
                                </div>
                                {item.submenus && item.title === activeMenu && (
                                    <ul>
                                        {item.submenus.map((sub) => (
                                            <li key={sub.title} className={`${sub.title === "User Management" || sub.title === "Product Management" ? styles.smallFontSize : ""} ${styles.submenuItem}`}>
                                                <MenuLink item={sub} key={sub.title} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
