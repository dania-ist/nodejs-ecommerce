const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    ...req.body,
    // name: req.body.name,
    // email: req.body.email,
    // password: req.body.password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isCorrectPassword) {
    const error = new Error("Incorrect email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ data: user, token });
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error("You are not allowed to access this route");
      error.statusCode = 403;
      throw error;
    }
    next();
  });

exports.isAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    const error = new Error(
      "You are not login, Please login to get access this route"
    );
    error.statusCode = 401;
    throw error;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.userId);
  req.user = currentUser;

  next();
});

// exports.isAuth = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     const error = new Error(
//       "You are not login, Please login to get access this route"
//     );
//     error.statusCode = 401;
//     throw error;
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const currentUser = await User.findById(decoded.userId);
//   req.user = currentUser;

//   next();
// });
