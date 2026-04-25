const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const categoriesData = [
    {
      name: "Electronics",
      description: "Devices and gadgets for everyday use",
    },
    {
      name: "Books",
      description: "Learning resources and stories",
    },
    {
      name: "Clothing",
      description: "Everyday wear and fashion basics",
    },
  ];

  const categoryMap = {};

  for (const category of categoriesData) {
    const record = await prisma.category.upsert({
      where: { name: category.name },
      update: { description: category.description },
      create: category,
    });
    categoryMap[record.name] = record;
  }

  const productsData = [
    {
      name: "Laptop",
      description: "Student laptop for coding and assignments",
      price: 750,
      quantity: 5,
      categoryName: "Electronics",
    },
    {
      name: "Phone",
      description: "Mid-range smartphone for daily use",
      price: 500,
      quantity: 10,
      categoryName: "Electronics",
    },
    {
      name: "Novel Book",
      description: "Popular fiction title for leisure reading",
      price: 15,
      quantity: 20,
      categoryName: "Books",
    },
    {
      name: "T-shirt",
      description: "Comfortable cotton t-shirt",
      price: 25,
      quantity: 30,
      categoryName: "Clothing",
    },
  ];

  for (const product of productsData) {
    const category = categoryMap[product.categoryName];
    if (!category) continue;

    const existing = await prisma.product.findFirst({
      where: {
        name: product.name,
        categoryId: category.id,
      },
    });

    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: category.id,
    };

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: productData,
      });
    } else {
      await prisma.product.create({
        data: productData,
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Database seeded successfully.");
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
