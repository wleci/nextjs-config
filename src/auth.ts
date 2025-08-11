import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("🔐 Auth attempt for:", credentials?.email)

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Missing credentials")
                    return null
                }

                try {
                    // Find user in database
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email as string
                        }
                    })

                    if (!user) {
                        console.log("❌ User not found:", credentials.email)
                        return null
                    }

                    console.log("✅ User found:", user.email, "Role:", user.role)

                    // Verify password with bcrypt
                    if (!user.password) {
                        console.log("❌ User has no password set")
                        return null
                    }

                    const isValidPassword = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    )

                    if (!isValidPassword) {
                        console.log("❌ Invalid password for:", user.email)
                        return null
                    }

                    console.log("✅ Password valid, logging in:", user.email)
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }
                } catch (error) {
                    console.error("❌ Auth error:", error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id || ""
                session.user.role = token.role || "USER"
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    cookies: {
        sessionToken: {
            name: "wleci.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        callbackUrl: {
            name: "wleci.callback-url",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        csrfToken: {
            name: "wleci.csrf-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
})
