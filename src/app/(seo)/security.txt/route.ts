import { NextResponse } from 'next/server'

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const securityTxt = `Contact: mailto:security@your-domain.com
Contact: ${baseUrl}/security
Expires: 2025-12-31T23:59:59.000Z
Encryption: ${baseUrl}/pgp-key.txt
Acknowledgments: ${baseUrl}/security/acknowledgments
Policy: ${baseUrl}/security/policy
Hiring: ${baseUrl}/careers

# Security researchers are welcome to report vulnerabilities
# Please include detailed steps to reproduce the issue`

    return new NextResponse(securityTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    })
}
