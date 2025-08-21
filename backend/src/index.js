import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoute from "../routes/auth.routes.js";
import messageRoute from "../routes/message.routes.js";
import { errorMiddleware } from "../src/middleware/errorMiddleware.js";
import { authenticate } from "../src/middleware/authenticate.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", authenticate, messageRoute);
app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
  connectDB();
});
