"use client"

import Link from "next/link";
import styles from "../menuLink/menuLink.module.css";
import { usePathname } from "next/navigation";


interface MenuItem {
    path: string;
    icon: React.ReactNode; 
    title: string;
}

interface MenuLinkProps {
    item: MenuItem;
}

const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
    const pathname = usePathname();

    const isActive = pathname.includes(item.path);

    return (
        <Link href={item.path} className={`${styles.container} ${isActive ? styles.active : ""}`}>
            {item.icon}
            {item.title}
        </Link>
    );
};


export default MenuLink;
