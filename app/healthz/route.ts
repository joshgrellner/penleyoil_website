import { NextResponse } from 'next/server';

/**
 * Health check endpoint for monitoring services
 *
 * Usage:
 * - Pingdom, UptimeRobot, or other monitoring services
 * - Load balancer health checks
 * - Kubernetes liveness/readiness probes
 *
 * Returns:
 * - 200 OK with JSON response when healthy
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Penley Oil Website',
      version: '1.0.0'
    },
    { status: 200 }
  );
}

// Also respond to HEAD requests (some monitors use HEAD)
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
