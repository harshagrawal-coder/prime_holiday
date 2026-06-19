import { Router } from "express";
import {
  register,
  login,
  GetUser,
  updateUserProfile,
  logoutUser
} from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateProfile,
} from "../validators/authvalidators.js";
const authRouter = Router();
authRouter.post("/register", validateRegisterUser, register);
authRouter.post("/login", validateLoginUser, login);
authRouter.get("/me", authenticate, GetUser);
authRouter.put(
  "/update-profile",
  authenticate,
  validateUpdateProfile,
  updateUserProfile,
);
authRouter.post("/logout",authenticate,logoutUser)
export default authRouter;
