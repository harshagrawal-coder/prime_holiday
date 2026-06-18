import User from "../model.js/userSchema.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export async function register(req, res) {
  const { email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user is already register",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token);
    const userData = user.toObject();
    delete userData.password;
    res.status(201).json({
      success: true,
      message: "successfully registered",
      userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: true,
      message: "email or password is required",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }
    const ismatch = await user.comparePassword(password);
    if (!ismatch) {
      return res.status(400).json({
        success: false,
        message: "password invalid",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token);
    const userData = user.toObject()
    delete userData.password
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: userData,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function GetUser(req, res) {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "user fetched successfully",
    user
  });
}
