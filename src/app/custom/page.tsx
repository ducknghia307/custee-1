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

import { fabric } from "fabric"; // Import fabric

export default function Custom() {
  const [imageDisplay, setImageDisplay] = useState("https://firebasestorage.googleapis.com/v0/b/custee-1669e.appspot.com/o/ShirtTemplate%2FTeeFrontBeige.png?alt=media&token=6987c884-cdec-4c97-ad6f-82325ff7da9f");
  const canvasFrontRef = useRef<fabric.Canvas | null>(null);
  const canvasBackRef = useRef<fabric.Canvas | null>(null);
  const [drawingMode, setDrawingMode] = useState(null);

  const [sizes, setSizes] = useState({
    S: "0",
    M: "0",
    L: "0",
    XL: "0",
    XXL: "0",
    XXXL: "0",
  });
  const [currentView, setCurrentView] = useState("front");
  const [selectedImage, setSelectedImage] = useState("front");
  const [selectedColor, setSelectedColor] = useState("Beige");
  const [selectedText, setSelectedText] = useState<fabric.Textbox | null>(null);
  const [totalPrice, setTotalPrice] = useState(100000); // Default price
  const [productName, setProductName] = useState("Áo Thun Cổ Tròn"); // Default product name
  const [pattern, setPattern] = useState("tshirt");
  const [numberOfDrawings, setNumberOfDrawings] = useState(0);
  const [numberOfUploads, setNumberOfUploads] = useState(0);

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
  console.log('product""""""""""', product);

  type CartItem = {
    userId: string;
    productId: string;
    quantityPerSize: { size: string; quantity: number }[];
  };

  // Assuming initial state has an empty array for quantityPerSize
  const [cartItem, setCartItem] = useState<CartItem>({
    userId,
    productId: "",
    quantityPerSize: [],
  });
  console.log("::::::::::::", cartItem);

  const dispatch = useAppDispatch();
  const imageMapping = {
    tshirt: {
      Black: {
        front: "/TeeFrontBlack.png",
        back: "/TeeBackBlack.png",
      },
      White: {
        front: "/TeeFrontWhite.png",
        back: "/TeeBackWhite.png",
      },
      Beige: {
        front:
          "https://firebasestorage.googleapis.com/v0/b/custee-1669e.appspot.com/o/ShirtTemplate%2FTeeFrontBeige.png?alt=media&token=6987c884-cdec-4c97-ad6f-82325ff7da9f",
        back: "https://firebasestorage.googleapis.com/v0/b/custee-1669e.appspot.com/o/ShirtTemplate%2FTeeBackBeige.png?alt=media&token=6788b6ec-a82e-4d07-ba37-3fba48da7999",
      },
      // Add more mappings as needed
    },
    polo: {
      Black: {
        front: "/PoloFrontBlack.png",
        back: "/PoloBackBlack.png",
      },
      White: {
        front: "/PoloFrontWhite.png",
        back: "/PoloBackWhite.png",
      },
      Beige: {
        front: "/PoloFrontBeige.png",
        back: "/PoloBackBeige.png",
      },
      // Add more mappings as needed
    },
  };
  const handleTypeSelection = (type) => {
    console.log(type);

    setPattern(type);
    if (type === "tshirt") {
      setProductName("Áo Thun Cổ Tròn");
    } else if (type === "polo") {
      setProductName("Áo Polo");
    }
    if (imageMapping[type][selectedColor]) {
      setImageDisplay(imageMapping[type][selectedColor][currentView]);
    }
  };

  const handleTextSelection = (options: fabric.IEvent<Event>) => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    const target = options.target;
    if (target && target.type === "textbox") {
      setSelectedText(target as fabric.Textbox);
    }
  };
  useEffect(() => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    if (canvas) {
      const handleMouseDown = (options: fabric.IEvent<Event>) => {
        if (drawingMode) {
          const pointer = canvas.getPointer(options.e);
          const origX = pointer.x;
          const origY = pointer.y;
          let shape;

          if (drawingMode === "rectangle") {
            shape = new fabric.Rect({
              left: origX,
              top: origY,
              width: 0,
              height: 0,
              fill: "transparent",
              stroke: "#000",
              strokeWidth: 2,
            });
          } else if (drawingMode === "circle") {
            shape = new fabric.Circle({
              left: origX,
              top: origY,
              radius: 1,
              fill: "transparent",
              stroke: "#000",
              strokeWidth: 2,
            });
          } else if (drawingMode === "line") {
            shape = new fabric.Line([origX, origY, origX, origY], {
              stroke: "#000",
              strokeWidth: 2,
            });
          } else if (drawingMode === "heart") {
            const heartPath = new fabric.Path(
              "M 272.70141,238.71731 \
          C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731  \
          C 152.70146,493.47282 288.63461,528.80461 381.26391,662.02535 \
          C 468.83815,529.62199 609.82641,489.17075 609.82641,358.71731 \
          C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731  \
          C 441.77851,238.71731 400.42481,267.08774 381.26391,307.90481 \
          C 362.10311,267.08773 320.74941,238.7173 272.70141,238.71731  \
          z ",
              {
                left: origX,
                top: origY,
                fill: "transparent",
                stroke: "#000",
                strokeWidth: 2,
                scaleX: 0.001,
                scaleY: 0.001,
                originX: "center",
                originY: "center",
              }
            );
            shape = heartPath;
          }

          canvas.add(shape);

          const handleMouseMove = (options) => {
            const pointer = canvas.getPointer(options.e);
            if (drawingMode === "rectangle") {
              shape.set({
                width: Math.abs(pointer.x - origX),
                height: Math.abs(pointer.y - origY),
              });
              shape.set({
                left: pointer.x < origX ? pointer.x : origX,
                top: pointer.y < origY ? pointer.y : origY,
              });
            } else if (drawingMode === "circle") {
              const radius =
                Math.sqrt(
                  Math.pow(pointer.x - origX, 2) +
                    Math.pow(pointer.y - origY, 2)
                ) / 2;
              shape.set({
                radius: radius,
              });
              shape.set({
                left: pointer.x < origX ? pointer.x : origX,
                top: pointer.y < origY ? pointer.y : origY,
              });
            } else if (drawingMode === "line") {
              shape.set({
                x2: pointer.x,
                y2: pointer.y,
              });
            } else if (drawingMode === "heart") {
              const scale =
                Math.max(
                  Math.abs(pointer.x - origX),
                  Math.abs(pointer.y - origY)
                ) / 100;
              shape.set({
                scaleX: scale,
                scaleY: scale,
              });
            }
            canvas.renderAll();
          };

          const handleMouseUp = () => {
            canvas.off("mouse:move", handleMouseMove);
            canvas.off("mouse:up", handleMouseUp);
            setDrawingMode(null); // Reset drawing mode after shape is drawn
          };

          canvas.on("mouse:move", handleMouseMove);
          canvas.on("mouse:up", handleMouseUp);
        }
      };

      canvas.on("mouse:down", handleMouseDown);

      return () => {
        canvas.off("mouse:down", handleMouseDown);
      };
    }
  }, [drawingMode, currentView]);
  useEffect(() => {
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;

    if (canvas) {
      canvas.on("mouse:down", handleTextSelection);

      return () => {
        canvas.off("mouse:down", handleTextSelection);
      };
    }
  }, [currentView]);

  useEffect(() => {
    if (imageMapping[pattern][selectedColor]) {
      const newImageDisplay = imageMapping[pattern][selectedColor][currentView];
      setImageDisplay(newImageDisplay);
    } else {
      console.error(
        `Selected color "${selectedColor}" does not exist in imageMapping.`
      );
    }
  }, [currentView, selectedColor]);

  async function createProduct(product) {
    console.log("myPRODUCT", product);
    try {
      const response = await axiosInstance.post("/api/product", product);
      console.log("12312321", response);

      if (response.status === 200) {
        showToast("Add to cart successfully", "success");
      }

      setCartItem((prevCartItem) => ({
        ...prevCartItem,
        productId: response.data.metadata._id,
      }));

      // Add the item to the cart
      const addToCartResponse = await axiosInstance.post("/api/cartItem", {
        ...cartItem,
        productId: response.data.metadata._id, // Ensure productId is correct
      });

      console.log("addtocartresponse:::", addToCartResponse);
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
      backgroundImg.onload = () => {
        ctx?.drawImage(
          backgroundImg,
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height
        );

        const fabricCanvas = canvas.toCanvasElement();
        ctx?.drawImage(
          fabricCanvas,
          146,
          120,
          fabricCanvas.width,
          fabricCanvas.height
        );

        const dataURL = offscreenCanvas.toDataURL("image/png");
        resolve(dataURL);
      };

      backgroundImg.src = imageMapping[pattern][selectedColor][view];
    });
  };
  const saveDesign = () => {
    console.log("12312");

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

  const fetchShirtImage = async (type, color) => {
    try {
      const response = await axiosInstance.get(`/api/shirt/search`, {
        params: { type, color },
      });
      if (response.status === 200) {
        const imageUrls = response.data; // Adjust according to your response structure
        return imageUrls;
      } else {
        throw new Error("Failed to fetch shirt images");
      }
    } catch (error) {
      console.error("Error fetching shirt image:", error);
      return null;
    }
  };

  const uploadDesignImages = async (frontDataURL, backDataURL) => {
    try {
      const frontFile = dataURLtoFile(frontDataURL, "front_design.png");
      const backFile = dataURLtoFile(backDataURL, "back_design.png");

      const frontURL = (await dispatch(
        uploadImage("userId123", frontFile)
      )) as string;
      console.log("Front design uploaded. Download URL:", frontURL);

      const backURL = (await dispatch(
        uploadImage("userId123", backFile)
      )) as string;
      console.log("Back design uploaded. Download URL:", backURL);

      const updatedProduct = {
        ...product,
        name: productName,
        price: totalPrice.toString(),
        images: {
          front: frontURL,
          back: backURL,
        },
      };

      setProduct(updatedProduct);
      createProduct(updatedProduct);
    } catch (error) {
      console.error("Error uploading design:", error);
    }
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
    console.log("z", imageMapping[pattern][color]);

    if (imageMapping[pattern][color]) {
      setSelectedColor(color);
      console.log("Updated selected color:", color); // Add this line
      const newImageDisplay = imageMapping[pattern][color][currentView];
      setImageDisplay(newImageDisplay);
    } else {
      console.error(
        `Selected color "${color}" does not exist in [imageMapping].`
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
    console.log("::::::::::::123", textOptions);
    const canvas =
      currentView === "front" ? canvasFrontRef.current : canvasBackRef.current;
    if (canvas) {
      const text = new fabric.Textbox(textOptions.text, {
        left: 50,
        top: 50,
        fill: textOptions.textColor,
        fontFamily: textOptions.fontFamily || "Arial",
        fontSize: textOptions.fontSize || 20,
        fontWeight: textOptions.fontWeight,
        fontStyle: textOptions.fontStyle,
        underline: textOptions.textDecoration !== "none",
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.requestRenderAll();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setTotalPrice((prevPrice) => prevPrice + 10000); // Update totalPrice
    setNumberOfUploads((prevCount) => prevCount + 1);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgObj = new Image();
      const result = e.target?.result;

      if (typeof result === "string") {
        imgObj.src = result;
      } else {
        console.error("Image data is not a string:", result);
      }
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

  // const handleAddDrawing = () => {
  //   setDrawingMode(!drawingMode);
  //   setNumberOfDrawings((prevCount) => prevCount + 1); // Update numberOfDrawings
  //   setTotalPrice((prevPrice) => prevPrice + 10000); // Update totalPrice
  // };

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
      .filter((item) => item.quantity > 0); // Filter out sizes with quantity 0

    setCartItem((prevCartItem) => ({
      ...prevCartItem,
      quantityPerSize: updatedQuantityPerSize,
    }));
  };

  useEffect(() => {
    fetchShirtImage(pattern, selectedColor).then((imageUrls) => {
      if (imageUrls) {
        setImageDisplay(imageUrls.front); // Assuming imageUrls has front and back URLs
        imageMapping[pattern][selectedColor] = imageUrls;
      }
    });
    const cFront = new fabric.Canvas("canvasFront", {
      height: 300,
      width: 200,
      backgroundColor: "rgba(0, 0, 0, 0)",
    });

    const cBack = new fabric.Canvas("canvasBack", {
      height: 300,
      width: 200,
      backgroundColor: "rgba(0, 0, 0, 0)",
    });

    // settings for all canvas in the app
    // fabric.Object.prototype.transparentCorners = false;
    // fabric.Object.prototype.cornerColor = "#2BEBC8";
    // // fabric.Object.prototype.cornerStyle = "rect";
    // fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
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
      console.log("activeObject::", activeObject);

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
                handleTypeSelection={handleTypeSelection}
                addText={addText}
                handleImageUpload={handleImageUpload}
                selectedText={selectedText}
                setDrawingMode={setDrawingMode}
              />
            </div>

            <div className="relative" style={{ width: 500, height: 500 }}>
              <img
                src={imageDisplay}
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
                  border: "1px dashed #b3b3ff",
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
                  border: "1px dashed #b3b3ff",
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
                  src={imageMapping[pattern]?.[selectedColor]?.front}
                  alt="White Shirt Front"
                  style={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() => {
                    setImageDisplay(
                      imageMapping[pattern]?.[selectedColor].front
                    );
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
                  src={imageMapping[pattern]?.[selectedColor]?.back}
                  alt="White Shirt Back"
                  style={{ width: 80, height: 80, cursor: "pointer" }}
                  onClick={() => {
                    setImageDisplay(
                      imageMapping[pattern]?.[selectedColor].back
                    );
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
              numberOfDrawings={numberOfDrawings}
              numberOfUploads={numberOfUploads}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
