import express from "express";
import {
  regionCreate,
  getAllRegion,
  getRegionById,
  updateRegion,
  updateRegionStatus,
  deleteRegion,
} from "../controller/regionTour.controller.js";

import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { regionValidator } from "../validators/region.valdators.js";
const router = express.Router();
router.post("/", authenticate, isAdmin, regionValidator, regionCreate);
router.get("/", getAllRegion);
router.get("/:id", getRegionById);
router.put("/:id", authenticate, isAdmin, updateRegion);
router.patch(
  "/:id/status",
  authenticate,
  isAdmin,
  updateRegionStatus,
);
router.delete("/:id", authenticate, isAdmin, deleteRegion);

export default router;
