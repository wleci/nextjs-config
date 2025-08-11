import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(request: Request) {
    try {
        // Get current authenticated user
        const currentUser = await getCurrentUser()

        const body = await request.json()
        const { currentPassword, newPassword } = body

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            )
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters long' },
                { status: 400 }
            )
        }

        // Get user with password from database
        const user = await prisma.user.findUnique({
            where: { id: parseInt(currentUser.id!) },
            select: {
                id: true,
                password: true,
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            )
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12)

        // Update password in database
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedNewPassword },
        })

        return NextResponse.json({ message: 'Password updated successfully' })
    } catch (error) {
        if (error instanceof Error && error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.error('Failed to update password:', error)

        return NextResponse.json(
            { error: 'Failed to update password' },
            { status: 500 }
        )
    }
}
