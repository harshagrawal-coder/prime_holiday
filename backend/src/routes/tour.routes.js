import { Router } from "express";
const tourRouter = Router();
import {
  createTour,
  getAllTour,
  getTourById,
  updateTour,
  deleteTour
} from "../controller/tour.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../services/multer.js";
import { validateCreateTour } from "../validators/tour.validator.js";
tourRouter.post(
  "/",
  authenticate,
  isAdmin,
  upload.fields([
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
  ]),
  validateCreateTour,
  createTour,
);
tourRouter.get("/", getAllTour);
tourRouter.get("/:id", getTourById);
tourRouter.put("/:id", updateTour);
tourRouter.delete("/:id", deleteTour);
export default tourRouter;
