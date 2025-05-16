import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// Secret key for JWT verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "synaptiq-development-secret")

export async function middleware(request: NextRequest) {
  // Get user information from cookies or headers
  const userId = request.cookies.get("userId")?.value || "anonymous"
  const userType = request.cookies.get("userType")?.value || "anonymous"

  // Get auth token from Authorization header or from localStorage via cookies
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : request.cookies.get("synaptiq-token")?.value

  // Create a new headers object from the incoming request headers
  const requestHeaders = new Headers(request.headers)

  // Add user information to headers for API routes
  requestHeaders.set("x-user-id", userId)
  requestHeaders.set("x-user-type", userType)

  // If we have an auth token, verify and add it to the headers
  if (token) {
    try {
      // Verify the token
      const { payload } = await jwtVerify(token, JWT_SECRET)

      // Add verified user email to headers
      if (payload.email) {
        requestHeaders.set("x-user-email", payload.email as string)
      }

      requestHeaders.set("Authorization", `Bearer ${token}`)
    } catch (error) {
      console.error("Token verification failed:", error)
      // Token is invalid, but we'll let the API handle the response
    }
  }

  // Return response with modified headers
  return NextResponse.next({
    request: {
      // Apply the modified headers
      headers: requestHeaders,
    },
  })
}

// Only run middleware on API routes and auth-required pages
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/profile/:path*", "/lab/:path*"],
}
