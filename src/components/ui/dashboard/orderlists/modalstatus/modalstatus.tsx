import { MdClose } from "react-icons/md";
import styles from "../modalstatus/modalstatus.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { showToast } from "@/components/toast/toast";
import { CSSProperties } from "react"; // Import CSSProperties

const ModalEditStatus = ({ open, onClose, orderId, onStatusChange }) => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusStyle = (status) => {
    const baseStyle: CSSProperties = {
      padding: "5px 10px",
      borderRadius: "10px",
      textAlign: "center" as CSSProperties['textAlign'], // Ensure correct type
      minWidth: "80px",
      display: "inline-block",
      fontWeight: "600",
    };

    switch (status) {
      case "completed":
        return { ...baseStyle, color: "#00B69B", backgroundColor: "#E0F2F1" };
      case "processing":
        return { ...baseStyle, color: "#6226EF", backgroundColor: "#EDE7F6" };
      case "cancelled":
        return { ...baseStyle, color: "#EF3826", backgroundColor: "#FCE4EC" };
      case "pending":
        return { ...baseStyle, color: "#FFA756", backgroundColor: "#FFF3E0" };
      case "delivering":
        return { ...baseStyle, color: "#6D9CF6", backgroundColor: "#E3F2FD" };
      default:
        return baseStyle;
    }
  };

  const getButtonStyle = (status) => {
    const baseStyle: CSSProperties = {
      padding: "5px 10px",
      borderRadius: "10px",
      textAlign: "center" as CSSProperties['textAlign'], // Ensure correct type
      minWidth: "80px",
      display: "inline-block",
      fontWeight: "600",
    };

    switch (status) {
      case "processing":
        return { ...baseStyle, color: "#6226EF", backgroundColor: "#EDE7F6" };
      case "cancelled":
        return { ...baseStyle, color: "#EF3826", backgroundColor: "#FCE4EC" };
      case "delivering":
        return { ...baseStyle, color: "#6D9CF6", backgroundColor: "#E3F2FD" };
      case "completed":
        return { ...baseStyle, color: "#00B69B", backgroundColor: "#E0F2F1" };
      default:
        return baseStyle;
    }
  };

  const renderActionButtons = (status) => {
    switch (status) {
      case "pending":
        return (
          <div className={styles.actions}>
            <button style={getButtonStyle("processing")} onClick={() => handleStatusClick("processing")}>
              Processing
            </button>
            <button style={getButtonStyle("cancelled")} onClick={() => handleStatusClick("cancelled")}>
              Cancelled
            </button>
          </div>
        );
      case "processing":
        return (
          <div className={styles.actions}>
            <button style={getButtonStyle("delivering")} onClick={() => handleStatusClick("delivering")}>
              Delivering
            </button>
            <button style={getButtonStyle("cancelled")} onClick={() => handleStatusClick("cancelled")}>
              Cancelled
            </button>
          </div>
        );
      case "delivering":
        return (
          <div className={styles.actions}>
            <button style={getButtonStyle("completed")} onClick={() => handleStatusClick("completed")}>
              Completed
            </button>
          </div>
        );
      case "completed":
      case "cancelled":
      default:
        return null;
    }
  };

  const handleStatusClick = async (newStatus) => {
    try {
      await axiosInstance.put(`/api/order/${orderId}`, { status: newStatus });
      setOrder({ ...order, status: newStatus });
      onStatusChange(orderId, newStatus);

      showToast("Change status successful", "success");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/order/${orderId}`);
        console.log(response.data.metadata);
        setOrder(response.data.metadata);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    const fetchOrderItems = async () => {
      try {
        const response = await axiosInstance.get(`/api/orderItem/order/${orderId}`);
        console.log(response.data.metadata);
        setOrderItems(response.data.metadata);
      } catch (error) {
        console.error("Error fetching order items:", error);
        setError(error.message || "Unknown error");
      }
    };

    if (orderId) {
      fetchOrderDetails();
      fetchOrderItems();
    }
  }, [orderId]);

  if (!open) return null;

  if (loading) {
    return (
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h1>Error loading order details</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span className={styles.pendingButton} style={getStatusStyle(order.status)}>
            {order.status || "Unknown"}
          </span>
          <h1>Order Detail</h1>
          <MdClose className={styles.closeButton} onClick={onClose} />
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.left}>
            <p>
              <strong>ID:</strong> {order._id}
            </p>
            <p>
              <strong>Recipient Name:</strong> {order.deliveryInfo.recipientName}
            </p>
            <p>
              <strong>Address:</strong> {order.deliveryInfo.address}
            </p>
          </div>
          <div className={styles.right}>
            <p>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Payment method:</strong> {order.paymentMethod}
            </p>
          </div>
        </div>
        <div className={styles.productList}>
          <div className={styles.productListHeader}>
            <span>Image</span>
            <span>Product</span>
            <span>Unit Price</span>
            <span>Size</span>
            <span>Quantity</span>
            <span>Shipping Price</span>
          </div>
          {orderItems && orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <div key={index} className={styles.productRow}>
                <div className={styles.productDetail}>
                  <Image
                    width={40}
                    height={40}
                    src={item.productId.images.front}
                    alt={item.productId.name}
                    className={styles.productImage}
                    objectFit="contain"
                  />
                  <Image
                    width={40}
                    height={40}
                    src={item.productId.images.back}
                    alt={item.productId.name}
                    className={styles.productImage}
                    objectFit="contain"
                  />
                </div>
                <span>{item.productId.name}</span>
                <span>{parseInt(item.unitPrice).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                <span>
                  {item.quantityPerSize.map(
                    (q, index) =>
                      q.quantity > 0 && (
                        <div key={index}>
                          {q.size}
                        </div>
                      )
                  )}
                </span>
                <span>
                  {item.quantityPerSize.map(
                    (q, index) =>
                      q.quantity > 0 && (
                        <div key={index}>
                          {q.quantity}
                        </div>
                      )
                  )}
                </span>
                <span>{parseInt(order.deliveryOptions.cost).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }} className={styles.noProducts}>
              No products found.
            </div>
          )}
        </div>
        <div className={styles.totalPrice}>
          <strong>Total:</strong> {parseInt(order.total).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </div>
        {renderActionButtons(order.status)}
      </div>
    </div>
  );
};

export default ModalEditStatus;
