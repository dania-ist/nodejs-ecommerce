const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

const {
  createCashOrder,
  getOrderForLoggedUser,
  getAllOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../services/orderService");

const router = express.Router();

router.use(isAuth);

router.route("/:cartId").post(allowedTo("user"), createCashOrder);
router.get(
  "/",
  allowedTo("user", "admin"),
  getOrderForLoggedUser,
  getAllOrders
);
router.get("/:id", getOrder);

router.put("/:id/pay", allowedTo("admin"), updateOrderToPaid);
router.put("/:id/deliver", allowedTo("admin"), updateOrderToDelivered);

module.exports = router;
