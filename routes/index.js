const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subcategoryRoute");
const brandRoute = require("./brandRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subcategories", subCategoryRoute);
  app.use("/api/v1/brands", brandRoute);
};

module.exports = mountRoutes;
