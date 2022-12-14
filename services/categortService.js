const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({ ...req.body });
  res.status(201).json({ data: category });
});

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 3;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  res.status(200).json({ data: category });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  res.status(200).json({ data: category });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted post." });
});
