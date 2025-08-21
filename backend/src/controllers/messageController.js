import cloudinary from "../lib/cloudnary.js";
import Message from "../../models/message.model.js";
import User from "../../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { image, text } = req.body;
    const { id: receiverId } = req.params;

    let imageUrl;

    if (image) {
      const uploadrespopnse = cloudinary.uploader.upload(image);
      imageUrl = (await uploadrespopnse).secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      image: imageUrl,
      text,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
};
