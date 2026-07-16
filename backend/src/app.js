import express from "express";
import authRouter from "./routes/auth.routes.js";
import tourRouter from "./routes/tour.routes.js";
import regionRouter from "./routes/region.routes.js";
import stateRouter from "./routes/state.routes.js";
import cityRouter from "./routes/city.routes.js";
import moodRouter from "./routes/mood.routes.js";
import durationRouter from "./routes/duration.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import blogCategoryRouter from "./routes/blogCategory.routes.js";
import blogRouter from "./routes/Blog.routes.js";
import cookie from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use("/api/auth", authRouter);
// app.use("/website", authRouter);
app.use("/api/region", regionRouter);
app.use("/api/tours", tourRouter);
app.use("/api/state", stateRouter);
app.use("/api/city", cityRouter);
app.use("/api/mood", moodRouter);
app.use("/api/duration", durationRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/blogCategory", blogCategoryRouter);
app.use("/api/blog", blogRouter);

import multer from "multer";
import { get } from "mongoose";

app.use((err, req, res, next) => {
  console.log("======================");
  console.log("ERROR NAME:", err.name);
  console.log("ERROR CODE:", err.code);
  console.log("ERROR FIELD:", err.field);
  console.log(err);

  return res.status(500).json({
    success: false,
    name: err.name,
    code: err.code,
    field: err.field,
    message: err.message,
  });
});
export default app;
