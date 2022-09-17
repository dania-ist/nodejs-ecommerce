const express = require("express");
const { isAuth, allowedTo } = require("../services/authService");

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subcategoryService");
const {
  createSubCategoryValidator,
  updateSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../validators/subcategoryValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    isAuth,
    allowedTo("admin"),
    createSubCategoryValidator,
    createSubCategory
  )
  .get(getSubCategoryValidator, getSubCategories);

router
  .route("/:id")
  .get(getSubCategory)
  .put(
    isAuth,
    allowedTo("admin"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    isAuth,
    allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
