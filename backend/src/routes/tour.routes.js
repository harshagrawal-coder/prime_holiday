import { Router } from "express";

import {
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  getTours,
  getAdminTours,
  getTourBySlug,
  getSimilarTours,
} from "../controller/tour.controller.js";

import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

import { upload } from "../services/multer.js";

import {
  validateCreateTour,
  validateUpdateTour,
} from "../validators/tour.validator.js";

const tourRouter = Router();
const tourImageUpload = upload.fields([
  {
    name: "thumbnail",
    maxCount: 1,
  },
  {
    name: "banner",
    maxCount: 1,
  },
  {
    name: "gallery",
    maxCount: 5,
  },
]);
tourRouter.post(
  "/",
  authenticate,
  isAdmin,
  tourImageUpload,
  validateCreateTour,
  createTour,
);
tourRouter.get("/admin/all", authenticate, isAdmin, getAdminTours);
tourRouter.get("/", getTours);
tourRouter.get("/slug/:slug", getTourBySlug);
tourRouter.get("/:id/similar", getSimilarTours);
// tourRouter.get("/:id", getTourById);
tourRouter.get("/:id", getTourById);
tourRouter.put(
  "/:id",
  authenticate,
  isAdmin,
  tourImageUpload,
  validateUpdateTour,
  updateTour,
);
tourRouter.delete("/:id", authenticate, isAdmin, deleteTour);

export default tourRouter;
