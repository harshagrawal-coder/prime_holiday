import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookie from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookie());
app.use("/api/auth", authRouter);
export default app;
