import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../model.js/userSchema.js";
import redisClient from "../services/redis.js";

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const token = authHeader.split(" ")[1];

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

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
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
