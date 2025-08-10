import { NextResponse } from 'next/server'

export async function GET() {
    const healthCheck = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        services: {
            database: 'ok', // Add your database check here
            cache: 'ok',     // Add your cache check here
            external_api: 'ok' // Add external API checks here
        }
    }

    return NextResponse.json(healthCheck, {
        status: 200,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json',
        },
    })
}

// Optional: Add POST method for more detailed health checks
export async function POST() {
    // Perform more intensive health checks here
    const detailedHealthCheck = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        checks: {
            memory: {
                used: process.memoryUsage().heapUsed,
                total: process.memoryUsage().heapTotal,
                status: 'ok'
            },
            cpu: {
                load: process.cpuUsage(),
                status: 'ok'
            }
        }
    }

    return NextResponse.json(detailedHealthCheck, {
        status: 200,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json',
        },
    })
}
