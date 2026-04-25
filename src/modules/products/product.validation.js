const { z } = require("zod");

const uuidParam = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product id"),
  }),
});

const createProductSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().optional(),
    price: z.coerce.number().min(0, "Price must be >= 0"),
    quantity: z.coerce.number().int().min(0, "Quantity must be >= 0").optional(),
    categoryId: z.string().uuid("Invalid category id"),
  }),
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid product id"),
  }),
  body: z.object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().optional().nullable(),
    price: z.coerce.number().min(0, "Price must be >= 0").optional(),
    quantity: z.coerce
      .number()
      .int()
      .min(0, "Quantity must be >= 0")
      .optional(),
    categoryId: z.string().uuid("Invalid category id").optional(),
  }),
});

const getProductsQuerySchema = z.object({
  query: z.object({
    categoryId: z.string().uuid("Invalid category id").optional(),
    search: z.string().trim().optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  }),
});

module.exports = {
  uuidParam,
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema,
};
