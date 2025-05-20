// Environment variables utility
// This file provides type-safe access to environment variables

// Server-side environment variables
export const serverEnv = {
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  MONGODB_URI: process.env.MONGODB_URI || "",
  REDIS_URL: process.env.REDIS_URL || "",
  PYTHON_API_URL: process.env.PYTHON_API_URL || "",
}

// Client-side environment variables
export const clientEnv = {
  GROQ_API_KEY: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG || "",
}

// Validate that required environment variables are set
export function validateEnv() {
  const missingVars = []

  // Check server-side variables
  if (!serverEnv.GROQ_API_KEY) {
    missingVars.push("GROQ_API_KEY")
  }

  // Check client-side variables
  if (!clientEnv.API_BASE_URL) {
    missingVars.push("NEXT_PUBLIC_API_BASE_URL")
  }

  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(", ")}`)
    return false
  }

  return true
}

// Get the API base URL with proper fallback
export function getApiBaseUrl() {
  if (clientEnv.API_BASE_URL) {
    return clientEnv.API_BASE_URL
  }

  // Fallback to origin/api if in browser
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api`
  }

  // Default fallback for server-side
  return "http://localhost:3000/api"
}

// Always return false for isDemoMode to disable demo mode completely
export function isDemoMode() {
  return false
}

// Get API key with fallback
export function getApiKey() {
  // First try server-side key
  if (serverEnv.GROQ_API_KEY) {
    return serverEnv.GROQ_API_KEY
  }

  // Then try client-side key
  if (clientEnv.GROQ_API_KEY) {
    return clientEnv.GROQ_API_KEY
  }

  // Return empty string if no key is available
  return ""
}
