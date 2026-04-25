const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const validate = require("../../middlewares/validate");
const controller = require("./product.controller");
const validation = require("./product.validation");

const router = express.Router();

router.get(
  "/",
  validate(validation.getProductsQuerySchema),
  asyncHandler(controller.getProducts)
);
router.get(
  "/:id",
  validate(validation.uuidParam),
  asyncHandler(controller.getProduct)
);
router.post(
  "/",
  validate(validation.createProductSchema),
  asyncHandler(controller.createProduct)
);
router.put(
  "/:id",
  validate(validation.updateProductSchema),
  asyncHandler(controller.updateProduct)
);
router.delete(
  "/:id",
  validate(validation.uuidParam),
  asyncHandler(controller.deleteProduct)
);

module.exports = router;
