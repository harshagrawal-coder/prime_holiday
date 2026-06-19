import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../model.js/userSchema.js";
import redisClient from "../services/redis.js";
export async function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }
  try {
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token has been logged out",
      });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.token = token;
    req.user = user;
    console.log(req.user.role);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  next();
}
