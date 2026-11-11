
import React from "react";

import Input from "../components/Elements/Input.jsx";
import Button from "../components/Elements/Button.jsx";

import MakeAccount from "../Backend/Createaccount.js";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../store/Slice.js";


export default function CreateAccount() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const dispatch = useDispatch();

    const navigate = useNavigate();


    const userState = useSelector(
        (state) => state.user.Authentication
    );

    const loader = userState.loader;


    // Create Account Function

    const create = async (data) => {

        try {

            // Start Loader
            dispatch(login({ loader: true }));


            // Call Backend API
            const account = await MakeAccount({

                username: data.userName,

                password: data.userPassword,

                email: data.userEmail

            });


            console.log("Account Response:", account);


            // Update Redux Authentication State
            dispatch(
                login({

                    id: account.id,

                    status: true,

                    email: account.email,

                    username: account.user,

                    loader: false,

                    StartFetch: true

                })
            );


            // Success Message
            alert(account.message);


            // Redirect To Home
            navigate("/Home", { replace: true });


        } catch (error) {

            console.error("Create Account Error:", error);


            alert(
                error?.message ||
                "Something went wrong while creating your account."
            );


        } finally {

            // Stop Loader
            dispatch(login({ loader: false }));

        }

    };


    return (

        <>

            {loader ? (

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        fontSize: "20px",
                    }}
                >
                    Loading...
                </div>

            ) : (

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        background:
                            "linear-gradient(135deg, #f0f2f5 0%, #e0e2e5 100%)",
                        padding: "20px",
                        boxSizing: "border-box",
                    }}
                >

                    <div
                        className="container"
                        style={{
                            border: "2px solid #ffffff",
                            width: "100%",
                            maxWidth: "400px",
                            borderRadius: "15px",
                            backgroundColor: "#ffffff",
                            boxShadow:
                                "0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)",
                            padding: "40px",
                            textAlign: "center",
                            boxSizing: "border-box",
                        }}
                    >

                        <h2
                            style={{
                                fontFamily:
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                color: "#333333",
                                fontSize: "28px",
                                marginBottom: "10px",
                                fontWeight: "600",
                            }}
                        >
                            Join Our Community!
                        </h2>


                        <p
                            style={{
                                fontFamily:
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                color: "#666666",
                                fontSize: "16px",
                                marginBottom: "30px",
                            }}
                        >
                            Create your account to get started.
                        </p>


                        <form onSubmit={handleSubmit(create)}>

                            <div className="row" style={{ margin: "2% 0" }}>

                                <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ marginBottom: "15px" }}
                                >

                                    <Input
                                        label="Your Name"
                                        type="text"
                                        placeholder="Enter your first name"
                                        name="userName"
                                        classname="inputforaccount"
                                        labelid="labelforaccount"
                                        {...register("userName", {
                                            required: "Name is required",
                                        })}
                                    />

                                    {errors.userName && (
                                        <p style={{ color: "red" }}>
                                            {errors.userName.message}
                                        </p>
                                    )}

                                </div>

                            </div>


                            <div className="row" style={{ margin: "2% 0" }}>

                                <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ marginBottom: "15px" }}
                                >

                                    <Input
                                        label="Your Email"
                                        type="email"
                                        placeholder="Enter your email"
                                        name="userEmail"
                                        classname="inputforaccount"
                                        labelid="labelforaccount"
                                        {...register("userEmail", {
                                            required: "Email is required",
                                        })}
                                    />

                                    {errors.userEmail && (
                                        <p style={{ color: "red" }}>
                                            {errors.userEmail.message}
                                        </p>
                                    )}

                                </div>

                            </div>


                            <div className="row" style={{ margin: "2% 0" }}>

                                <div
                                    className="col-md-12 col-sm-12 col-xs-12"
                                    style={{ marginBottom: "15px" }}
                                >

                                    <Input
                                        label="Your Password"
                                        type="password"
                                        placeholder="Create your password"
                                        name="userPassword"
                                        classname="inputforaccount"
                                        labelid="labelforaccount"
                                        {...register("userPassword", {

                                            required: "Password is required",

                                            maxLength: {
                                                value: 20,
                                                message:
                                                    "Password cannot exceed 20 characters",
                                            },

                                            pattern: {
                                                value:
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,

                                                message:
                                                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                                            },

                                        })}
                                    />

                                    {errors.userPassword && (
                                        <p style={{ color: "red" }}>
                                            {errors.userPassword.message}
                                        </p>
                                    )}

                                </div>

                            </div>


                            <div
                                className="row"
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >

                                <div
                                    className="col-md-6 col-sm-6 col-xs-6"
                                    style={{ width: "100%" }}
                                >

                                    <Button
                                        height="45px"
                                        width="100%"
                                        text="Sign Up"
                                    />

                                </div>

                            </div>

                        </form>


                        <div className="row">

                            <p
                                style={{
                                    fontFamily:
                                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    color: "#666666",
                                    fontSize: "14px",
                                    marginTop: "15px",
                                }}
                            >

                                Already have an account?{" "}

                                <Link
                                    to="/Signin"
                                    style={{
                                        color: "#007BFF",
                                        textDecoration: "none",
                                    }}
                                >
                                    Log in
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}
