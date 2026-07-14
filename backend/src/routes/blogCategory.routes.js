import { Router } from "express";

import {
  createBlogCategory,
  getBlogCategories,
  getAdminBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
} from "../controller/blogCategory.controller.js";

import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

import {
  validateCreateBlogCategory,
  validateUpdateBlogCategory,
} from "../validators/blogCategoryValidators.js";

const blogCategoryRouter = Router();
blogCategoryRouter.post(
  "/",
  authenticate,
  isAdmin,
  validateCreateBlogCategory,
  createBlogCategory,
);
blogCategoryRouter.get(
  "/admin/all",
  authenticate,
  isAdmin,
  getAdminBlogCategories,
);
blogCategoryRouter.get("/", getBlogCategories);
blogCategoryRouter.get("/:id", authenticate, isAdmin, getBlogCategoryById);
blogCategoryRouter.put(
  "/:id",
  authenticate,
  isAdmin,
  validateUpdateBlogCategory,
  updateBlogCategory,
);
blogCategoryRouter.delete("/:id", authenticate, isAdmin, deleteBlogCategory);



export default blogCategoryRouter;
