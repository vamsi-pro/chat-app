import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 6 * 60 * 60 * 1000,
  });

  res.cookie("access_token", token, {
    maxAge: 6 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  return token;
};
