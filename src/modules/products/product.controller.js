const productService = require("./product.service");

const getProducts = async (req, res) => {
  const products = await productService.getAllProducts(req.query);
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
};

const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
};

const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
