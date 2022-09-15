const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subcategoryRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subcategories", subCategoryRoute);
};

module.exports = mountRoutes;
