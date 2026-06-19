import User from "../model.js/userSchema.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import redisClient from "../services/redis.js";
export async function register(req, res) {
  const { email, fullname, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user is already register",
      });
    }
    const user = await User.create({
      fullname,
      email,
      password,
      role: "user",
    });
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
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
    const userData = user.toObject();
    delete userData.password;
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
    user,
  });
}

export async function updateUserProfile(req, res) {
  try {
    const userId = req.user.id;

    const { fullname, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (fullname) {
      user.fullname = fullname;
    }
    if (password) {
      user.password = password;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const currentTime = Math.floor(Date.now() / 1000);

    const ttl = decoded.exp - currentTime;

    if (ttl > 0) {
      await redisClient.set(token, "blacklisted", {
        EX: ttl,
      });
    }

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
