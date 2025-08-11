import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Get current authenticated user
        const currentUser = await getCurrentUser()

        // Fetch user profile from database
        const user = await prisma.user.findUnique({
            where: { id: parseInt(currentUser.id!) },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                // Don't include password
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        if (error instanceof Error && error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.error('Failed to fetch profile:', error)

        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        // Get current authenticated user
        const currentUser = await getCurrentUser()

        const body = await request.json()
        const { name } = body

        // Update user profile
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(currentUser.id!) },
            data: { name },
            select: {
                id: true,
                email: true,
                name: true,
                updatedAt: true,
            },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        if (error instanceof Error && error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.error('Failed to update profile:', error)

        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        )
    }
}
