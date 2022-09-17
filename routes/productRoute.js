const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  imageProcessing,
} = require("../services/productService");

const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../validators/productValidation");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    isAuth,
    allowedTo("admin"),
    uploadProductImages,
    imageProcessing,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    isAuth,
    allowedTo("admin"),
    uploadProductImages,
    imageProcessing,
    updateProductValidator,
    updateProduct
  )
  .delete(isAuth, allowedTo("admin"), deleteProductValidator, deleteProduct);

module.exports = router;
