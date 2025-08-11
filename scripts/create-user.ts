import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}



async function main() {
    console.log('👤 Tworzenie nowego użytkownika\n')

    try {
        const email = await askQuestion('Email: ')
        const name = await askQuestion('Imię i nazwisko: ')
        const password = await askQuestion('Hasło: ')

        if (!email || !password) {
            console.log('❌ Email i hasło są wymagane!')
            process.exit(1)
        }

        // Hash password
        console.log('🔐 Szyfrowanie hasła...')
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                name: name || null,
                password: hashedPassword,
            },
            create: {
                email,
                name: name || null,
                password: hashedPassword,
            },
        })

        console.log(`✅ Użytkownik ${user.name || user.email} został utworzony/zaktualizowany!`)
        console.log(`📧 Email: ${user.email}`)
        console.log(`🆔 ID: ${user.id}`)
        console.log('\n💡 Możesz teraz zalogować się używając tego emaila i hasła.')

    } catch (error: any) {
        if (error.code === 'P2002') {
            console.log('❌ Użytkownik z tym emailem już istnieje!')
        } else {
            console.error('❌ Wystąpił błąd:', error.message)
        }
        process.exit(1)
    } finally {
        rl.close()
        await prisma.$disconnect()
    }
}

main().catch((error) => {
    console.error('❌ Nieoczekiwany błąd:', error)
    process.exit(1)
})
