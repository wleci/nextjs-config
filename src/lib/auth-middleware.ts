import { NextResponse } from 'next/server'
import { auth } from '@/auth'

/**
 * Middleware helper to check authentication for API routes
 * Returns null if authenticated, or error response if not
 */
export async function checkAuth() {
    try {
        const session = await auth()

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        return null // No error, user is authenticated
    } catch (error) {
        console.error('Auth check failed:', error)
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        )
    }
}

/**
 * Get current user session
 * Returns session or throws error
 */
export async function getCurrentUser() {
    try {
        const session = await auth()

        if (!session || !session.user) {
            throw new Error('Not authenticated')
        }

        return session.user
    } catch {
        // Don't log authentication errors as they're expected when testing
        throw new Error('Not authenticated')
    }
}
