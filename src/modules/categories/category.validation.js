const { z } = require("zod");

const uuidParam = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category id"),
  }),
});

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().optional(),
  }),
});

const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category id"),
  }),
  body: z.object({
    name: z.string().trim().min(1, "Name is required").optional(),
    description: z.string().trim().optional().nullable(),
  }),
});

module.exports = {
  uuidParam,
  createCategorySchema,
  updateCategorySchema,
};
