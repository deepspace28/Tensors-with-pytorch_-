import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get user information from cookies or headers
  const userId = request.cookies.get("userId")?.value || "anonymous"
  const userType = request.cookies.get("userType")?.value || "anonymous"

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add user information to headers for API routes
  requestHeaders.set("x-user-id", userId)
  requestHeaders.set("x-user-type", userType)

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Only run middleware on API routes
export const config = {
  matcher: "/api/:path*",
}
