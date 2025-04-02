import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(200).send({
          success: false,
          err,
          message: "Error in Authentication!!",
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      message: "Error in Authentication!!",
      success: false,
    });
  }
};

export default authMiddleware;
