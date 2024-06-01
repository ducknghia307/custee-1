'use client'
import { useEffect, useState } from "react";
import {fabric} from 'fabric'

const App = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgObj = new Image();
      imgObj.src = e.target.result as string;
      imgObj.onload = () => {
        const img = new fabric.Image(imgObj);
        canvas?.add(img);
        canvas?.requestRenderAll();
      };
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      height: 400,
      width: 800,
      backgroundColor: "black",
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    setCanvas(c);

    return () => {
      c.dispose();
    };
  }, []);

  const addRect = (canvas?: fabric.Canvas) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      stroke: "#2BEBC8",
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };
  return (
    <div>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <canvas id="canvas" />
    </div>
  );
};

export default App;