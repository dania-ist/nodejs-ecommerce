const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const Coupon = require("../models/couponModel");

exports.createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create({ ...req.body });
  res.status(201).json({ data: coupon });
});

exports.getCoupons = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const coupons = await Coupon.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: coupons.length, page, data: coupons });
});

exports.getCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);

  res.status(200).json({ data: coupon });
});

exports.updateCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  res.status(200).json({ data: coupon });
});

exports.deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Coupon.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted Coupon." });
});
