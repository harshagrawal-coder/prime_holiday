import { Router } from "express";
const tourRouter = Router();
import { createTour } from "../controller/tour.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { upload } from "../services/multer.js";
import { validateCreateTour } from "../validators/tour.validator.js";
tourRouter.post("/create", authenticate, isAdmin, upload.single("image"),createTour);
export default tourRouter;
