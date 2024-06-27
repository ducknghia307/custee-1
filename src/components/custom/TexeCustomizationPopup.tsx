import { TextB, TextItalic, TextUnderline } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

const TextCustomizationPopup = ({ addText, closePopup, selectedText }) => {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(20);
  const [textColor, setTextColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [hoverB, setHoverB] = useState(false);
  const [hoverI, setHoverI] = useState(false);
  const [hoverU, setHoverU] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (selectedText) {
      setInputText(selectedText.text || "");
      setFontFamily(selectedText.fontFamily || "Arial");
      setFontSize(selectedText.fontSize || 20);
      setTextColor(selectedText.fill || "#000000");
      setIsBold(selectedText.fontWeight === "bold");
      setIsItalic(selectedText.fontStyle === "italic");
      setIsUnderline(selectedText.textDecoration === "underline");
    }
  }, [selectedText]);

  const handleFontFamilyChange = (e) => setFontFamily(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);
  const handleTextColorChange = (e) => setTextColor(e.target.value);
  const handleBoldToggle = () => setIsBold((prev) => !prev);
  const handleItalicToggle = () => setIsItalic((prev) => !prev);
  const handleUnderlineToggle = () => setIsUnderline((prev) => !prev);

  const handleAddText = () => {
    const textStyles = {
      fontFamily,
      fontSize,
      textColor,
      fontWeight: isBold ? "bold" : "normal",
      fontStyle: isItalic ? "italic" : "normal",
      textDecoration: isUnderline ? "underline" : "none",
      text: inputText,
    };

    // if (selectedText) {
    //   updateText(textStyles);
    // } else {
    addText(textStyles);
    // }
    closePopup();
  };

  const textPreviewStyle = {
    fontFamily,
    fontSize: `${fontSize}px`,
    color: textColor,
    fontWeight: isBold ? "bold" : "normal",
    fontStyle: isItalic ? "italic" : "normal",
    textDecoration: isUnderline ? "underline" : "none",
  };

  return (
    <div
      className="absolute top-0 left-24 bg-gray-800 bg-opacity-5 flex justify-center items-center z-50"
      style={{ width: "300px" }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Customize Text</h2>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here"
          className="w-full p-2 border rounded mb-4"
        />

        <div className="mb-4 flex flex-row items-center">
          <label>Font:</label>
          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="w-full p-2 border rounded"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label>Color:</label>
          <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
            className="ml-2"
          />
          <label>Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            min="10"
            max="100"
            className="w-20 h-7 border rounded ml-2"
          />
        </div>

        <div className="mb-3 flex items-center">
          <label className="">Style:</label>

          <TextB
            onClick={handleBoldToggle}
            onMouseEnter={() => setHoverB(true)}
            onMouseLeave={() => setHoverB(false)}
            size={20}
            className={`cursor-pointer mr-2 ${
              hoverB || isBold ? "bg-blue-500 text-white" : ""
            }`}
          />

          <TextItalic
            onClick={handleItalicToggle}
            onMouseEnter={() => setHoverI(true)}
            onMouseLeave={() => setHoverI(false)}
            size={20}
            className={`cursor-pointer mr-2 ${
              hoverI || isItalic ? "bg-blue-500 text-white" : ""
            }`}
          />

          <TextUnderline
            onClick={handleUnderlineToggle}
            onMouseEnter={() => setHoverU(true)}
            onMouseLeave={() => setHoverU(false)}
            size={20}
            className={`cursor-pointer mr-2 ${
              hoverU || isUnderline ? "bg-blue-500 text-white" : ""
            }`}
          />
        </div>

        <div className="mb-4 border-2 h-10">
          <p style={textPreviewStyle}>{inputText}</p>
        </div>

        <div className="flex justify-center space-x-4 items-center">
          <button
            onClick={handleAddText}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {selectedText ? "Update Text" : "Add Text"}
          </button>
          <button
            onClick={closePopup}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextCustomizationPopup;
