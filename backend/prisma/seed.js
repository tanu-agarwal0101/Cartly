const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create 2 users
  const password = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password,
    },
  });

  console.log({ user1, user2 });

  // Create 10 products
  const productsData = Array.from({ length: 10 }).map((_, i) => ({
    title: `Product ${i + 1}`,
    price: (i + 1) * 100,
    description: `This is a description for Product ${i + 1}. contain search terms like gadget or widget.`,
    image: `https://picsum.photos/seed/${i + 1}/200/300`,
    ownerId: user1.id,
  }));

  for (const p of productsData) {
    await prisma.product.create({ data: p });
  }

  console.log('Seeded 10 products');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
