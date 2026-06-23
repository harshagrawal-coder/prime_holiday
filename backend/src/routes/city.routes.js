import { Router } from "express";
import {
  createCity,
  getAllCity,
  getCityById,
  updateCity,
  deleteCity,
} from "../controller/city.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { cityValidator } from "../validators/region.valdators.js";
const cityRouter = Router();
cityRouter.post("/", authenticate, isAdmin, cityValidator, createCity);
cityRouter.get("/", getAllCity);
cityRouter.get("/:id", getCityById);
cityRouter.put("/:id", authenticate, isAdmin, cityValidator, updateCity);
cityRouter.delete("/:id", authenticate, isAdmin, deleteCity);

export default cityRouter;
