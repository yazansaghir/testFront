const prisma = require("../../config/prisma");
const ApiError = require("../../utils/ApiError");

const ensureCategoryExists = async (categoryId) => {
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    throw new ApiError(400, "Category does not exist");
  }
};

const getAllProducts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where = {};

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
    ];
  }

  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice !== undefined) where.price.gte = query.minPrice;
    if (query.maxPrice !== undefined) where.price.lte = query.maxPrice;
  }

  if (query.minPrice !== undefined && query.maxPrice !== undefined) {
    if (query.minPrice > query.maxPrice) {
      throw new ApiError(400, "minPrice cannot be greater than maxPrice");
    }
  }

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const createProduct = async (payload) => {
  await ensureCategoryExists(payload.categoryId);

  return prisma.product.create({
    data: payload,
    include: { category: true },
  });
};

const updateProduct = async (id, payload) => {
  await getProductById(id);

  if (payload.categoryId) {
    await ensureCategoryExists(payload.categoryId);
  }

  return prisma.product.update({
    where: { id },
    data: payload,
    include: { category: true },
  });
};

const deleteProduct = async (id) => {
  await getProductById(id);
  await prisma.product.delete({ where: { id } });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
