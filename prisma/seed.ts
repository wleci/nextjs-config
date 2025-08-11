import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create users
    const user1 = await prisma.user.upsert({
        where: { email: 'john@example.com' },
        update: {},
        create: {
            email: 'john@example.com',
            name: 'John Doe',
        },
    })

    const user2 = await prisma.user.upsert({
        where: { email: 'jane@example.com' },
        update: {},
        create: {
            email: 'jane@example.com',
            name: 'Jane Smith',
        },
    })

    // Create posts
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'Getting Started with Next.js',
            content: 'Next.js is a powerful React framework...',
            published: true,
            authorId: user1.id,
        },
    })

    await prisma.post.upsert({
        where: { id: 2 },
        update: {},
        create: {
            title: 'Introduction to Prisma',
            content: 'Prisma is a modern database toolkit...',
            published: true,
            authorId: user2.id,
        },
    })

    console.log('Database seeded successfully!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
