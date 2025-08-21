export const errorMiddleware = (err, req, res, next) => {
  console.log("error hans", err);
  const errorCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(errorCode).json({ success: false, errorCode, message });
};
