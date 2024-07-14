import React, { useState, useEffect, useMemo } from "react";
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
  name: string;
  numberOfDrawings: number;
  numberOfUploads: number;
  setPricePerShirt: (price: number) => void;
  pricePerShirt: number;
}

const MaterialInfo: React.FC<MaterialInfoProps> = ({
  error,
  sizes,
  handleSizeChange,
  saveDesign,
  name,
  setPricePerShirt, 
  numberOfDrawings,
  numberOfUploads,
  pricePerShirt,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showSizeInfoModal, setShowSizeInfoModal] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice,setTotalPrice]=useState(0);

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

  const additionalCost = useMemo(
    () =>
      (numberOfDrawings * drawingCost + numberOfUploads * uploadCost) *
      totalQuantity,
    [numberOfDrawings, numberOfUploads, totalQuantity]
  );

  useEffect(() => {
    const newTotalPrice = basePrice * totalQuantity;
    setTotalPrice(newTotalPrice);
  }, [totalQuantity, basePrice, setTotalPrice]);

  setPricePerShirt(
    basePrice + numberOfDrawings * drawingCost + numberOfUploads * uploadCost
  );

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

  const handleValidatedSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validate if the value is a number
    if (/^\d*$/.test(value)) {
      // Convert the validated value to an integer
      const intValue = parseInt(value, 10);
  
      // Ensure the integer value is within a specific range (if needed)
      if (intValue >= 0 && intValue <= 100) {
        handleSizeChange(e); // Proceed with handling the size change
      }
    }
  };

  const totalCost = totalPrice + additionalCost;

  return (
    <div style={{ height: "62vh", width: "350px", marginLeft: "100px" }}>
     
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
            {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
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
                  value={sizes[size]}
                  onChange={handleValidatedSizeChange}
                  className="font-normal"
                  style={{
                    height: "40px",
                    fontSize: "15px",
                    width: "65px",
                    textAlign: "center",
                  }}
                />
              </div>
            ))}
            <div className="w-full h-7 mt-2">
              {error && (
                <p
                  className="text-sm font-black text-center"
                  style={{ color: "red" }}
                >
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
              <p className="text-base  mb-1">
                {(basePrice * totalQuantity).toLocaleString()}đ
              </p>
            </div>

            <div className="justify-between flex">
              <p className="text-base font-black mb-1">Draw price:</p>
              <p className="text-base  mb-1">
                {(
                  numberOfDrawings *
                  drawingCost *
                  totalQuantity
                ).toLocaleString()}
                đ
              </p>
            </div>
            <div className="justify-between flex">
              <p className="text-base font-black mb-1">Image price:</p>
              <p className="text-base  mb-1">
                {(
                  numberOfUploads *
                  uploadCost *
                  totalQuantity
                ).toLocaleString()}
                đ
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className=" text-base font-black mb-1">Total Price</p>
              <p className="text-base  mb-1">{totalCost.toLocaleString()}đ</p>
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
