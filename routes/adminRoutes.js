import express from "express";
import {
  changeStatusController,
  getAllDoctorsController,
  getAllUsersController,
  getDoctorController,
  updateDoctorController,
} from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

//GET:
router.get("/getAllUsers", authMiddleware, getAllUsersController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
router.post("/changeStatus", authMiddleware, changeStatusController);
router.post("/getDoctor", authMiddleware, getDoctorController);
router.post("/updateDoctor", authMiddleware, updateDoctorController);

export default router;
