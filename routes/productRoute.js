const express = require("express");

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
    uploadProductImages,
    imageProcessing,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    uploadProductImages,
    imageProcessing,
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
