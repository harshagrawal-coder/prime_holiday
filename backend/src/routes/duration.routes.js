import { Router } from "express";
const durationRouter = Router();
import {
  createDuration,
  getAllDuration,
  getDurationById,
  updateDuration,
  deleteDuration,
} from "../controller/duration.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";

durationRouter.post("/", authenticate, isAdmin, createDuration);
durationRouter.get("/", getAllDuration);
durationRouter.get("/:id", getDurationById);
durationRouter.put("/:id", authenticate, isAdmin, updateDuration);
durationRouter.delete("/:id", authenticate, isAdmin, deleteDuration);
export default durationRouter;

