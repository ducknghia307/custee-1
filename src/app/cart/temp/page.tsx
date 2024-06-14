"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { axiosInstance } from "@/utils/axiosInstance";
import { Card, Image } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  userId: string;
  name: string;
  price: number;
  pattern: string;
  images: {
    front: string;
    back: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default function page() {
  const [productList, setProductList] = useState<Product[]>([]);
  const userId = localStorage.getItem("userId");
  const fetchProduct = async () => {
    await axiosInstance
      .get(`/api/product`)
      .then((res: any) => {
        console.log(res.data.metadata);
        setProductList(res.data.metadata);
      })
      .catch((err: any) => console.log(err));
  };

  const addToCart = async (productId: string) => {
    console.log("UserId: ", userId);
    if (userId) {
      axiosInstance
        .post(`/api/cartItem`, {
          userId: userId,
          productId: productId,
          quantityPerSize: [
            {
              size: "S",
              quantity: 1,
            },
            {
              size: "M",
              quantity: 1,
            },
            {
              size: "L",
              quantity: 1,
            },
            {
              size: "XL",
              quantity: 1,
            },
            {
              size: "XXL",
              quantity: 1,
            },
            {
              size: "XXXL",
              quantity: 1,
            },
          ],
        })
        .then((res: any) => {
          console.log("New cartItem: ", res.data.metadata);
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-16 overflow-x-hidden">
      <Navbar />
      {productList.length === 0 ? (
        <div className="mt-32">NO PRODUCT FOUND</div>
      ) : (
        <div className="w-full flex items-center justify-start gap-4 px-8">
          <p className="w-min text-[8px]">
            Default size: 1 of each size &#40;S,M,L,XL,XXL,XXL&#41;
          </p>
          {productList.map((product) => {
            return (
              <Card
                key={product._id}
                title={product.name}
                className="w-56 mt-32 border-2 border-black flex flex-col items-center justify-center"
              >
                <Image src={product.images.front} alt="" className="w-16" />
                <button
                  className="w-full p-1 rounded-md border border-black text-sm mx-auto hover:bg-slate-200"
                  onClick={() => {
                    addToCart(product._id);
                    toast("Added to cart !");
                  }}
                >
                  Add to cart
                </button>
              </Card>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
}
