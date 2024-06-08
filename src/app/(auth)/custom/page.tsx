"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { dela, montserrat_400, montserrat_600 } from "@/assets/fonts/font";
import { Button } from "@/components/ui/button";
import { TrashSimple } from "@phosphor-icons/react";
import ColorPicker from "@/components/custom/ColorPicker";
import MaterialInfo from "@/components/custom/MaterialInfo";
import ToolBox from "@/components/custom/ToolBox";
import { uploadImage } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { showToast } from "@/components/toast/toast";
import { axiosInstance } from "@/utils/axiosInstance";

const fabric = typeof window !== "undefined" ? require("fabric").fabric : null;

export default function Custom() {
  const [imageDisplay, setImageDisplay] = useState("/TeeFrontBeige.png");
  const canvasFrontRef = useRef(null);
  const canvasBackRef = useRef(null);
  const [sizes, setSizes] = useState({ S: "", M: "", L: "", XL: "", XXL: "" });
  const [currentView, setCurrentView] = useState("front");
  const [selectedImage, setSelectedImage] = useState("front");
  const [selectedColor, setSelectedColor] = useState("Beige");
  const [selectedText, setSelectedText] = useState(null);
  const [totalPrice, setTotalPrice] = useState(150000); // Default price
  const [productName, setProductName] = useState("Áo Thun Cổ Tròn"); // Default product name

  const userId = useAppSelector((state) => state.auth.userId);
  const [product, setProduct] = useState({
    userId,
    name: "",
    price: "",
    pattern: "T-shirt",
    images: {
      front: "",
      back: "",
    },
  });
  const [cartItem, setCartItem] = useState({
    userId,
    productId: "",
    quantityPerSize: [],
  });

  console.log('::::::::::::',cartItem);
  
  const dispatch = useAppDispatch();
  const imageMapping = {
    Black: {
      front: "/TeeFrontBlack.png",
      back: "/TeeBackBlack.png",
    },
    White: {
      front: "/TeeFrontWhite.png",
      back: "/TeeBackWhite.png",
    },
    Beige: {
      front: "/TeeFrontBeige.png",
      back: "/TeeBackBeige.png",
    },
    // Add more mappings as needed
  };

  const handleTextSelection = (e) => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    const target = e.target;
    if (target && target.type === "textbox") {
      setSelectedText(target);
    }
  };

  useEffect(() => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    if (canvas) {
      canvas.on("mouse:down", handleTextSelection);
    }

    return () => {
      if (canvas) {
        canvas.off("mouse:down", handleTextSelection);
      }
    };
  }, [currentView]);

  useEffect(() => {
    if (imageMapping[selectedColor]) {
      const newImageDisplay = imageMapping[selectedColor][currentView];
      setImageDisplay(newImageDisplay);
    } else {
      console.error(
        `Selected color "${selectedColor}" does not exist in imageMapping.`
      );
    }
  }, [currentView, selectedColor]);

  async function createProduct(product) {
    try {
      const response = await axiosInstance.post("/api/product", product);
      console.log(response);

      if (response.status === 200) {
        showToast("Product created successfully", "success");
      }

      setCartItem((prevCartItem) => ({
        ...prevCartItem,
        productId: response.data._id,
      }));

      // Add the item to the cart
      const addToCartResponse = await axiosInstance.post("/api/cartItem", {
        ...cartItem,
        productId: response.data._id, // Ensure productId is correct
      });

      console.log('addtocartresponse:::',addToCartResponse);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  const saveCanvas = (canvas, view) => {
    return new Promise((resolve, reject) => {
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = 500; // Adjust these values to the actual image dimensions
      offscreenCanvas.height = 550; // Adjust these values to the actual image dimensions
      const ctx = offscreenCanvas.getContext("2d");

      const backgroundImg = new Image();
      backgroundImg.src =
        view === "front"
          ? imageMapping[selectedColor].front
          : imageMapping[selectedColor].back;
      backgroundImg.onload = () => {
        ctx.drawImage(
          backgroundImg,
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height
        );

        const fabricCanvas = canvas.toCanvasElement();
        ctx.drawImage(
          fabricCanvas,
          146,
          120,
          fabricCanvas.width,
          fabricCanvas.height
        );

        const dataURL = offscreenCanvas.toDataURL("image/png");
        resolve(dataURL);
      };
    });
  };

  const saveDesign = () => {
    const canvasFront = canvasFrontRef.current;
    const canvasBack = canvasBackRef.current;

    if (canvasFront && canvasBack) {
      Promise.all([
        saveCanvas(canvasFront, "front"),
        saveCanvas(canvasBack, "back"),
      ])
        .then(([frontDataURL, backDataURL]) => {
          console.log("Both canvases saved successfully");
          uploadDesignImages(frontDataURL, backDataURL);
          showToast("Successfully created", "success");
        })
        .catch((error) => {
          console.error("Error saving canvases:", error);
        });
    } else {
      console.error("Canvases are not initialized");
    }
  };

  const uploadDesignImages = (frontDataURL, backDataURL) => {
    const frontFile = dataURLtoFile(frontDataURL, "front_design.png");
    const backFile = dataURLtoFile(backDataURL, "back_design.png");
    let frontURL; // Define frontURL in the outer scope

    dispatch(uploadImage("userId123", frontFile))
      .then((response) => {
        frontURL = response; // Store the frontURL from the response
        console.log("Front design uploaded. Download URL:", frontURL);
        return dispatch(uploadImage("userId123", backFile));
      })
      .then((backURL) => {
        console.log("Back design uploaded. Download URL:", backURL);
        setProduct((prevProduct) => ({
          ...prevProduct,
          name: productName,
          price: totalPrice,
          images: {
            front: frontURL,
            back: backURL,
          },
        }));
        createProduct(product);
      })
      .catch((error) => {
        console.error("Error uploading design:", error);
      });
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleColorClick = (color) => {
    console.log("Selected color:", color);
    console.log("z", imageMapping[color]);
    console.log(imageMapping.color);

    if (imageMapping[color]) {
      setSelectedColor(color);
      console.log("Updated selected color:", color); // Add this line
      const newImageDisplay = imageMapping[color][currentView];
      setImageDisplay(newImageDisplay);
    } else {
      console.error(
        `Selected color "${color}" does not exist in imageMapping.`
      );
    }
  };

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Beige", value: "#e4d5b7" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Orange", value: "#ffa333" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Brown", value: "#A52A2A" },
    { name: "Grey", value: "#808080" },
    { name: "Purple", value: "#800080" },
  ];

  const addText = (textOptions) => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    if (canvas) {
      const text = new fabric.Textbox(textOptions.text, {
        // Set text content
        left: 50,
        top: 50,
        fill: textOptions.textColor,
        fontFamily: "Arial",
        fontSize: 20,
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.requestRenderAll();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgObj = new Image();
      imgObj.src = e.target.result;

      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);

        // Set the desired width and height for the image
        const desiredWidth = 100; // Adjust this value as needed
        const desiredHeight = 100; // Adjust this value as needed

        img.scaleToWidth(desiredWidth);
        img.scaleToHeight(desiredHeight);

        const canvas =
          currentView === "front"
            ? canvasFrontRef.current
            : canvasBackRef.current;
        if (canvas) {
          canvas.add(img);
          canvas.requestRenderAll();
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSizeChange = (event) => {
    const { name, value } = event.target;
    const newSizes = {
      ...sizes,
      [name]: value,
    };
    setSizes(newSizes);
    const updatedQuantityPerSize = Object.keys(newSizes)
      .map((size) => ({
        size,
        quantity: newSizes[size] ? parseInt(newSizes[size]) : 0,
      }))
      .filter((item) => item.quantity > 0);

    setCartItem((prevCartItem) => ({
      ...prevCartItem,
      quantityPerSize: updatedQuantityPerSize,
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

    canvasFrontRef.current = cFront;
    canvasBackRef.current = cBack;

    return () => {
      cFront.dispose();
      cBack.dispose();
    };
  }, []);

  const deleteSelectedImage = () => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
        canvas.requestRenderAll();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        deleteSelectedImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentView]);

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
              <ColorPicker
                colors={colors}
                selectedColor={selectedColor}
                handleClick={handleColorClick}
              />

              <ToolBox
                addText={addText}
                handleImageUpload={handleImageUpload}
                deleteSelectedImage={deleteSelectedImage}
                selectedText={selectedText}
              />
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
                  height: 550,
                }}
              />

              <Button
                style={{
                  height: "55px",
                  width: "140px",
                  backgroundColor: "red",
                  display: "flex",
                  // flexDirection: "column",
                  position: "absolute",
                  left: -150,
                  top: 20,
                }}
                onClick={deleteSelectedImage}
              >
                <TrashSimple className="mr-1" size={26} />
                Delete Image
              </Button>
              <div
                style={{
                  position: "absolute",
                  top: 130,
                  left: 146,
                  border: "1px dashed blue",
                  display: currentView === "front" ? "block" : "none",
                }}
              >
                <canvas id="canvasFront" style={{}} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 130,
                  left: 146,
                  border: "1px dashed blue",
                  display: currentView === "back" ? "block" : "none",
                }}
              >
                <canvas id="canvasBack" />
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
                  src={imageMapping[selectedColor].front}
                  alt="White Shirt Front"
                  style={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() => {
                    setImageDisplay(imageMapping[selectedColor].front);
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
                  src={imageMapping[selectedColor].back}
                  alt="White Shirt Back"
                  style={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() => {
                    setImageDisplay(imageMapping[selectedColor].back);
                    setCurrentView("back");
                    setSelectedImage("back");
                  }}
                />
              </div>
            </div>
            <MaterialInfo
              sizes={sizes}
              handleSizeChange={handleSizeChange}
              saveDesign={saveDesign}
              totalPrice={totalPrice}
              name={productName}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
