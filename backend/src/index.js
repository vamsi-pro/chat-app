import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "../lib/db.js";
import authRoute from "../routes/auth.routes.js";
import messageRoute from "../routes/message.routes.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { authenticate } from "../middleware/authenticate.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", authenticate, messageRoute);
app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
  connectDB();
});
