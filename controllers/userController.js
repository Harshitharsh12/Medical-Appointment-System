import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User Not Found!!",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(201).send({
        success: false,
        message: "User Not Found!!",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(201).send({
      success: true,
      message: "Login Successfully!",
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Login!!",
    });
  }
};
//
const registerController = async (req, res) => {
  try {
    const { name, email, password, game } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exist!!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await new userModel({
      name,
      email,
      password: hashPassword,
      game,
    }).save();
    if (newUser) {
      res.status(201).send({
        success: true,
        message: "User Registered Successfully!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error In Registration!!",
      success: false,
    });
  }
};
const resetPasswordController = async (req, res) => {
  try {
    const { email, game, password } = req.body;
    const user = await userModel.findOne({ email, game });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Game!!",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
    }
    res.status(201).send({
      success: true,
      message: "Password has been Updated Successfully!!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error In Password Reset!!",
      success: false,
    });
  }
};

const authController = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Error In Getting Data!!",
      });
    } else {
      res.status(201).send({
        success: true,
        message: " User Data Fetchecd Successfully!!",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Auth!!",
      error,
    });
  }
};
const applyDoctorController = async (req, res) => {
  try {
    const doctor = await new doctorModel({
      ...req.body,
    }).save();
    if (doctor) {
      const admin = await userModel.findOne({ isAdmin: true });
      const notification = admin.notification;
      notification.push({
        type: "apply-doctor-request",
        message: `${req.body.firstName} ${req.body.lastName} Successfully applied for Doctor Role!!`,
        data: {
          doctorId: doctor._id,
          name: doctor.firstName + " " + doctor.lastName,
          onClickPath: "/admin/doctors",
        },
      });
      await userModel.findByIdAndUpdate(admin._id, { notification });
      res.status(201).send({
        success: true,
        message: `Successfully applied for Doctor Role!!`,
        doctor,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error in applying for Doctor!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while applying for Doctor!!",
      error,
    });
  }
};
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const notification = user.notification;
    const seenNotification = user.seenNotification;
    seenNotification.push(...notification);
    // user.seenNotification = notification;
    user.notification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(201).send({
      success: true,
      message: "All Notifications marked as read!!",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Getting Notifications!!",
      error,
    });
  }
};
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.seenNotification = [];
    user.notification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(201).send({
      success: true,
      message: "All Notifications Deleted Successfully!!",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Deleting Notifications!!",
      error,
    });
  }
};
const getDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    if (doctors) {
      res.status(201).send({
        success: true,
        message: "Doctor Data Fetched Successfully!!",
        data: doctors,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error in Getting Doctor Data!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};
const getDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body._id });
    if (doctor) {
      res.status(201).send({
        success: true,
        message: "Doctors Data Fetched Successfully!!",
        data: doctor,
      });
    } else {
      console.log("Error In Getting Doctor Data!!");
      res.status(200).send({
        success: false,
        message: "Error In Getting Docto!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error,
      error,
    });
  }
};
const bookAppointmentController = async (req, res) => {
  try {
    const book = await new appointmentModel(req.body).save();
    const user = await userModel.findById({ _id: req.body.userId });
    user.notification.push({
      type: "Appointment-Booking request",
      message:
        "SuccesFully applied for Appointment, Wait for Confirm Notification!!",
      status: "pending",
      onClickPath: "/doctor/appointment",
    });
    await user.save();

    const doctor = await userModel.findById({ _id: req.body.doctorId });

    doctor.notification.push({
      type: "Appointment-Booking request",
      message: `Appointment Request From ${user.name}`,
      onClickPath: "/user/appointment",
    });
    await doctor.save();
    if (book) {
      res.status(201).send({
        success: true,
        message: "Applied Successfully for Appointment!!",
        appointment: book,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error while Booking Appointment!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
      error,
    });
  }
};
const getAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    if (appointments) {
      res.status(201).send({
        success: true,
        message: "Appointments Fetched Successfully!!",
        appointments: appointments,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error In Fetching Appointments!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Fetching Appointments!!",
      error,
    });
  }
};
const getDoctorAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      doctorId: req.body.doctorId,
    });
    if (appointments) {
      res.status(201).send({
        success: true,
        message: "Doctors Appointments Fetched Successfully!!",
        appointments: appointments,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error While Getting Doctors Appointments!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Getting Doctors Appointments!!",
    });
  }
};
const actionController = async (req, res) => {
  try {
    const status = await appointmentModel.findByIdAndUpdate(req.body.id, {
      status: req.body.status,
    });
    const user = await userModel.findById({ _id: status.userId });
    user.notification.push({
      type: "Appointment Status result",
      message: `your Appointment request has ${req.body.status}`,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "Status Updated Successfully!!",
      status,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Updating status!!",
    });
  }
};
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body._id, {
      ...req.body,
    });
    if (user) {
      res.status(201).send({
        success: true,
        message: "User-Profile has been Updated Successfully!!",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error While Updating User Profile!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Updating User Profile!!",
    });
  }
};
export {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getDoctorsController,
  getDoctorController,
  bookAppointmentController,
  getAppointmentController,
  getDoctorAppointmentsController,
  actionController,
  updateUserController,
  resetPasswordController,
};
