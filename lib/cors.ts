import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Comprehensive CORS headers for all responses
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400", // 24 hours
}

/**
 * Apply CORS headers to a response
 */
export function applyCorsHeaders(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

/**
 * Handle OPTIONS requests for CORS preflight
 */
export function handleCorsOptions(request: NextRequest): NextResponse {
  // Return a 204 No Content response with CORS headers
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

/**
 * Middleware to handle CORS for API routes
 */
export function withCors(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    // Handle OPTIONS requests
    if (request.method === "OPTIONS") {
      return handleCorsOptions(request)
    }

    // Call the handler and apply CORS headers to the response
    const response = await handler(request)
    return applyCorsHeaders(response)
  }
}
