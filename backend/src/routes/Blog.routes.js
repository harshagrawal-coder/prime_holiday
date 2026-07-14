import { Router } from "express";
import { authenticate,isAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../services/multer.js";

import { createBlog } from "../controller/Blog.controller.js";
 const blogRouter = Router()
 blogRouter.post("/",createBlog)

 export default blogRouter
