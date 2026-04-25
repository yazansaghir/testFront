const prisma = require("../../config/prisma");
const ApiError = require("../../utils/ApiError");

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return category;
};

const createCategory = async (payload) => {
  const existing = await prisma.category.findUnique({
    where: { name: payload.name },
  });

  if (existing) {
    throw new ApiError(409, "Category name already exists");
  }

  return prisma.category.create({
    data: payload,
  });
};

const updateCategory = async (id, payload) => {
  await getCategoryById(id);

  if (payload.name) {
    const existing = await prisma.category.findUnique({
      where: { name: payload.name },
    });
    if (existing && existing.id !== id) {
      throw new ApiError(409, "Category name already exists");
    }
  }

  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id) => {
  await getCategoryById(id);

  const productsCount = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productsCount > 0) {
    throw new ApiError(
      400,
      "Cannot delete category because it still has related products"
    );
  }

  await prisma.category.delete({
    where: { id },
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
