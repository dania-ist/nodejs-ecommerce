const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../services/couponService");

const router = express.Router();

router.use(isAuth, allowedTo("admin"));

router.route("/").get(getCoupons).post(createCoupon);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
