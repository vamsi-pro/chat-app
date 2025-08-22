import express from "express";

import {
  getUsers,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/users", authenticate, getUsers);

router.get("/:id", authenticate, getMessages);

router.post("/chat/:id", authenticate, sendMessage);

export default router;
