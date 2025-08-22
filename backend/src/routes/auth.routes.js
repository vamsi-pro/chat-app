import express from "express";
const router = express.Router();

import {
  loginController,
  registerController,
  logoutController,
  updateProfileController,
  checkAuth,
} from "../controllers/loginController.js";
import { authenticate } from "../middleware/authenticate.js";

router.post("/login", loginController);

router.post("/register", registerController);

router.get("/logout", logoutController);

router.put("/update", authenticate, updateProfileController);

router.get("/check", authenticate, checkAuth);

export default router;
