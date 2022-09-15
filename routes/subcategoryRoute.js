const express = require("express");

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
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategoryValidator, getSubCategories);
router
  .route("/:id")
  .get(getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
