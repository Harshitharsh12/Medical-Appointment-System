import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const { name, email, password } = req.body;

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
        data: {
          name: user.name,
          email: user.email,
        },
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
export { loginController, registerController, authController };
