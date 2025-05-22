import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const checkExistingUserByUsername = await User.findOne({ username });

    if(checkExistingUserByUsername){
      return res.status(400).json({
        success: false,
        message: "username already exists",
      });
    }
    const checkExistingUserByEmail = await User.findOne({ email });

    if (checkExistingUserByEmail) {
      
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = await User.create({
      username,
      email,
      password:hashedPassword,
    });

    const token = await genToken(user._id);

    // Store token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite:"Strict",
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(201).json({
      success: true,
      message: `Thanks for registering with us: ${user.username}`,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite:"Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

