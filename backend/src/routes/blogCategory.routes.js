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
} from "../validators/blogCategory.validator.js";

const blogCategoryRouter = Router();

// ==========================================
// Create Category - Admin Only
// ==========================================

blogCategoryRouter.post(
  "/",
  authenticate,
  isAdmin,
  validateCreateBlogCategory,
  createBlogCategory,
);

// ==========================================
// Admin - Get Active + Inactive Categories
// Must be before /:id
// ==========================================

blogCategoryRouter.get(
  "/admin/all",
  authenticate,
  isAdmin,
  getAdminBlogCategories,
);

// ==========================================
// Public - Get Only Active Categories
// ==========================================

blogCategoryRouter.get("/", getBlogCategories);

// ==========================================
// Get Category By ID
// ==========================================

blogCategoryRouter.get("/:id", authenticate, isAdmin, getBlogCategoryById);

// ==========================================
// Update Category - Admin Only
// ==========================================

blogCategoryRouter.put(
  "/:id",
  authenticate,
  isAdmin,
  validateUpdateBlogCategory,
  updateBlogCategory,
);

// ==========================================
// Delete Category - Admin Only
// ==========================================

blogCategoryRouter.delete("/:id", authenticate, isAdmin, deleteBlogCategory);

export default blogCategoryRouter;
