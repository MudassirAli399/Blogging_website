import React, {  useEffect } from "react";
import Input from "../components/Elements/Input.jsx";
import Button from "../components/Elements/Button.jsx";

import MakeAccount from "../Backend/Createaccount.js"

import { Link } from "react-router-dom";

import {useForm} from "react-hook-form";

import { useSelector,useDispatch } from "react-redux";
import { login } from "../store/Slice.js";

export default function  CreateAccount() {

 const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.Authentication);
  const loader = useSelector((state) => state.user.Authentication.loader);

  useEffect(() => {
    if (userState.status) {
      alert("Account created successfully");
      console.log(userState);
     
    }
  }, [userState.email]);

  const create = async (data) => {
      dispatch(login({loader:true}))
      if (data && data.userEmail!=userState.email) {
        const account = await MakeAccount({
          username: data.userName,
          password: data.userPassword,
          email: data.userEmail,
        });
  
        if (account) {
        dispatch(login({loader:false}))

          dispatch(login({ id: account.id, status:true,email:account.email,username:account.user }));
        }
      }
      else {
        dispatch(login({loader:false}))

        alert("Account already exists");
      }
    }

 


  return (
    <>
    {
      loader ? (<div>Loading</div>) :(
         <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #f0f2f5 0%, #e0e2e5 100%)",
        padding: "20px", 
        boxSizing: "border-box" 
      }}>
        <div className='container' style={{
          border: "2px solid #ffffff", 
          width: "100%", 
          maxWidth: "400px", 
          borderRadius: "15px", 
          backgroundColor: "#ffffff", 
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)", 
          padding: "40px", 
          textAlign: "center" 
        }}>

          <h2 style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#333333",
            fontSize: "28px",
            marginBottom: "10px",
            fontWeight: "600"
          }}>Join Our Community!</h2>
          <p style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#666666",
            fontSize: "16px",
            marginBottom: "30px"
          }}>Create your account to get started.</p>
          <form onSubmit={handleSubmit(create)}>
          <div className='row' style={{ margin: "2% 0" }}> 
            <div className='col-md-12 col-sm-12 col-xs-12' style={{ marginBottom: "15px" }}>
              <Input
                label="Your Name"
                type="text"
                placeholder="Enter your first name"
                name="userName"
                classname="inputforaccount"
                labelid="labelforaccount" 
                {...register("userName",{
                  required:true
                })}
              />
            </div>
          </div>

          <div className='row' style={{ margin: "2% 0" }}>
            <div className='col-md-12 col-sm-12 col-xs-12' style={{ marginBottom: "15px" }}>
              <Input
                label="Your Email"
                type="email"
                placeholder="Enter your email"
                name="userEmail"
                classname="inputforaccount"
                labelid="labelforaccount" 
                {...register("userEmail",{
                  required:true
                })}
              />
            </div>
          </div>

          <div className='row' style={{ margin: "2% 0" }}>
            <div className='col-md-12 col-sm-12 col-xs-12' style={{ marginBottom: "15px" }}>
              <Input
                label="Your Password"
                type="password"
                placeholder="Create your password"
                name="userPassword"
                classname="inputforaccount"
                labelid="labelforaccount" 
                {...register("userPassword",{
                  required:true,
                  maxLength:20,
                  pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                            message:
                                    'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
                          },
                })}
              />
               {errors.userPassword && <p style={{ color: 'red' }}>{errors.userPassword.message}</p>}
            </div>
          </div>

          <div className='row' style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <div className='col-md-6 col-sm-6 col-xs-6' style={{ width: "100%" }}> 
              <Button
                height="45px" 
                width="100%" 
                text="Sign Up"
              />
            </div>
          </div>
          </form>
          <div className="row">
            <p style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#666666",
              fontSize: "14px",
              marginTop: "15px"
            }}>Already have an account? <Link to="/Signin" style={{ color: "#007BFF", textDecoration: "none" }}>Log in</Link></p>
          </div>
        </div>
      </div>
      )
    }
    
     
    </>
  );
  
}