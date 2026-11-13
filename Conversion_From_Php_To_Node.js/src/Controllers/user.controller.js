
import asynchandler from "../Utils/Asynchandler.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from .env");
  }
  console.log("Generating token for user:", user); // Debugging line to check the user object
  return jwt.sign(
    {
      id: user.id,
      username: user.NAME,
      email: user.EMAIL,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

const CreateUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.test.findFirst({
    where: {
      EMAIL: normalizedEmail,
    },
  });

  if (existingUser) {
    return res.status(409).json({
      status: "error",
      message: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.test.create({
    data: {
      NAME: username.trim(),
      EMAIL: normalizedEmail,
      PASSWORD: hashedPassword,
      IMAGE: "",
    },
  });

  // Generate JWT after successful account creation.
  const token = generateToken(user);

  res.cookie("accessToken", token, cookieOptions);

  return res.status(201).json({
    status: "success",
    message: "Account created successfully",
    user: user.NAME,
    id: String(user.id),
    email: user.EMAIL,
  });
});

const LoginUser = asynchandler(async (req, res) => {
  // Keep useremail to match your existing login request.
  const { useremail, password } = req.body;

  if (!useremail || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }

  const normalizedEmail = useremail.trim().toLowerCase();

  const user = await prisma.test.findFirst({
    where: {
      EMAIL: normalizedEmail,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.PASSWORD
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }

  const token = generateToken(user);

  // Store JWT in an HTTP-only cookie.
  
  console.log("Generated JWT:", token); // Debugging line to check the generated token  
  return res
  .cookie("accessToken", token, cookieOptions)
  .status(200)
  .json({
    status: "success",
    message: "Login successful",
    user: {
      id: String(user.id),
      username: user.NAME,
      email: user.EMAIL,
    },
  })
  
});

const LogoutUser = asynchandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    status: "success",
    message: "Logout successful",
  });
});

export { CreateUser, LoginUser, LogoutUser };
