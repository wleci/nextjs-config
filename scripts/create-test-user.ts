import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('👤 Tworzenie użytkownika testowego...\n')

    try {
        const email = 'user@wleci.com'
        const name = 'Test User'
        const password = 'user123'
        const role = 'USER'

        console.log(`📧 Email: ${email}`)
        console.log(`👤 Nazwa: ${name}`)
        console.log(`🔑 Hasło: ${password}`)
        console.log(`🛡️ Rola: ${role}`)
        console.log()

        // Hash password
        console.log('🔐 Szyfrowanie hasła...')
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name,
                password: hashedPassword,
                role: role as 'USER',
            },
            create: {
                email,
                name,
                password: hashedPassword,
                role: role as 'USER',
            },
        })

        console.log(`✅ Użytkownik testowy został utworzony/zaktualizowany!`)
        console.log(`📧 Email: ${user.email}`)
        console.log(`🆔 ID: ${user.id}`)
        console.log(`👤 Rola: ${user.role}`)
        console.log('\n💡 Możesz teraz zalogować się używając:')
        console.log(`   Email: ${email}`)
        console.log(`   Hasło: ${password}`)

    } catch (error: any) {
        console.error('❌ Wystąpił błąd:', error.message)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main().catch((error) => {
    console.error('❌ Nieoczekiwany błąd:', error)
    process.exit(1)
})
