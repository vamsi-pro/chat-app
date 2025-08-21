import User from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import cloudinary from "../lib/cloudnary.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Invalid user crendetials" });

    const validUser = await User.findOne({ email });

    if (!validUser) return res.status(400).json({ message: "User not found!" });
    const { password: pass, ...rest } = validUser._doc;

    const isPasswordValid = await bcryptjs.compare(password, pass);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid user password!" });

    await generateToken(validUser._id, res);
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "validation for missing fields!" });
    console.log(req.body);

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must have min 6 characters" });

    const isValidUser = await User.findOne({ email });

    if (isValidUser)
      return res.status(400).json({ message: "User already exist!" });

    const salt = await bcryptjs.genSalt(8);
    const hashPassword = await bcryptjs.hash(password, salt);
    const user = await new User({ username, email, password: hashPassword });
    const { password: pass, ...rest } = user._doc;

    if (user) {
      generateToken(user._id, res);
      await user.save();
      res.status(200).json(rest);
    } else {
      res.status(400).json({ message: "Invalid user data!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    // const { id } = req.params;
    // const result = await User.findByIdAndDelete({ _id: id });
    // if (!result) return res.status(400).json("user does not exist");
    res.cookie("access_token", "", { maxAge: 0 });

    res.status(200).json({ message: "User deleted sucessfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: err });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;
    if (!avatar)
      return res.status(400).json({ message: "profile image is required" });

    const uploadResponse = await cloudinary.uploader.upload(avatar);
    console.log("uploadResponse", uploadResponse);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile_avatar: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: err });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error!", error: err });
  }
};
