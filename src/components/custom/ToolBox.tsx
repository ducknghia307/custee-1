// components/ToolBox.js
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadIcon } from "@radix-ui/react-icons";
import { TShirt, TextT, PencilLine, TrashSimple } from "@phosphor-icons/react";
import TextCustomizationPopup from './TexeCustomizationPopup';
const ToolBox = ({ addText, handleImageUpload, deleteSelectedImage,selectedText }) => {
  const [showTextPopup, setShowTextPopup] = useState(false);
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
  return (
    <div className="relative shadow-xl gap-1 border-black border rounded-xl flex flex-col items-center mt-4" style={{ height: "420px", width: "200px" }}>
      <div className="my-4">
        <Button style={{ height: "80px", width: "115px", backgroundColor: "#784BE6", display: "flex", flexDirection: "column" }} onClick={addText}>
          <TShirt size={32} />  
          Type
        </Button>
      </div>
      <div>
        <input type="file" id="file-input" style={{ display: "none" }} onChange={handleImageUpload} />
        <Button style={{ height: "80px", width: "115px", backgroundColor: "#784BE6", display: "flex", flexDirection: "column" }} onClick={() => document.getElementById("file-input").click()}>
          <UploadIcon height={60} width={60} />
          Upload Image
        </Button>
      </div>
      <div className="my-4">
        <Button style={{ height: "80px", width: "115px", backgroundColor: "#784BE6", display: "flex", flexDirection: "column" }} onClick={handleTextButtonClick}>
          <TextT size={32} />
          Text
        </Button>
      {showTextPopup && <TextCustomizationPopup selectedText={selectedText} addText={handleAddText} closePopup={closeTextPopup} />}
      </div>
      <div>
        <Button style={{ height: "80px", width: "115px", backgroundColor: "#784BE6", display: "flex", flexDirection: "column" }} onClick={addText}>
          <PencilLine size={32} />
          Draw
        </Button>
      </div>
      {/* <div className="my-4">
        <Button style={{ height: "80px", width: "115px", backgroundColor: "red", display: "flex", flexDirection: "column" }} onClick={deleteSelectedImage}>
          <TrashSimple size={32} />
          Delete
        </Button>
      </div> */}
    </div>
  );
};

export default ToolBox;
