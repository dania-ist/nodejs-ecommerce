const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");
const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../services/wishListService");

const router = express.Router();

router.use(isAuth, allowedTo("user"));

router
  .route("/")
  .post(isAuth, allowedTo("user"), addProductToWishlist)
  .get(isAuth, allowedTo("user"), getLoggedUserWishlist);

router.delete(
  "/:productId",
  isAuth,
  allowedTo("user"),
  removeProductFromWishlist
);

module.exports = router;
