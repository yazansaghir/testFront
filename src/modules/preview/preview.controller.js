const previewService = require("./preview.service");

const getCategoriesWithProducts = async (_req, res) => {
  const data = await previewService.getCategoriesWithProducts();
  res.status(200).json({
    success: true,
    message: "Categories with products fetched successfully",
    data,
  });
};

const getStats = async (_req, res) => {
  const data = await previewService.getStats();
  res.status(200).json({
    success: true,
    message: "API stats fetched successfully",
    data,
  });
};

module.exports = {
  getCategoriesWithProducts,
  getStats,
};
