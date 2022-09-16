const express = require("express");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  imageProcessing,
  uploadBrandImage,
} = require("../services/brandService");

const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require("../validators/brandValidator");

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage, imageProcessing, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage, imageProcessing, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
