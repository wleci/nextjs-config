import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    // Check if the request is for the dashboard
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        // Check if user is authenticated
        if (!req.auth) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/dashboard/:path*']
}
