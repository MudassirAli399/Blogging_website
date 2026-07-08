import React, { useEffect } from "react";
import Input from "../components/Elements/Input.jsx";
import Button from "../components/Elements/Button.jsx";

import { useForm } from "react-hook-form";
import { useSelector , useDispatch } from "react-redux";

import LoginAccount from "../Backend/Loginaccount.js";
import { login } from "../store/Slice.js";

export default function Login() {

  const Dispatch = useDispatch();

  const state = useSelector((state)=>state.user)

  const { register, handleSubmit} = useForm();

  useEffect(() => {
    if (state.Authentication.status === true && state.Authentication.email) {
        alert("You are logged in");
    }
}, [state.Authentication.status, state.Authentication.email]);

  

  const Login = async (data) => {
    console.log("State Before Login:-- ",state)
    console.log("Data for login:-- ",data);
    if(data && data.userEmail!=state.Authentication.email){

    const Logindata = await LoginAccount({
      useremail: data.userEmail,
      password: data.userPassword,
      
    });

   if(Logindata){ 
    console.log("data comes from backend for login:-- ",Logindata.user);
    Dispatch(login({id:Logindata.user.id, status:true,email:Logindata.user.EMAIL,username:Logindata.user.NAME}));
    console.log("state after getting data from backend:-- ",state);
   }
   else{
    Dispatch(login({status:false,email:"",username:""}));
    console.log(Logindata);
    
   }
  }
  else{
    alert("You are already logged in");
  }
  }
  


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f2f5 0%, #e0e2e5 100%)",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="container"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.8)",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)",
            padding: "50px",
            textAlign: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#333333",
              fontSize: "32px",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            Welcome Back!
          </h2>
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              color: "#666666",
              fontSize: "17px",
              marginBottom: "40px",
            }}
          >
            Sign in to your account.
          </p>
            <form onSubmit={handleSubmit(Login)}>
          <div className="row" style={{ margin: "2% 0" }}>
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: "20px" }}>
              <Input
                label="Your Email"
                type="email"
                placeholder="Enter your email"
                name="userEmail"
                classname="inputforaccount"
                labelid="labelforaccount"
                {...register("userEmail", { required: true })}
              />
            </div>
          </div>

          <div className="row" style={{ margin: "2% 0" }}>
            <div className="col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: "20px" }}>
              <Input
                label="Your Password"
                type="password"
                placeholder="Enter your password"
                name="userPassword"
                classname="inputforaccount"
                labelid="labelforaccount"
                {...register("userPassword", { required: true })}
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
            <div className="col-md-6 col-sm-6 col-xs-6" style={{ width: "100%" }}>
              <Button height="50px" width="100%" text="Login" />
            </div>
          </div>
          </form>
          <div className="row">
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                color: "#666666",
                fontSize: "15px",
                marginTop: "25px",
              }}
            >
              Don't have an account?{" "}
              <a href="/register" style={{ color: "#3f2b96", textDecoration: "none", fontWeight: "600" }}>
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}