import { Router } from "express";
import {
  createState,
  getAllState,
  getStateById,
  updateState,
  deleteState,
  updateStateStatus,
} from "../controller/state.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { stateValidator } from "../validators/region.valdators.js";
const stateRouter = Router();
stateRouter.post("/", authenticate, isAdmin, stateValidator, createState);

stateRouter.get("/", getAllState);

stateRouter.get("/:id", getStateById);

stateRouter.put("/:id", authenticate, isAdmin, stateValidator, updateState);
stateRouter.patch("/:id/status", authenticate, isAdmin, updateStateStatus);
stateRouter.delete("/:id", authenticate, isAdmin, deleteState);
export default stateRouter;
