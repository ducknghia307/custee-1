import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { TShirt, TextT, PencilLine } from "@phosphor-icons/react";
import TextCustomizationPopup from "./TexeCustomizationPopup";
import ShapeSelectionPopup from "./ShapeSelection";

const ToolBox = ({
  addText,
  handleImageUpload,
  selectedText,
  handleTypeSelection,
  setDrawingMode,
}) => {
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showShapePopup, setShowShapePopup] = useState(false);

  const typeMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeMenuRef.current && !typeMenuRef.current.contains(event.target)) {
        setShowTypeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTextButtonClick = () => {
    setShowTextPopup(true);
  };

  const closeTextPopup = () => {
    setShowTextPopup(false);
  };

  const handleAddText = (textOptions) => {
    addText(textOptions);
    closeTextPopup();
  };

  const handleTypeButtonClick = () => {
    setShowTypeMenu(!showTypeMenu);
  };

  const handleDrawButtonClick = () => {
    setShowShapePopup(true);
  };

  const closeShapePopup = () => {
    setShowShapePopup(false);
  };

  const selectShape = (shape) => {
    setDrawingMode(shape);
  };

  const handleTypeSelectionAndCloseMenu = (type) => {
    handleTypeSelection(type);
    setShowTypeMenu(false);
  };

  return (
    <div
      className="relative shadow-xl gap-1 border-black border rounded-xl flex flex-col items-center mt-4"
      style={{ height: "500px", width: "200px" }}
    >
      <div className="my-4 relative">
        <Button
          style={{
            height: "80px",
            width: "115px",
            backgroundColor: "#784BE6",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleTypeButtonClick}
        >
          <TShirt size={32} />
          Type
        </Button>
        {showTypeMenu && (
          <div
            ref={typeMenuRef}
            className="absolute left-10 -top-10 mt-2 w-52 h-44 bg-white border rounded shadow-lg z-10 flex flex-row items-center"
          >
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleTypeSelectionAndCloseMenu("tshirt")}
            >
              <img
                style={{ height: "100px", width: "200px", objectFit: "cover" }}
                src="/tshirt.png"
              />
              <p>T-Shirt</p>
            </div>
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleTypeSelectionAndCloseMenu("polo")}
            >
              <img
                style={{ height: "100px", width: "200px", objectFit: "cover" }}
                src="/polo.png"
              />
              <p>Polo</p>
            </div>
          </div>
        )}
      </div>
      <div>
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
          onClick={() => document.getElementById("file-input").click()}
        >
          <UploadIcon height={60} width={60} />
          Upload Image
        </Button>
      </div>
      <div className="my-4">
        <Button
          style={{
            height: "80px",
            width: "115px",
            backgroundColor: "#784BE6",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleTextButtonClick}
        >
          <TextT size={32} />
          Text
        </Button>
        {showTextPopup && (
          <TextCustomizationPopup
            selectedText={selectedText}
            addText={handleAddText}
            closePopup={closeTextPopup}
          />
        )}
      </div>
      <div className="mb-4">
        <Button
          style={{
            height: "80px",
            width: "115px",
            backgroundColor: "#784BE6",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleDrawButtonClick}
        >
          <PencilLine size={32} />
          Draw
        </Button>
        {showShapePopup && (
          <ShapeSelectionPopup
            selectShape={selectShape}
            closePopup={closeShapePopup}
          />
        )}
      </div>
    </div>
  );
};

export default ToolBox;
