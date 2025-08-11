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
        const isAdmin = currentUser.role === 'ADMIN'

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

export async function PUT(
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

        // Users can only edit their own profile or if they're admin
        const isOwnProfile = parseInt(currentUser.id!) === userId
        const isAdmin = currentUser.role === 'ADMIN'

        if (!isOwnProfile && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await request.json()
        const { name, email } = body

        // Validate input
        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
        }

        // Check if email is already taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
                NOT: { id: userId }
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name || null,
                email: email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        if (error instanceof Error && error.message === 'Not authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.error('Failed to update user:', error)

        return NextResponse.json(
            { error: 'Failed to update user' },
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
        if (currentUser.role !== 'ADMIN') {
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
