import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isAuthenticated = !!req.auth

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && pathname.startsWith('/auth/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Check if the request is for the dashboard
    if (pathname.startsWith('/dashboard')) {
        // Check if user is authenticated
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*']
}
