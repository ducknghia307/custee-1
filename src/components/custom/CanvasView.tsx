// components/CanvasView.js
import React from 'react';
import { Button } from "@/components/ui/button";

const CanvasView = ({ imageDisplay, currentView, setImageDisplay, setCurrentView, selectedImage, setSelectedImage, canvasId }) => {
  return (
    <div className="relative" style={{ width: 500, height: 500 }}>
      <img src={imageDisplay} alt="White Shirt" style={{ position: "absolute", top: 0, left: 0, width: 500, height: 500 }} />
      <div className="relative" style={{ position: "absolute", top: 120, left: 146, border: "1px dashed blue" }}>
        <canvas id={canvasId} />
      </div>
      <div style={{ border: selectedImage === "front" ? "2px solid blue" : "2px solid #C0C0C0", position: "absolute", bottom: -100, left: 140 }}>
        <img src="/WhiteShirtFront.png" alt="White Shirt Front" style={{ width: 80, height: 80, cursor: "pointer" }} onClick={() => {
          setImageDisplay("/WhiteShirtFront.png");
          setCurrentView("front");
          setSelectedImage("front");
        }} />
      </div>
      <div style={{ position: "absolute", bottom: -100, left: 260, border: selectedImage === "back" ? "2px solid blue" : "2px solid #C0C0C0" }}>
        <img src="/WhiteShirtBack.png" alt="White Shirt Back" style={{ width: 80, height: 80, cursor: "pointer" }} onClick={() => {
          setImageDisplay("/WhiteShirtBack.png");
          setCurrentView("back");
          setSelectedImage("back");
        }} />
      </div>
    </div>
  );
};

export default CanvasView;
