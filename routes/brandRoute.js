const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

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
  .post(
    isAuth,
    allowedTo("admin"),
    uploadBrandImage,
    imageProcessing,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    isAuth,
    allowedTo("admin"),
    uploadBrandImage,
    imageProcessing,
    updateBrandValidator,
    updateBrand
  )
  .delete(isAuth, allowedTo("admin"), deleteBrandValidator, deleteBrand);

module.exports = router;
