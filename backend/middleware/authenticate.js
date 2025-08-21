import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauhtorized user!" });

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res
        .status(401)
        .json({ message: "Unauhtorized user - invalid token!" });
    }

    console.log(decodeToken.userId);

    const userDetails = await User.findById(decodeToken.userId).select(
      "-password"
    );

    if (!userDetails) return res.status(404).json({ message: "Invalid user!" });

    req.user = userDetails;
    next();
  } catch (err) {
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};
