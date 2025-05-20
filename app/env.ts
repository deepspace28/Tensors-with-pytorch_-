// This file only contains safe, non-sensitive environment variables
// All API keys and sensitive data should be accessed only from server components or API routes

export const env = {
  // Public, non-sensitive environment variables only
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  featureFlag: process.env.NEXT_PUBLIC_FEATURE_FLAG === "true",
}

// IMPORTANT: Never access sensitive API keys from this file
// Instead, create server-side API routes that use the keys securely
