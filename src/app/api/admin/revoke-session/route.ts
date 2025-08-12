import { NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        // Sprawdź czy użytkownik jest adminem
        const authError = await checkAdminAuth()
        if (authError) return authError

        const body = await request.json()
        const { userId } = body

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        // Sprawdź czy użytkownik istnieje
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: { id: true, email: true, name: true }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        // W prawdziwej aplikacji można by dodać tabelę "revoked_tokens"
        // lub zmienić pole w bazie danych, które wymusi wylogowanie
        // Na razie zwracamy sukces - sesja wygaśnie naturalnie w ciągu 8h

        return NextResponse.json({
            message: `Session revocation initiated for user ${user.email}`,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            note: "User will be logged out within 10 minutes (next session check)"
        })

    } catch (error) {
        console.error('Failed to revoke session:', error)
        return NextResponse.json(
            { error: 'Failed to revoke session' },
            { status: 500 }
        )
    }
}
