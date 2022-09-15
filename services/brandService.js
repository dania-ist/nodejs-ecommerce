const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel");

exports.createBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create({ ...req.body });
  res.status(201).json({ data: brand });
});

exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  res.status(200).json({ data: brand });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  res.status(200).json({ data: brand });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Brand.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted brand." });
});
