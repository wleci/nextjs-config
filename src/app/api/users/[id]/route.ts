import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const currentUser = await getCurrentUser()

        const { id } = await params
        const userId = parseInt(id)
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
        }

        // Users can only view their own profile or if they're admin
        const isOwnProfile = parseInt(currentUser.id!) === userId
        const isAdmin = currentUser.email === 'admin@example.com' // Simple admin check

        if (!isOwnProfile && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
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

        console.error('Failed to fetch user:', error)

        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        const currentUser = await getCurrentUser()

        // Only admin can delete users
        const isAdmin = currentUser.email === 'admin@example.com'
        if (!isAdmin) {
            return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 })
        }

        const { id } = await params
        const userId = parseInt(id)
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
        }

        // Don't allow admin to delete themselves
        if (parseInt(currentUser.id!) === userId) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Delete user
        await prisma.user.delete({
            where: { id: userId },
        })

        return NextResponse.json({
            message: 'User deleted successfully',
            deletedUser: user
        })
    } catch (error) {
        if (error instanceof Error && error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.error('Failed to delete user:', error)

        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        )
    }
}
