/**
 * Get the base URL for API requests
 * This handles different environments (development, production, preview)
 */
export function getBaseUrl(): string {
  // Check for NEXT_PUBLIC_BASE_URL environment variable
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")
  }

  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // Use the current origin
    return window.location.origin
  }

  // Fallback for server-side
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
}
