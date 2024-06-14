  // components/ColorPicker.js
  import React from 'react';

  const ColorPicker = ({ colors, selectedColor, handleClick }) => {
    console.log('selected',selectedColor);
    
    return (
      <div className="shadow-xl rounded-xl p-2 border-black border" style={{ height: "110px", width: "200px" }}>
        <p className="text-base font-bold text-center">Color</p>
        <div>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color.value,
                width: "22px",
                height: "22px",
                borderRadius: selectedColor === color.name ? "50%" : "0",
                margin: "2px",
                border: selectedColor === color.name ? "1px solid #7373ff" : "1px solid #DCDCDC",
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={() => handleClick(color.name)}
            />
          ))}
        </div>
      </div>
    );
  };

  export default ColorPicker;
