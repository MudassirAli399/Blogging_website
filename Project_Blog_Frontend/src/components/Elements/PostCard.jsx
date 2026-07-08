import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateblogpost } from "../../store/Slice";
import { NavLink } from "react-router-dom";
import DeletePost from "../../Backend/DeletePost.js"

export default function PostCard({
  image = null,
  Title = "",
  Summary = "",
  button = false,
  Content = "",
  id = NaN,
  date
}) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [editHovered, setEditHovered] = useState(false);

  const updatestate = () => {
    dispatch(
      updateblogpost({
        title: Title,
        Summary: Summary,
        Content: Content,
        Image: image,
        Date: date
      })
    );
  };
  const onDelete = async ()=>{
   const response = await DeletePost({Datefordelete : date})
   if(response && response.date==date){
    document.getElementById(id).remove()
      console.log(response.date)
   }
  }
  return (
    <div className="col-md-4" id={id}>
      <div
        style={{
          width: "300px",
          marginTop: "20px",
          marginLeft: "22px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: hovered
            ? "0 12px 30px rgba(0, 0, 0, 0.18)"
            : "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0px)",
          backgroundColor: "#ffffff",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* Image */}
        <div style={{ height: "180px", width: "100%", overflow: "hidden" }}>
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            src={image}
            alt={Title}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "16px" }}>

          {/* Title */}
          <h2
            style={{
              fontSize: "1.2em",
              fontWeight: "700",
              color: "#1a1a2e",
              margin: "0 0 10px 0",
              lineHeight: "1.4",
            }}
          >
            {Title}
          </h2>
            <div style={{ margin: "6px 0 10px" }}>
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "#E6F1FB",
    color: "#0C447C",
    fontSize: "12px",
    fontWeight: "500",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "0.5px solid #B5D4F4",
  }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
    {date}
  </span>
</div>
          {/* Divider */}
          <div
            style={{
              width: "40px",
              height: "3px",
              backgroundColor: "#007bff",
              borderRadius: "2px",
              marginBottom: "12px",
            }}
          />

          {/* Summary */}
          <p
            style={{
              fontSize: "0.92em",
              lineHeight: "1.7",
              color: "#666",
              margin: "0 0 16px 0",
            }}
          >
            {Summary}
          </p>

          {/* Read More */}
          <div style={{ marginBottom: "12px" }}>
            <NavLink
              to="/PostDetails"
              onClick={updatestate}
              style={{ textDecoration: "none" }}
            >
              <span
                style={{
                  color: "#007bff",
                  fontWeight: "600",
                  fontSize: "0.9em",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.borderBottomColor = "#007bff")}
                onMouseLeave={(e) => (e.target.style.borderBottomColor = "transparent")}
              >
                Read More →
              </span>
            </NavLink>
          </div>

          {/* Edit + Delete Buttons */}
          {button && (
            <div style={{ display: "flex", gap: "10px" }}>

              {/* Edit Button */}
              <NavLink to="/UpdatePost" style={{ textDecoration: "none", flex: 1 }}>
                <button
                  onClick={updatestate}
                  style={{
                    width: "100%",
                    backgroundColor: editHovered ? "#0056b3" : "#007bff",
                    border: "none",
                    color: "white",
                    padding: "8px 0",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.88em",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={() => setEditHovered(true)}
                  onMouseLeave={() => setEditHovered(false)}
                >
                  ✏️ Edit
                </button>
              </NavLink>

              {/* Delete Button */}
              <button
                onClick={onDelete}
                style={{
                  flex: 1,
                  backgroundColor: deleteHovered ? "#c0392b" : "#e74c3c",
                  border: "none",
                  color: "white",
                  padding: "8px 0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.88em",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => setDeleteHovered(true)}
                onMouseLeave={() => setDeleteHovered(false)}
              >
                🗑️ Delete
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}