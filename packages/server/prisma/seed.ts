import { prisma } from './prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: { email: 'alice@example.com', name: 'Alice Johnson' },
    }),
    prisma.user.create({
      data: { email: 'bob@example.com', name: 'Bob Smith' },
    }),
    prisma.user.create({
      data: { email: 'carol@example.com', name: 'Carol Davis' },
    }),
    prisma.user.create({
      data: { email: 'dave@example.com', name: 'Dave Wilson' },
    }),
    prisma.user.create({
      data: { email: 'eve@example.com', name: 'Eve Brown' },
    }),
  ])
  console.log(`✓ Created ${users.length} users`)

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Mouse',
        description: 'Reliable wireless mouse for everyday use',
        price: 19.99,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mechanical Keyboard',
        description: 'Durable mechanical keyboard with tactile keys',
        price: 79.99,
      },
    }),
    prisma.product.create({
      data: {
        name: 'USB-C Charger',
        description: 'Fast charging USB-C wall charger',
        price: 24.99,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Noise Cancelling Headphones',
        description: 'Comfortable headphones with active noise cancellation',
        price: 129.99,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand',
        price: 34.99,
      },
    }),
  ])
  console.log(`✓ Created ${products.length} products`)

  // Create reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        title: 'Great mouse',
        content: 'Works smoothly and battery lasts long.',
        published: true,
        rating: 5,
        authorId: users[0].id,
        productId: products[0].id,
      },
    }),
    prisma.review.create({
      data: {
        title: 'Good value',
        content: 'Solid keyboard for the price.',
        published: true,
        rating: 4,
        authorId: users[1].id,
        productId: products[1].id,
      },
    }),
    prisma.review.create({
      data: {
        title: 'Fast charging',
        content: 'Charges my phone very quickly.',
        published: true,
        rating: 5,
        authorId: users[2].id,
        productId: products[2].id,
      },
    }),
    prisma.review.create({
      data: {
        title: 'Very comfortable',
        content: 'Excellent sound quality and comfort.',
        published: true,
        rating: 5,
        authorId: users[3].id,
        productId: products[3].id,
      },
    }),
    prisma.review.create({
      data: {
        title: 'Nice stand',
        content: 'Keeps my laptop cool and at a good angle.',
        published: true,
        rating: 4,
        authorId: users[4].id,
        productId: products[4].id,
      },
    }),
    prisma.review.create({
      data: {
        title: 'Decent mouse',
        content: 'Responsive but slightly small for my hand.',
        published: true,
        rating: 4,
        authorId: users[1].id,
        productId: products[0].id,
      },
    }),
    prisma.review.create({
      data: {
        title: 'Sturdy build',
        content: 'Feels premium and types well.',
        published: true,
        rating: 5,
        authorId: users[2].id,
        productId: products[1].id,
      },
    }),
  ])
  console.log(`✓ Created ${reviews.length} reviews`)

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(' Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
