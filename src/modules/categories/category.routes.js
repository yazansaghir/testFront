const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const validate = require("../../middlewares/validate");
const controller = require("./category.controller");
const validation = require("./category.validation");

const router = express.Router();

router.get("/", asyncHandler(controller.getCategories));
router.get(
  "/:id",
  validate(validation.uuidParam),
  asyncHandler(controller.getCategory)
);
router.post(
  "/",
  validate(validation.createCategorySchema),
  asyncHandler(controller.createCategory)
);
router.put(
  "/:id",
  validate(validation.updateCategorySchema),
  asyncHandler(controller.updateCategory)
);
router.delete(
  "/:id",
  validate(validation.uuidParam),
  asyncHandler(controller.deleteCategory)
);

module.exports = router;
