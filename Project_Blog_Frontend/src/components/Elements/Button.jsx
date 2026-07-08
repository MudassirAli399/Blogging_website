import React from "react";

export default function Button({
  height = "45px", 
  width = "100%", 
  type = "submit",
  backgroundColor = "#FAA0A0", 
  color = "#FFFFFF", 
  fontSize = "18px", 
  text = "Submit",
  marginTop = "0px",
  ...props
}) {
  return (
    <button
      type={type}
      style={{
        height: height,
        width: width,
        borderRadius: "8px", 
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        fontWeight: "600", 
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.5px", 
        marginTop: marginTop,
        
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    >
      {text}
    </button>
  );
}