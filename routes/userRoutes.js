import express from "express";
import {
  actionController,
  applyDoctorController,
  authController,
  bookAppointmentController,
  deleteAllNotificationController,
  getAllNotificationController,
  getAppointmentController,
  getDoctorAppointmentsController,
  getDoctorController,
  getDoctorsController,
  loginController,
  registerController,
  resetPasswordController,
  updateUserController,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

//routes:
//Login||POST:
router.post("/login", loginController);

// Register || POST:
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);
router.post("/applyDoctor", authMiddleware, applyDoctorController);
router.post(
  "/getAllNotification",
  authMiddleware,
  getAllNotificationController
);
router.post(
  "/deleteAllNotification",
  authMiddleware,
  deleteAllNotificationController
);
router.post("/getDoctors", authMiddleware, getDoctorsController);
router.post("/getDoctor", authMiddleware, getDoctorController);
router.post("/bookAppointment", authMiddleware, bookAppointmentController);
router.post("/getAppointments", authMiddleware, getAppointmentController);
router.post(
  "/getDoctorAppointments",
  authMiddleware,
  getDoctorAppointmentsController
);
router.post("/updateStatus", authMiddleware, actionController);
router.post("/updateProfile", authMiddleware, updateUserController);
router.post("/resetPassword", resetPasswordController);

export default router;
