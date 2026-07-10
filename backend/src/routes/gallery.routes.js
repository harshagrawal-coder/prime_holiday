import { Router } from "express";
import {
  createGallery,
  getGallery,
  getAdminGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controller/galleryController.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../services/multer.js";
import {
  validateCreateGallery,
  validateUpdateGallery,
} from "../validators/galleryvalidator.js";
const galleryRouter = Router();
galleryRouter.post(
  "/",
  authenticate,
  isAdmin,
  upload.single("image"),
  validateCreateGallery,
  createGallery,
);
galleryRouter.get("/admin/all", authenticate, isAdmin, getAdminGallery);
// Public gets only active images
galleryRouter.get("/", getGallery);
galleryRouter.get("/:id", getGalleryById);
galleryRouter.put(
  "/:id",
  authenticate,
  isAdmin,
  upload.single("image"),
  validateUpdateGallery,
  updateGallery,
);

galleryRouter.delete("/:id", deleteGallery);
export default galleryRouter;
