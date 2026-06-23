import { Router } from "express";
import { authenticate,isAdmin } from "../middleware/auth.middleware.js";
import { createMood,getAllMood,getMoodById,updateMood,deleteMood } from "../controller/mood.controller.js";
import {moodValidator} from "../validators/region.valdators.js"
const moodRouter = Router();
moodRouter.post("/", authenticate, isAdmin, moodValidator, createMood);

moodRouter.get("/", getAllMood);

moodRouter.get("/:id", getMoodById);

moodRouter.put("/:id", authenticate, isAdmin, moodValidator, updateMood);

moodRouter.delete("/:id", authenticate, isAdmin, deleteMood);
export default moodRouter;
