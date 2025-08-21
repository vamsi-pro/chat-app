import express from "express";

import {
  getUsers,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", getUsers);

router.get("/:id", getMessages);

router.post("/chat/:id", sendMessage);

export default router;
