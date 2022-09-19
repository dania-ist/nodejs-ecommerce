const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

exports.createCashOrder = asyncHandler(async (req, res, next) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    const error = new Error(
      `There is no such cart with id ${req.params.cartId}`
    );
    error.statusCode = 404;
    throw error;
  }

  const cartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
  const order = await Order.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });

  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption, {});

    await Cart.findByIdAndDelete(req.params.cartId);
  }

  res.status(201).json({ status: "success", data: order });
});

exports.getOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});

exports.getAllOrders = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  //   if (req.filterObj) {
  //     req.filterObj = req.filterObj;
  //   } else {
  //     req.filterObj = {};
  //   }

  const orders = await Order.find(req.filterObj).skip(skip).limit(limit);
  res.status(200).json({ results: orders.length, page, data: orders });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  res.status(200).json({ data: order });
});

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const error = new Error(
      `There is no such a order with this id:${req.params.id}`
    );
    error.statusCode = 404;
    throw error;
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const error = new Error(
      `There is no such a order with this id:${req.params.id}`
    );
    error.statusCode = 404;
    throw error;
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({ status: "success", data: updatedOrder });
});
