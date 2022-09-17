const express = require("express");
const { allowedTo, isAuth } = require("../services/authService");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categortService");
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../validators/categoryValidator");

const subcategoriesRoute = require("./subcategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(isAuth, allowedTo("admin"), createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(isAuth, allowedTo("admin"), updateCategoryValidator, updateCategory)
  .delete(isAuth, allowedTo("admin"), deleteCategoryValidator, deleteCategory);

module.exports = router;
