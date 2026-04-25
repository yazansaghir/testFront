const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  const categoriesData = [
    {
      name: "Electronics",
      description: "Phones, laptops, and smart accessories",
    },
    {
      name: "Books",
      description: "Educational and fiction books",
    },
    {
      name: "Home",
      description: "Home and kitchen essentials",
    },
  ];

  const categories = [];

  for (const category of categoriesData) {
    const record = await prisma.category.upsert({
      where: { name: category.name },
      update: { description: category.description },
      create: category,
    });
    categories.push(record);
  }

  const productsData = [
    {
      name: "Wireless Mouse",
      description: "Ergonomic 2.4GHz wireless mouse",
      price: 25.99,
      quantity: 45,
      categoryId: categories[0].id,
    },
    {
      name: "Node.js Guide",
      description: "Beginner friendly backend handbook",
      price: 18.5,
      quantity: 60,
      categoryId: categories[1].id,
    },
    {
      name: "Blender",
      description: "1.5L kitchen blender with 3 speeds",
      price: 49.99,
      quantity: 15,
      categoryId: categories[2].id,
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({
      data: product,
    });
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
