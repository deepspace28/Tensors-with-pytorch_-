import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Comprehensive CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
}

export function middleware(request: NextRequest) {
  console.log("Middleware called for:", request.nextUrl.pathname, "Method:", request.method)

  // Handle OPTIONS requests immediately
  if (request.method === "OPTIONS") {
    console.log("Handling OPTIONS request")
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  // For API routes, add CORS headers
  if (request.nextUrl.pathname.startsWith("/api/")) {
    console.log("Adding CORS headers to API route")

    // Get the response
    const response = NextResponse.next()

    // Add CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  }

  // For other routes, just continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}
