import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Database ${mongoose.connection.host} Connected Successfully!!`
        .bgGreen.white
    );
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};
export default connectDB;
