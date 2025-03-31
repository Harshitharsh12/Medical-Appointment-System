import userModel from "../../Ecommerce-app/backend/models/userModel.js";

const loginController = () => {};
//register callback:
const registerController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(200).send({
        success: false,
        message: "User Already Exist!!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration!!",
      error,
    });
  }
};
export { loginController, registerController };
