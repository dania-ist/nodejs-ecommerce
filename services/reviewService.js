const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product && req.params.productId)
    req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body });
  res.status(201).json({ data: review });
});

exports.getReviews = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.productId) {
    filterObject = { product: req.params.productId };
  }
  req.filterObj = filterObject;

  const reviews = await Review.find(req.filterObj).skip(skip).limit(limit);
  res.status(200).json({ results: reviews.length, page, data: reviews });
});

exports.getReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  res.status(200).json({ data: review });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.user = req.user_id;

  const review = await Review.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  review.save();
  res.status(200).json({ data: review });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  review.remove();

  res.status(200).json({ message: "Deleted Review." });
});
