// MaterialInfo.js
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "@phosphor-icons/react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

const MaterialInfo = ({ sizes, handleSizeChange, saveDesign }) => {
  const [showDialog, setShowDialog] = useState(false);
  const handleAddToCart = () => {
    // Trigger the dialog when the "Add to cart" button is clicked
    setShowDialog(true);
  };

  const handleConfirm = () => {
    saveDesign(); // Perform the action of adding to the cart or saving the design
    setShowDialog(false); // Close the dialog
  };

  const handleCancel = () => {
    setShowDialog(false); // Close the dialog without performing the action
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
        <div className="p-3">
          <p className="text-sm font-black">Product Name: Cổ tròn tay ngắn</p>
          <p className="text-sm font-black">
            Type fabric: 95% cotton, 5% spandex
          </p>
          <p className="text-sm font-black">Type print: DTF/ Decal</p>
        </div>
        <p className="text-base font-bold p-3">Size áo</p>
        <div className="flex flex-wrap gap-1 ml-7 mt-1 mb-5">
          {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
            <div
              key={size}
              className="flex flex-col justify-center items-center mr-11"
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
        </div>
        <div style={{ borderBottom: "2px solid black" }}></div>
        <div className="p-3">
          <p className="text-base font-black mb-1">Total:</p>
          <div className="justify-between flex">
            <p className="text-base font-black mb-1">Shirt price:</p>
            <p className="text-base font-black mb-1">150.000đ</p>
          </div>
          <div className="justify-between flex">
            <p className="text-base font-black mb-1">Print price:</p>
            <p className="text-base font-black mb-1">0đ</p>
          </div>
          <div className="justify-between flex">
            <p className="text-base font-black mb-1">Picture price:</p>
            <p className="text-base font-black mb-1">0đ</p>
          </div>
          <div className="justify-between flex">
            <p
              className="text-base font-black
mb-1"
            >
              Total:
            </p>
            <p className="text-base font-black mb-1">150.000 đ</p>
          </div>
        </div>
        {/* Button to trigger the modal */}
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
     
        {/* Confirmation modal */}
        <ConfirmationModal
          isOpen={showDialog}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default MaterialInfo;
