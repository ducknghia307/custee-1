import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Square, Circle, LineSegment, Heart } from "@phosphor-icons/react";

const ShapeSelectionPopup = ({ selectShape, closePopup }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  return (
    <div
      ref={popupRef}
      className="absolute left-32 -bottom-4 mt-2 bg-white border rounded shadow-lg z-10 flex items-center"
    >
      <Button
        style={{
          height: "70px",
          width: "80px",
          backgroundColor: "#F1E15B",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
        onClick={() => {
          selectShape("rectangle");
          closePopup();
        }}
      >
        <Square color="black" size={32} />
        <p style={{ color: "black" }}>Rectangle</p>
      </Button>
      <Button
        style={{
          height: "70px",
          width: "80px",
          backgroundColor: "#F1E15B",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
        onClick={() => {
          selectShape("circle");
          closePopup();
        }}
      >
        <Circle size={32} color="black" />
        <p style={{ color: "black" }}>Circle</p>
      </Button>
      <Button
        style={{
          height: "70px",
          width: "80px",
          backgroundColor: "#F1E15B",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
        onClick={() => {
          selectShape("line");
          closePopup();
        }}
      >
        <LineSegment color="black" size={32} />
        <p style={{ color: "black" }}>Line</p>
      </Button>
      <Button
        style={{
          height: "70px",
          width: "80px",
          backgroundColor: "#F1E15B",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
        onClick={() => {
          selectShape("heart");
          closePopup();
        }}
      >
        <Heart color="black" size={32} />
        <p style={{ color: "black" }}>Heart</p>
      </Button>
    </div>
  );
};

export default ShapeSelectionPopup;
