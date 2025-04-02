import express from "express";
import {
  authController,
  loginController,
  registerController,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes:
//Login||POST:
router.post("/login", loginController);

// Register || POST:
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);

export default router;
