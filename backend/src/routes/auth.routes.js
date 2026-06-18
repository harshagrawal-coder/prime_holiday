import { Router } from "express";
import { register, login, GetUser } from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../validators/authvalidators.js";
const authRouter = Router();
authRouter.post("/register", validateRegisterUser, register);
authRouter.post("/login", validateLoginUser, login);
authRouter.get("/getuser", authenticate, GetUser);
export default authRouter;
