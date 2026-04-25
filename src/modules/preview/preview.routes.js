const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const controller = require("./preview.controller");

const router = express.Router();

router.get(
  "/categories-with-products",
  asyncHandler(controller.getCategoriesWithProducts)
);
router.get("/stats", asyncHandler(controller.getStats));

module.exports = router;
