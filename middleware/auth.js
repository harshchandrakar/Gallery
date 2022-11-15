const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return next(new ErrorHandler("Token missing please check", 401));
  }
  token = token.split(" ")[1];
  let val = jwt.verify(token, process.env.JWT_SECRET);

  if (!val) {
    return next(new ErrorHandler("Token verification failed", 401));
  }

  next();
});

module.exports = isAuthenticated;
