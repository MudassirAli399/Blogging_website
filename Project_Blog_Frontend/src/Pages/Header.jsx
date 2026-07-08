import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateblogpost,UpdateSearchData,logout,DataOfSearchingPost } from "../store/Slice";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchPost from "../Backend/Search.js";
import Search from "./Search.jsx";
export default function Header() {
  const [isactive, setactive] = React.useState(false);
  const id = useSelector((state) => state.user.Authentication.id);
  const LoadMore = useSelector((state) => state.user.Search.ClickOnLoadMore);
  const SearchButton = useSelector((state) => state.user.Search.ClickOnSearch);

  const [SearchText, setSearchText] = useState("");
  const [TextSearched,setTextSearched] = useState("");
  React.useEffect(() => {
  dispatch(UpdateSearchData({
    increment: 0,
    IsUserSearch: false,
    IsContentfind: false
   }));
    }, []);

  React.useEffect(() => {
    if (id) {
      setactive(true);
    } else {
      setactive(false);
    }
  }, [id]);

  const dispatch = useDispatch();
  const updatestate = () => {
    dispatch(updateblogpost({ title: "", Summary: "", Content: "" }));
  };

  const navlinkStyle = ({ isActive }) => ({
    color: isActive ? "green" : "black",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });
  React.useEffect(() => {
  if (!SearchText) return; // empty search avoid

  const search = async () => {
    dispatch(UpdateSearchData({ IsUserSearch: true }));
    console.log(TextSearched);
    console.log("LoadMore will send at first time:-- ",LoadMore);

    const response = await SearchPost({
      title: SearchText,
      IncrementNumber: LoadMore
    });

    if (response) {
      console.log(response);
      dispatch(UpdateSearchData({
        increment: LoadMore + 1,
        IsContentfind: true
      }));
      dispatch(DataOfSearchingPost(response));
    } else {
      dispatch(UpdateSearchData({
        increment: false,
        IsContentfind: true
      }));
    }
  };

  search();
}, [TextSearched]);
//   const search = React.useCallback(async () => {
//   dispatch(UpdateSearchData({ IsUserSearch: true }));
//     console.log(SearchText);
//   const response = await SearchPost({
//     title: SearchText,
//     IncrementNumber: LoadMore
//   });

//   if (response) {
//     console.log(response);
//     dispatch(UpdateSearchData({
//       increment: true,
//       IsContentfind: true
//     }));
//     dispatch(DataOfSearchingPost(response));
//   } else {
//     dispatch(UpdateSearchData({
//       increment: false,
//       IsContentfind: true
//     }));
//   }
// }, [SearchText]);
//   React.useCallback(() => {
//   const search = async () => {
//   dispatch(UpdateSearchData({IsUserSearch : true}));
//   const response = await SearchPost({title:SearchText,IncrementNumber:LoadMore});
//   if(response){
//     console.log(response)
//     dispatch(UpdateSearchData({
//       increment:true,
//       IsContentfind : true
//     }))
//     dispatch(DataOfSearchingPost(response));
//   }
//   else {
//     dispatch(UpdateSearchData({
//       increment:false,
//       IsContentfind : true
//     }))
//   }
//   // if(response.message){
//   //   console.log(response)
//   //   dispatch(UpdateSearchData({
//   //     incrementsearch: false,
//   //     IsUserSearch: true,
//   //     IsContentfind: true,
      
//   //   }));
//   //   dispatch(DataOfSearchingPost(response));
    
//   // }
//  }
//   },[SearchText])
 

  // React.useEffect( () => {
  //   const data = async () => {
  //     const response = await SearchPost({title:SearchText,IncrementNumber:LoadMore});
      
  //     if(response.message){
  //       console.log(response)
  //       dispatch(UpdateSearchData({
  //         increment: false,
  //         IsUserSearch: true,
  //         IsContentfind: true,
          
  //       }));
  //       dispatch(DataOfSearchingPost(response));
        
  //     }
  //     // else{
  //     //   console.log(response)
  //     //   dispatch(UpdateSearchData({
  //     //     increment: true,
  //     //     IsUserSearch: true,
  //     //     IsContentfind: true,
          
  //     //   }));
  //     //   dispatch(DataOfSearchingPost(response));
  //     // }
  //   }
  //   data()

    
  // },[LoadMore,SearchButton])

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "10px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >

        {/* Search Bar */}
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            style={{ width: "300px", height: "40px", padding: "0 10px", borderRadius: "6px", border: "1px solid #ccc" }}
            type="text"
            placeholder="Search"
            value={SearchText}
            onChange={(e)=>{
              setSearchText(e.target.value)
            }}
          />
          <Link to="Search"><button onClick={()=>{if(TextSearched == SearchText) return; else setTextSearched(SearchText)}}
            style={{ height: "40px", padding: "0 16px", borderRadius: "6px", border: "1px solid green", color: "green", backgroundColor: "white", cursor: "pointer" }}
            type="button"
          >
            Search
          </button></Link>
        </div>

        {/* HOME */}
        <NavLink to="Home" style={navlinkStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 50 50">
            <path fill="currentColor" d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z" />
          </svg>
          <span style={{ fontSize: "18px" }}>HOME</span>
        </NavLink>

        {/* ABOUT - no link, just display */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", cursor: "pointer" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 50 50">
            <path fill="currentColor" d="M 25 1 C 11.222656 1 0 10.878906 0 23.1875 C 0 29.234375 2.773438 34.664063 7.21875 38.6875 C 6.546875 40.761719 5.046875 42.398438 3.53125 43.65625 C 2.714844 44.332031 1.933594 44.910156 1.3125 45.46875 C 1.003906 45.746094 0.722656 46.027344 0.5 46.375 C 0.277344 46.722656 0.078125 47.21875 0.21875 47.75 L 0.34375 48.15625 L 0.6875 48.375 C 1.976563 49.117188 3.582031 49.246094 5.3125 49.125 C 7.042969 49.003906 8.929688 48.605469 10.78125 48.09375 C 14.375 47.101563 17.75 45.6875 19.53125 44.90625 C 21.289063 45.273438 23.054688 45.5 24.90625 45.5 C 38.683594 45.5 49.90625 35.621094 49.90625 23.3125 C 49.90625 11.007813 38.78125 1 25 1 Z" />
          </svg>
          <span style={{ fontSize: "18px" }}>ABOUT</span>
        </div> */}

        {/* ADD POST */}
        <div onClick={updatestate}>
          <NavLink to="AddPost" style={navlinkStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <polyline points="14 4 14 9 19 9" />
              <line x1="12" y1="13" x2="12" y2="19" />
              <line x1="9" y1="16" x2="15" y2="16" />
            </svg>
            <span style={{ fontSize: "18px" }}>ADD POST</span>
          </NavLink>
        </div>

        {/* ACCOUNT - active/signup */}
        <div>
          {isactive ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "green" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26" height="26">
                <path fill="currentColor" d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z" />
              </svg>
              <span style={{ fontSize: "18px" }}>ACTIVE</span>
            </div>
          ) : (
            <NavLink to="Signup" style={navlinkStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26" height="26">
                <path fill="currentColor" d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z" />
              </svg>
              <span style={{ fontSize: "18px" }}>SIGNUP</span>
            </NavLink>
          )}
        </div>

        {/* LOGIN/LOGOUT */}
        <div>
          {isactive ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "black", cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26" height="26">
                <path fill="currentColor" d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z" />
              </svg>
              <button onClick={()=>{dispatch(logout())}} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}><span style={{ fontSize: "18px" }}>LOGOUT</span></button>
            </div>
          ) : (
            <NavLink to="Signin" style={navlinkStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26" height="26">
                <path fill="currentColor" d="M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z" />
              </svg>
              <span style={{ fontSize: "18px" }}>LOGIN</span>
            </NavLink>
          )}
        </div>

      </div>
    </>
  );
}