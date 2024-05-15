"use client"

import Pagination from "@/components/ui/dashboard/pagination/pagination"
import styles from "../../../components/ui/dashboard/orderlists/orderlists.module.css"
import Link from "next/link"
import Image from "next/image"
import { MdOutlineEdit } from "react-icons/md"
import { useState } from "react"
import ModalEditStatus from "@/components/ui/dashboard/orderlists/modalstatus/modalstatus"
import shirt from "../../../assets/logo/shirt.webp";


const OrderList = () => {

    const [open, setOpen] = useState<boolean>(false)

    //màu test thoai
    const getStatusStyle = (status) => {
        const baseStyle = {
            padding: '5px 10px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '80px',
            display: 'inline-block',
            fontWeight: '600'
        };

        switch (status) {
            case 'Completed':
                return { ...baseStyle, color: '#00B69B', backgroundColor: '#E0F2F1' };
            case 'Processing':
                return { ...baseStyle, color: '#6226EF', backgroundColor: '#EDE7F6' };
            case 'Rejected':
                return { ...baseStyle, color: '#EF3826', backgroundColor: '#FCE4EC' };
            case 'Pending':
                return { ...baseStyle, color: '#FFA756', backgroundColor: '#FFF3E0' };
            case 'Delivering':
                return { ...baseStyle, color: '#6D9CF6', backgroundColor: '#E3F2FD' };
            default:
                return {};
        }
    };


    return (
        <div className={styles.container}>
            <h3 className={styles.h3}>Order Lists</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>ADDRESS</td>
                        <td>DATE</td>
                        <td>AMOUNT OF ORDER</td>
                        <td>TOTAL</td>
                        <td>STATUS</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff" }}>
                    <tr>
                        <td>00001</td>
                        <td>Christine Brooks</td>
                        <td>089 Kutch Green Apt. 448</td>
                        <td>04 Sep 2019</td>
                        <td>1</td>
                        <td>2.000.000₫</td>
                        <td>
                            <span style={getStatusStyle('Pending')}>
                                Pending
                            </span>
                        </td>

                        <td>
                            <MdOutlineEdit onClick={() => setOpen(true)} size={5} className={styles.button} />
                        </td>
                    </tr>
                    <tr>
                        <td>00001</td>
                        <td>Christine Brooks</td>
                        <td>089 Kutch Green Apt. 448</td>
                        <td>04 Sep 2019</td>
                        <td>1</td>
                        <td>2.000.000₫</td>
                        <td>
                            <span style={getStatusStyle('Completed')}>
                                Completed
                            </span>
                        </td>

                        <td>
                            <MdOutlineEdit onClick={() => setOpen(true)} size={5} className={styles.button} />
                        </td>
                    </tr>
                    <tr>
                        <td>00001</td>
                        <td>Christine Brooks</td>
                        <td>089 Kutch Green Apt. 448</td>
                        <td>04 Sep 2019</td>
                        <td>1</td>
                        <td>2.000.000₫</td>
                        <td>
                            <span style={getStatusStyle('Delivering')}>
                                Delivering
                            </span>
                        </td>

                        <td>
                            <MdOutlineEdit onClick={() => setOpen(true)} size={5} className={styles.button} />
                        </td>
                    </tr><tr>
                        <td>00001</td>
                        <td>Christine Brooks</td>
                        <td>089 Kutch Green Apt. 448</td>
                        <td>04 Sep 2019</td>
                        <td>1</td>
                        <td>2.000.000₫</td>
                        <td>
                            <span style={getStatusStyle('Processing')}>
                                Processing
                            </span>
                        </td>

                        <td>
                            <MdOutlineEdit onClick={() => setOpen(true)} size={5} className={styles.button} />
                        </td>
                    </tr><tr>
                        <td>00001</td>
                        <td>Christine Brooks</td>
                        <td>089 Kutch Green Apt. 448</td>
                        <td>04 Sep 2019</td>
                        <td>1</td>
                        <td>2.000.000₫</td>
                        <td>
                            <span style={getStatusStyle('Rejected')}>
                                Rejected
                            </span>
                        </td>

                        <td>
                            <MdOutlineEdit onClick={() => setOpen(true)} size={5} className={styles.button} />
                        </td>
                    </tr>

                </tbody>
            </table>
            <Pagination />
            <ModalEditStatus open={open} onClose={() => setOpen(false)} />

        </div>
    )
}
export default OrderList