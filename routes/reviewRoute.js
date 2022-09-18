const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  setProductIdAndUserIdToBody,
} = require("../services/reviewService");

const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
} = require("../validators/reviewValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getReviews)
  .post(
    isAuth,
    allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(isAuth, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(
    isAuth,
    allowedTo("user", "admin"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
