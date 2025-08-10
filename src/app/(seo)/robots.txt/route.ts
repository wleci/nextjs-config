import { NextResponse } from 'next/server'

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`

    return new NextResponse(robots, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
