const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    slug: slugify(req.body.title),
  });
  res.status(201).json({ data: product });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: products.length, page, data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.status(200).json({ data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(
    { _id: id },
    { ...req.body, slug: slugify(req.body.title) },
    { new: true }
  );

  res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted Product." });
});
