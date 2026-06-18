import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../model.js/userSchema.js";
export async function authenticate(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = user;
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
