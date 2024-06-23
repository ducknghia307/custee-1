import { axiosInstance } from "@/utils/axiosInstance";

interface Order {
  _id: string;
  userId: any;
  code: string;
  total: number;
  isPaid: boolean;
  paymentMethod: string;
  deliveryInfo: {
    recipientName: string;
    phone: string;
    address: string;
  };
  deliveryOptions: {
    method: string;
    cost: number;
  };
  discountValue: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  _id: string;
  productId: any;
  orderId: Order;
  quantityPerSize: {
    size: string;
    quantity: number;
  }[];
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export const payNowRedirect = async ({
  order,
  items,
}: {
  order: Order;
  items: OrderItem[];
}) => {
  const getHiddenPhoneNumber = (phone: string) => {
    return "0 " + "*****" + phone.slice(-4, -3) + " " + phone.slice(-3);
  };

  const sumQuantity = (quantityArray: any[]) => {
    var sum = 0;
    quantityArray.map((item) => {
      sum += item.quantity;
    });
    return sum;
  };

  var transactionItems: any[] = [];
  items.map((item) => {
    const newItem = {
      name: item.productId.name,
      price: item.productId.price,
      quantity: sumQuantity(item.quantityPerSize),
    };
    transactionItems.push(newItem);
  });

  const createPaymentLinkData = {
    orderCode: parseInt(order.code),
    amount: order.total,
    description: "Custee Order",
    cancelUrl: "http://localhost:3000/order/handleOrderChanges",
    returnUrl: "http://localhost:3000/order/handleOrderChanges",
    buyerName: order.deliveryInfo.recipientName,
    buyerPhone: getHiddenPhoneNumber(order.deliveryInfo.phone),
    buyerAddress: order.deliveryInfo.address,
    items: transactionItems,
    expiredAt: Math.round(new Date().getTime() / 1000) + 5 * 60,
  };
  await axiosInstance
    .post("/api/payos/createPaymentLink", createPaymentLinkData)
    .then((res) => {
      console.log("RES ", res.data);
      window.location.replace(res.data.metadata.checkoutUrl);
      const payNowOrder = {
        code: order.code,
        paymentLink: res.data.metadata.checkoutUrl,
      };
      sessionStorage.setItem("payNowOrder", JSON.stringify(payNowOrder));
    })
    .catch((err) => console.log(err));
  console.log("PaymentLinkData: ", createPaymentLinkData);
};
