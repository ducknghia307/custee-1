"use client";

import styles from "../../../components/ui/dashboard/orderlists/orderlists.module.css";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import ModalEditStatus from "@/components/ui/dashboard/orderlists/modalstatus/modalstatus";
import { axiosInstance } from "@/utils/axiosInstance";
import PaginationOrder from "@/components/ui/dashboard/paginationorder/paginationorder";
import Search from "@/components/ui/dashboard/search/search";

// Define the type for an individual order
interface Order {
    _id: string;
    code: string;
    deliveryInfo: {
        recipientName: string;
        phone: string;
        address: string;
    };
    paymentMethod: string;
    total: string;
    deliveryOptions: {
        method: string;
        cost: string;
    };
    status: string;
}

const OrderList = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]); // Explicitly typed as Order[]
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // Typing for selectedOrderId
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>('');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const ordersPerPage = 10;

    // Function to get status style
    const getStatusStyle = (status: string) => {
        const baseStyle = {
            padding: '5px 10px',
            borderRadius: '10px',
            textAlign: 'center',
            minWidth: '80px',
            display: 'inline-block',
            fontWeight: '600'
        };

        switch (status) {
            case 'completed':
                return { ...baseStyle, color: '#00B69B', backgroundColor: '#E0F2F1' };
            case 'processing':
                return { ...baseStyle, color: '#6226EF', backgroundColor: '#EDE7F6' };
            case 'cancelled':
                return { ...baseStyle, color: '#EF3826', backgroundColor: '#FCE4EC' };
            case 'pending':
                return { ...baseStyle, color: '#FFA756', backgroundColor: '#FFF3E0' };
            case 'delivering':
                return { ...baseStyle, color: '#6D9CF6', backgroundColor: '#E3F2FD' };
            default:
                return {};
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        const fetchTotalOrders = async () => {
            try {
                const response = await axiosInstance.get("/api/order");
                console.log("Response Data:", response.data);
                setOrders(response.data.metadata || []); // Ensure response data matches Order type
            } catch (error) {
                console.error("Error fetching total orders:", error);
            }
        };

        fetchTotalOrders();
    }, []);

    // Handle click on edit button
    const handleEditClick = (orderId: string) => {
        setSelectedOrderId(orderId);
        setOpen(true);
    };

    // Handle status change
    const handleStatusChange = (orderId: string, newStatus: string) => {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Handle search change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    // Handle status filter change
    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value);
        setCurrentPage(1); // Reset to the first page on new filter
    };

    // Handle payment method filter change
    const handlePaymentMethodFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterPaymentMethod(e.target.value);
        setCurrentPage(1); // Reset to the first page on new filter
    };

    // Filter orders based on search query and filters
    const filteredOrders = orders.filter(order =>
        (order.deliveryInfo.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.deliveryInfo.phone.includes(searchQuery)) &&
        (filterStatus === '' || order.status === filterStatus) &&
        (filterPaymentMethod === '' || order.paymentMethod === filterPaymentMethod)
    );

    // Calculate current page's orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') ;
      };

    return (
        <div className={styles.container}>
            <h3 className={styles.h3}>Order Lists</h3>
            <div className={styles.top}>
                <Search
                    placeholder="Search for an order..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className={styles.filters}>
                    <select value={filterStatus} onChange={handleStatusFilterChange} className={styles.filter1}>
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="pending">Pending</option>
                        <option value="delivering">Delivering</option>
                    </select>
                    <select value={filterPaymentMethod} onChange={handlePaymentMethodFilterChange} className={styles.filter2}>
                        <option value="">All Payment Methods</option>
                        <option value="Card">Card</option>
                        <option value="COD">Cash On Delivery</option>
                    </select>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>ORDER CODE</td>
                        <td>RECIPIENT NAME</td>
                        <td>PHONE</td>
                        <td>ADDRESS</td>
                        <td>PAYMENT METHOD</td>
                        <td>TOTAL PRICE (đ)</td>
                        <td>SHIPPING METHOD</td>
                        <td>SHIPPING PRICE (đ)</td>
                        <td>STATUS</td>
                        <td>ACTION</td>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff" }}>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.code}</td>
                                <td>{order.deliveryInfo.recipientName}</td>
                                <td>{order.deliveryInfo.phone}</td>
                                <td>{order.deliveryInfo.address}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{formatPrice(parseInt(order.total))}</td>
                <td>{order.deliveryOptions.method}</td>
                <td>{formatPrice(parseInt(order.deliveryOptions.cost))}</td>
                                <td>
                                    <span style={getStatusStyle(order.status)}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <MdOutlineEdit onClick={() => handleEditClick(order._id)} size={20} className={styles.button} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10} style={{ textAlign: "center" }}>
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <PaginationOrder
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {selectedOrderId && (
                <ModalEditStatus
                    open={open}
                    onClose={() => setOpen(false)}
                    orderId={selectedOrderId}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
}

export default OrderList;
