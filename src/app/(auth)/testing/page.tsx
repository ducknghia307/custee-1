"use client";
// Account.js

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { dela, montserrat_400, montserrat_600 } from "@/assets/fonts/font";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShoppingCart, TextT } from "@phosphor-icons/react";
// Dynamically import fabric
const fabric = typeof window !== "undefined" ? require("fabric").fabric : null;

export default function Account() {
  const [imageDisplay, setImageDisplay] = useState("/WhiteShirtFront.png");
  const [canvasFront, setCanvasFront] = useState<fabric.Canvas>();
  const [canvasBack, setCanvasBack] = useState<fabric.Canvas>();
  const [sizes, setSizes] = useState({ S: "", M: "", L: "", XL: "", XXL: "" });
  const [currentView, setCurrentView] = useState("front");
  const [selectedImage, setSelectedImage] = useState("front");
  const [selectedColor, setSelectedColor] = useState("white");

  const handleClick = (color) => {
    setSelectedColor(color);
  };
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Orange", value: "#ffa333" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Brown", value: "#A52A2A" },
    { name: "Grey", value: "#808080" },
    { name: "Purple", value: "#800080" },
  ];
  const addText = () => {
    const canvas = currentView === "front" ? canvasFront : canvasBack;
    if (canvas) {
      const text = new fabric.Textbox("Enter your text here", {
        left: 50,
        top: 50,
        fill: "#000000",
        fontFamily: "Arial",
        fontSize: 20,
      });
      canvas.add(text);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgObj = new Image();
      imgObj.src = e.target.result as string;
      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);

        // Set the desired width and height for the image
        const desiredWidth = 100; // Adjust this value as needed
        const desiredHeight = 100; // Adjust this value as needed

        img.scaleToWidth(desiredWidth);
        img.scaleToHeight(desiredHeight);

        if (currentView === "front") {
          canvasFront?.add(img);
          canvasFront?.requestRenderAll();
        } else {
          canvasBack?.add(img);
          canvasBack?.requestRenderAll();
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSizes((prevSizes) => ({
      ...prevSizes,
      [name]: value,
    }));
  };

  useEffect(() => {
    const cFront = new fabric.Canvas("canvasFront", {
      height: 300,
      width: 200,
      border: "1px solid ",
      backgroundColor: "rgba(0, 0, 0, 0)",
    });

    const cBack = new fabric.Canvas("canvasBack", {
      height: 300,
      width: 200,
      border: "1px solid ",
      backgroundColor: "rgba(0, 0, 0, 0)",
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    // fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 10;

    setCanvasFront(cFront);
    setCanvasBack(cBack);

    return () => {
      cFront.dispose();
      cBack.dispose();
    };
  }, []);
  const deleteSelectedImage = () => {
    const canvas = currentView === "front" ? canvasFront : canvasBack;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.requestRenderAll();
      }
    }
  };

  // Listen for the delete key press event
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete") {
        deleteSelectedImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasFront, canvasBack, currentView]);
  return (
    <div className="flex flex-col justify-between min-h-[1050px] overflow-x-hidden">
      <Navbar />
      <div className="mt-2 w-full h-96 flex flex-col items-center">
        <div className="flex flex-col justify-center items-center mt-32">
          <p className={`text-3xl font-black ${dela.className}`}>My Design</p>
          <div className="mt-10 flex">
            <div
              style={{ height: "60vh", marginRight: "100px" }}
              className="w-96 flex flex-col items-center"
            >
              <div
                className="shadow-xl  rounded-xl p-2  border-black border "
                style={{ height: "110px", width: "200px" }}
              >
                <p
                  className={`text-base font-bold text-center ${montserrat_600.className}`}
                >
                  Color
                </p>
                <div>
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: color.value,
                        width: "22px",
                        height: "22px",
                        borderRadius:
                          selectedColor === color.value ? "50%" : "0", 
                        margin: "2px",
                        border: selectedColor === color.value ? "1px solid #7373ff" : "1px solid #DCDCDC",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                      onClick={() => handleClick(color.value)} 
                    />
                  ))}
                </div>
              </div>
              <div
                className="shadow-xl border-black border rounded-xl flex flex-col  items-center mt-4"
                style={{ height: "500px", width: "200px" }}
              >
                <div className="my-4">
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <Button
                    style={{
                      height: "80px",
                      width: "115px",
                      backgroundColor: "#784BE6",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                  >
                    <UploadIcon height={60} width={60} />
                    Upload Image
                  </Button>
                </div>
                <Button onClick={deleteSelectedImage}>Delete</Button>
                <div>
                  <Button
                    style={{
                      height: "80px",
                      width: "115px",
                      backgroundColor: "#784BE6",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={addText}
                  >
                    <TextT size={32} />
                    Text{" "}
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative" style={{ width: 500, height: 500 }}>
              <img
                src={imageDisplay}
                alt="White Shirt"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 500,
                  height: 500,
                }}
              />
              <div
                className="relative"
                style={{
                  position: "absolute",
                  top: 120,
                  left: 146,
                  border: "1px dashed blue",
                }}
              >
                <canvas
                  id={currentView === "front" ? "canvasFront" : "canvasBack"}
                />
              </div>
              <div
                style={{
                  border:
                    selectedImage === "front"
                      ? "2px solid blue"
                      : "2px solid #C0C0C0",
                  position: "absolute",
                  bottom: -100,
                  left: 140,
                }}
              >
                <img
                  src="/WhiteShirtFront.png"
                  alt="White Shirt Front"
                  style={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() => {
                    setImageDisplay("/WhiteShirtFront.png");
                    setCurrentView("front");
                    setSelectedImage("front");
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -100,
                  left: 260,
                  border:
                    selectedImage === "back"
                      ? "2px solid blue"
                      : "2px solid #C0C0C0",
                }}
              >
                <img
                  src="/WhiteShirtBack.png"
                  alt="White Shirt Back"
                  style={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() => {
                    setImageDisplay("/WhiteShirtBack.png");
                    setCurrentView("back");
                    setSelectedImage("back");
                  }}
                />
              </div>
            </div>
            <div
              style={{ height: "62vh", width: "350px", marginLeft: "100px" }}
              className="bg-white shadow-xl rounded-2xl "
            >
              <div
                className="flex justify-center items-center h-16 border-black rounded-2xl "
                style={{ borderWidth: "1px" }}
              >
                <p className={`text-2xl font-black ${dela.className}`}>
                  Material
                </p>
              </div>
              <div className="p-3">
                <p className={`text-sm font-black ${montserrat_400.className}`}>
                  {" "}
                  Product Name: Cổ tròn tay ngắn{" "}
                </p>
                <p className={`text-sm font-black ${montserrat_400.className}`}>
                  {" "}
                  Type fabric: 95% cotton, 5% spandex{" "}
                </p>
                <p className={`text-sm font-black ${montserrat_400.className}`}>
                  {" "}
                  Type print: DTF/ Decal{" "}
                </p>
              </div>
              <p
                className={`text-base  font-bold p-3 ${montserrat_600.className}`}
              >
                Size áo
              </p>
              <div className="flex flex-wrap gap-1 ml-7 mt-1 mb-5">
                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <div
                    key={size}
                    className="flex flex-col justify-center items-center mr-11 "
                  >
                    <Label
                      className={`${montserrat_600.className}`}
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
                      className={`${montserrat_400.className}`}
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
                <p
                  className={`text-base font-black mb-1 ${montserrat_600.className}`}
                >
                  Total:
                </p>
                <div className="justify-between flex">
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    Shirt price:
                  </p>
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    150.000đ
                  </p>
                </div>
                <div className="justify-between flex">
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    Print price:
                  </p>
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    0đ
                  </p>
                </div>
                <div className="justify-between flex">
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    Picture price:
                  </p>
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    0đ
                  </p>
                </div>
                <div className="justify-between flex">
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    Total:
                  </p>
                  <p
                    className={`text-base font-black mb-1 ${montserrat_400.className}`}
                  >
                    150.000 đ
                  </p>
                </div>
                <div className="mt-3 text-center">
                  <Button style={{ backgroundColor: "#784BE6" }}>
                    <ShoppingCart className="mr-1" size={24} />
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
