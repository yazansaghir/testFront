const prisma = require("../../config/prisma");

const getCategoriesWithProducts = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        orderBy: { name: "asc" },
      },
    },
  });
};

const getStats = async () => {
  const [totalCategories, totalProducts, categories] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  return {
    totalCategories,
    totalProducts,
    productsPerCategory: categories.map((category) => ({
      category: category.name,
      count: category._count.products,
    })),
  };
};

module.exports = {
  getCategoriesWithProducts,
  getStats,
};
