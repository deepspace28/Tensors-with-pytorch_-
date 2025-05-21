// Environment variables utility
// This file provides type-safe access to environment variables

// Server-side environment variables
export const serverEnv = {
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  MONGODB_URI: process.env.MONGODB_URI || "",
  REDIS_URL: process.env.REDIS_URL || "",
  PYTHON_API_URL: process.env.PYTHON_API_URL || "",
  PYTHON_API_KEY: process.env.PYTHON_API_KEY || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret_for_development",
  ZOHO_USER: process.env.ZOHO_USER || "",
  ZOHO_APP_PASSWORD: process.env.ZOHO_APP_PASSWORD || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID || "",
  SYNAPTIQ_API_KEY: process.env.SYNAPTIQ_API_KEY || "",
}

// Client-side environment variables
export const clientEnv = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG || "",
  PYTHON_API_URL: process.env.NEXT_PUBLIC_PYTHON_API_URL || "",
  GROQ_API_KEY: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
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

// Check if we're in demo mode - ALWAYS RETURN FALSE
export function isDemoMode() {
  return false // Force to always return false
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
