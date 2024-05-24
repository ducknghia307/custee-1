import { MdClear, MdClose } from "react-icons/md";
import styles from '../modalstatus/modalstatus.module.css';
import shirt from "../../../../../assets/logo/shirt.webp"
import Image from "next/image";

type propTypes = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalEditStatus = ({ open, onClose }) => {
    if (!open) return null;

    // Mock data - replace with your actual data fetching mechanism
    const order = {
        id: '00008',
        address: 'New Jon',
        name: 'Nghĩa',
        date: '30 Apr 2019',
        paymentMethod: 'COD',
        products: [
            { name: 'Nguyễn Huệ Custom', price: '250.000đ', amount: 15, total: '3.750.000đ' },
            { name: 'Quang Trung Custom', price: '250.000đ', amount: 15, total: '3.750.000đ' }
        ],
        total: '7.500.000đ'
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <span className={styles.pendingButton}>Pending</span>
                    <h1>Order Detail</h1>
                    {/* <button className={styles.closeButton} onClick={onClose}>×</button> */}
                    <MdClose className={styles.closeButton} onClick={onClose}/> 
                </div>

                <div className={styles.orderInfo}>
                    <div>
                        <p><strong>ID:</strong> {order.id}</p>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                    </div>
                    <div>
                        <p><strong>Date:</strong> {order.date}</p>
                        <p><strong>Payment method:</strong> {order.paymentMethod}</p>
                    </div>

                </div>
                <div className={styles.productList}>
                    <div className={styles.productListHeader}>
                        <span>Product</span>
                        <span>Price</span>
                        <span>Amount</span>
                        <span>Total</span>
                    </div>
                    {order.products.map((product, index) => (
                        <div key={index} className={styles.productRow}>
                            <div className={styles.productDetail}>
                                <Image src={shirt} alt={product.name} className={styles.productImage} />
                                <span>{product.name}</span>
                            </div>
                            <span>{product.price}</span>
                            <span>{product.amount}</span>
                            <span>{product.total}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.totalPrice}>
                    <strong>Total:</strong> {order.total}
                </div>
                <div className={styles.actions}>
                    <span className={styles.processButton}>Processing</span>
                    <span className={styles.rejectButton}>Rejected</span>
                </div>
            </div>
        </div>
    );
};


export default ModalEditStatus;
