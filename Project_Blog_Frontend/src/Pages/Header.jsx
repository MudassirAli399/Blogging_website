
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateblogpost,
  UpdateSearchData,
  logout,
  DataOfSearchingPost,
  login,
} from "../store/Slice.js";
import { NavLink, Link } from "react-router-dom";
import SearchPost from "../Backend/Search.js";

export default function Header() {
  const dispatch = useDispatch();

  // Read authentication directly from Redux.
  const id = useSelector(
    (state) => state.user.Authentication.id
  );

  const isactive = Boolean(id);

  const LoadMore = useSelector(
    (state) => state.user.Search.ClickOnLoadMore
  );

  const SearchButton = useSelector(
    (state) => state.user.Search.ClickOnSearch
  );

  const [SearchText, setSearchText] = useState("");
  const [TextSearched, setTextSearched] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    dispatch(
      UpdateSearchData({
        increment: 0,
        IsUserSearch: false,
        IsContentfind: false,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (!mobile) {
        setMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updatestate = () => {
    dispatch(
      updateblogpost({
        title: "",
        Summary: "",
        Content: "",
        Image: "",
        Date: "",
      })
    );
  };

  const navlinkStyle = ({ isActive }) => ({
    color: isActive ? "green" : "black",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });


const LogoutUser = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_DELETE_COOKIE, {
      method: "GET",
      credentials: "include",
    });
    console.log("Logout Response:", response); // Debugging line to check the response
    if(response.status == 200){
      console.log("Logout successful");
      dispatch(logout());
      setMenuOpen(false);
    }  
  } catch (error) {
    console.log(error);
  }
    }

const handlesumbit = useCallback(async () => {

    const searchTerm = SearchText.trim();

    if (!searchTerm) {
        return;
    }

    try {

        dispatch(login({ loader: true }));

        // Save the search query and reset pagination.
        dispatch(
            UpdateSearchData({
                IsUserSearch: true,
                IsContentfind: false,
                increment: 0,
                SearchTerm: searchTerm
            })
        );

        // Clear previous search results.
        dispatch(
            DataOfSearchingPost({
                firsttime: true,
                data: []
            })
        );

        // Fetch first 5 matching posts.
        const response = await SearchPost({
            title: searchTerm,
            IncrementNumber: 0
        });

        dispatch(
            DataOfSearchingPost({
                firsttime: true,
                data: response
            })
        );

        dispatch(
            UpdateSearchData({
                IsContentfind: true,
                increment: response.length === 5 ? 1 : 0
            })
        );

    } catch (error) {

        console.error("Search Error:", error);

        dispatch(
            DataOfSearchingPost({
                firsttime: true,
                data: []
            })
        );

        dispatch(
            UpdateSearchData({
                IsContentfind: true,
                increment: 0
            })
        );

    } finally {

        dispatch(login({ loader: false }));
        setMenuOpen(false);

    }

}, [SearchText, dispatch]);


  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: isMobile ? "10px 16px" : "10px 40px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "10px" : "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Search bar and mobile hamburger */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              flex: 1,
            }}
          >
            <input
              style={{
                width: isMobile ? "100%" : "300px",
                height: "40px",
                padding: "0 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
              type="text"
              placeholder="Search"
              value={SearchText}
              onChange={(e) => {
                  setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlesumbit();
                }
              }}
            />

            {!isMobile && (
              <Link to="Search">
                <button
                  onClick={handlesumbit}
                  style={{
                    height: "40px",
                    padding: "0 16px",
                    borderRadius: "6px",
                    border: "1px solid green",
                    color: "green",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                  type="button"
                >
                  Search
                </button>
              </Link>
            )}
          </div>

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "40px",
                height: "40px",
                flexShrink: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor: "black",
                  transform: menuOpen
                    ? "rotate(45deg) translate(5px, 5px)"
                    : "none",
                  transition: "transform 0.2s",
                }}
              />

              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor: "black",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />

              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor: "black",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
          )}
        </div>

        {/* Mobile search button */}
        {isMobile && (
          <Link to="Search" style={{ width: "100%" }}>
            <button
              onClick={handlesumbit}
              style={{
                width: "100%",
                height: "40px",
                padding: "0 16px",
                borderRadius: "6px",
                border: "1px solid green",
                color: "green",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              type="button"
            >
              Search
            </button>
          </Link>
        )}

        {/* Navigation links */}
        <div
          style={{
            display:
              isMobile && !menuOpen ? "none" : "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: isMobile
              ? "flex-start"
              : "space-between",
            gap: isMobile ? "12px" : "20px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* HOME */}
          <NavLink
            to="Home"
            style={navlinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M25 1.05c-.22 0-.43.07-.62.21l-23 17.95c-.43.34-.51.97-.17 1.41.34.43.97.51 1.41.17L4 19.71V46c0 .55.45 1 1 1h14V29h12v18h14c.55 0 1-.45 1-1V19.71l1.38 1.08c.19.14.4.21.62.21.3 0 .59-.13.79-.38.34-.44.26-1.07-.17-1.41l-23-17.95a1 1 0 0 0-1.24 0z"
              />
            </svg>
            <span style={{ fontSize: "18px" }}>HOME</span>
          </NavLink>

          {/* ADD POST */}
          <div onClick={updatestate}>
            <NavLink
              to="AddPost"
              style={navlinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <polyline points="14 4 14 9 19 9" />
                <line x1="12" y1="13" x2="12" y2="19" />
                <line x1="9" y1="16" x2="15" y2="16" />
              </svg>

              <span style={{ fontSize: "18px" }}>
                ADD POST
              </span>
            </NavLink>
          </div>

          {/* ACCOUNT */}
          <div>
            {isactive ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "green",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="26"
                  height="26"
                >
                  <path
                    fill="currentColor"
                    d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6 2.69-6 6-6 6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z"
                  />
                </svg>
                <span style={{ fontSize: "18px" }}>
                  ACTIVE
                </span>
              </div>
            ) : (
              <NavLink
                to="Signup"
                style={navlinkStyle}
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="26"
                  height="26"
                >
                  <path
                    fill="currentColor"
                    d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6 2.69-6 6-6 6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z"
                  />
                </svg>
                <span style={{ fontSize: "18px" }}>
                  SIGNUP
                </span>
              </NavLink>
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          <div>
            {isactive ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="26"
                  height="26"
                >
                  <path
                    fill="currentColor"
                    d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6 2.69-6 6-6 6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z"
                  />
                </svg>

                <button
                  onClick={LogoutUser}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  type="button"
                >
                  <span style={{ fontSize: "18px" }}>
                    LOGOUT
                  </span>
                </button>
              </div>
            ) : (
              <NavLink
                to="Signin"
                style={navlinkStyle}
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="26"
                  height="26"
                >
                  <path
                    fill="currentColor"
                    d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6 2.69-6 6-6 6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z"
                  />
                </svg>

                <span style={{ fontSize: "18px" }}>
                  LOGIN
                </span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
