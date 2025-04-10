import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) {
      return res.status(200).send({
        success: false,
        message: "Error In Getting All Users Data!!",
      });
    } else {
      res.status(201).send({
        success: true,
        message: "Users Data Fetched Successfully!!",
        data: users,
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

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    if (doctors) {
      res.status(201).send({
        success: true,
        message: "Doctors Data Fetched Successfully!!",
        data: doctors,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Error In Getting All Doctors Data!!",
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
const changeStatusController = async (req, res) => {
  const { status, _id } = req.body;
  try {
    const updatedDoctor = await doctorModel.findByIdAndUpdate(_id, { status });
    const user = await userModel.findOne({ _id: updatedDoctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated!!",
      message: `Your Doctor Request has ${status}`,
      onClickPath: "/notification",
    });
    status === "approved" ? (user.isDoctor = true) : (user.isDoctor = false);
    await user.save();
    if (updatedDoctor) {
      res.status(201).send({
        success: true,
        message: "Status Updated Successfully!!",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error In Updating Status!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Updating Status",
      error,
    });
  }
};
const getDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
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
        message: "Error In Getting Doctor Data!!",
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
const updateDoctorController = async (req, res) => {
  try {
    const updatedUser = await doctorModel.findByIdAndUpdate(req.body._id, {
      ...req.body,
    });
    if (updatedUser) {
      res.status(201).send({
        success: true,
        message: "Doctor data has updated Successfully!!",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error in Updating Doctor Profile!!",
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
export {
  getAllUsersController,
  getAllDoctorsController,
  changeStatusController,
  getDoctorController,
  updateDoctorController,
};
