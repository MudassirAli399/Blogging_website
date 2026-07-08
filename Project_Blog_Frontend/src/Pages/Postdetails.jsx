import React from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

export default function Details() {
  const { title, Summary, Content, image } = useSelector(
    (state) => state.user.BlogPost
  );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5em", color: "#222", margin: "0 0 10px 0" }}>
          {title}
        </h1>
      </div>
      <div
        style={{
          width: "100%",
          height: "auto",
          marginBottom: "30px",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "500px", display: "block" }}
        />
      </div>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.5em", color: "#555" }}>Summary</h2>
        <p style={{ fontSize: "1.1em", fontStyle: "italic", color: "#666" }}>
          {Summary}
        </p>
      </div>
      <div
        style={{
          fontSize: "1.1em",
          color: "#444",
          borderTop: "1px solid #eee",
          paddingTop: "20px",
        }}
      >
        {parse(Content)}
      </div>
    </div>
  );
}