import express from "express";
import authRouter from "./routes/auth.routes.js";
import tourRouter from "./routes/tour.routes.js";
import cookie from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookie());
app.use("/api/auth", authRouter);
app.use("/api/tours",tourRouter)
export default app;
