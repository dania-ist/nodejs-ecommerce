const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");

const { uploadSingleImage } = require("../middlewares/uploadSingleImage");
const User = require("../models/userModel");

exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(201).json({ data: user });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const users = await User.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: users.length, page, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({ data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted User." });
});

exports.uploadProfileImage = uploadSingleImage("profileImage");

exports.imageProcessing = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    req.body.image = `${process.env.BASE_URL}/users/${filename}`;
  }
  next();
});

exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.changeCurrentUserPassword = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.updateCurrentUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});
