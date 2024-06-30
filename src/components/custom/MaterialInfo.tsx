import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lightbulb, ShoppingCart } from "@phosphor-icons/react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import SizeInfoModal from "./SizeInfoModel";

// Define the types for sizes
type Sizes = {
  [key: string]: string;
};

interface MaterialInfoProps {
  error: string;
  sizes: Sizes;
  handleSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveDesign: () => void;
  totalPrice: number;
  name: string;
  numberOfDrawings: number;
  numberOfUploads: number;
}

const MaterialInfo: React.FC<MaterialInfoProps> = ({
  error,
  sizes,
  handleSizeChange,
  saveDesign,
  totalPrice,
  name,
  numberOfDrawings,
  numberOfUploads,
}) => {
  console.log("numberOfDrawings", numberOfDrawings);
  console.log("numberOfUploads", numberOfUploads);
  console.log("123", error);

  const [showDialog, setShowDialog] = useState(false);
  const [showSizeInfoModal, setShowSizeInfoModal] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const drawingCost = 10000;
  const uploadCost = 30000;

  const basePrice = 100000; // Base price of the shirt

  useEffect(() => {
    const total = Object.values(sizes).reduce(
      (sum, qty) => sum + Number(qty),
      0
    );
    setTotalQuantity(total);
  }, [sizes]);

  // Calculate additional costs
  const additionalCost =
    numberOfDrawings * drawingCost + numberOfUploads * uploadCost;

  const finalTotalPrice =
    totalPrice + additionalCost + totalQuantity * basePrice - 100000;

  const handleAddToCart = () => {
    setShowDialog(true);
  };

  const handleConfirm = () => {
    saveDesign(); // Perform the action of adding to the cart or saving the design
    setShowDialog(false); // Close the dialog
  };

  const handleCancel = () => {
    setShowDialog(false); // Close the dialog without performing the action
  };

  const handleSizeInfoClick = () => {
    setShowSizeInfoModal(true); // Open the SizeInfoModal
  };

  const handleSizeInfoClose = () => {
    setShowSizeInfoModal(false); // Close the SizeInfoModal
  };

  return (
    <div style={{ height: "62vh", width: "350px", marginLeft: "100px" }}>
      <div
        className="flex justify-center items-center h-16 mb-3 border-black rounded-2xl"
        style={{ borderWidth: "1px" }}
      >
        <p className="text-2xl font-black">Material</p>
      </div>
      <div className="border border-black rounded-2xl">
        <div className="">
          <div className="p-3">
            <div className="flex items-center">
              <p className="text-sm font-black mr-1">Product Name:</p>
              <p className="text-sm ">{name}</p>
            </div>
            <div className="flex flex-row items-center">
              <p className="text-sm  font-black mr-1">Type fabric: </p>
              <p className="text-sm ">95% cotton, 5% spandex</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-sm font-black  mr-1">Type print: </p>
              <p className="text-sm ">DTF/ Decal</p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center p-1">
            <Button variant={"outline"} onClick={handleSizeInfoClick}>
              <Lightbulb className="mr-1" size={22} />
              Size Information
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center  ">
            {["S", "M", "L", "XL", "XXL", "XXXL"].map((size, index) => (
              <div
                key={size}
                className="flex flex-col justify-center items-center m-1 "
                style={{
                  flexBasis: "calc(33.33% - 2rem)",
                  maxWidth: "calc(33.33% - 2rem)",
                }}
              >
                <Label
                  className="font-bold"
                  style={{ fontSize: "18px" }}
                  htmlFor={size}
                >
                  {size}
                </Label>
                <Input
                  id={size}
                  name={size}
                  type="text"
                  value={sizes[size]}
                  onChange={handleSizeChange}
                  className="font-normal"
                  style={{
                    height: "40px",
                    fontSize: "15px",
                    width: "60px",
                    textAlign: "center",
                  }}
                />
              </div>
            ))}
            <div className="w-full h-7 mt-2">
              {error && (
                <p className="text-sm font-black text-center" style={{ color: "red" }}>
                  {error}
                </p>
              )}
            </div>
          </div>

          <div style={{ borderBottom: "2px solid black" }}></div>
          <div className="p-3">
            <div className="text-base font-black mb-1">Cost:</div>
            <div className="justify-between flex">
              <p className="text-base font-black mb-1">Shirt price:</p>
              <p className="text-base  mb-1">100.000đ</p>
            </div>

            <div className="justify-between flex">
              <p className="text-base font-black mb-1">Draw price:</p>
              <p className="text-base  mb-1">
                {numberOfDrawings * drawingCost}đ
              </p>
            </div>
            <div className="justify-between flex">
              <p className="text-base font-black mb-1">Image price:</p>
              <p className="text-base  mb-1">
                {(numberOfUploads * uploadCost).toLocaleString()}đ
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" text-base font-black mb-1">Total Price</p>
              <p className="text-base  mb-1">
                {finalTotalPrice.toLocaleString()}đ
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mb-3">
          <Button
            className="mt-3 font-black justify-center text-lg h-14"
            style={{
              backgroundColor: "#784BE6",
              border: "1px solid black",
              width: "200px",
            }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={24} className="mr-2" />
            Add to cart
          </Button>
        </div>
        <ConfirmationModal
          isOpen={showDialog}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        <SizeInfoModal
          isOpen={showSizeInfoModal}
          onClose={handleSizeInfoClose}
        />
      </div>
    </div>
  );
};

export default MaterialInfo;
