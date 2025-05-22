// Environment variables utility
// This file provides type-safe access to environment variables

// Server-side environment variables
export const serverEnv = {
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  MONGODB_URI: process.env.MONGODB_URI || "",
  REDIS_URL: process.env.REDIS_URL || "",
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

// Check if we're in demo mode
export function isDemoMode() {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true"
}

// Get API key - SERVER SIDE ONLY
// This function should only be called in server components or API routes
export function getApiKey() {
  return serverEnv.GROQ_API_KEY
}

// For backward compatibility
export const ENV = {
  // API URLs
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",

  // Feature flags
  FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG === "true",
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE === "true",

  // API Keys (server-side only)
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  SEARCH_ENGINE_ID: process.env.SEARCH_ENGINE_ID || "",

  // Auth
  JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret_for_development",

  // Redis
  REDIS_URL: process.env.REDIS_URL || "",

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || "",

  // Email
  ZOHO_USER: process.env.ZOHO_USER || "",
  ZOHO_APP_PASSWORD: process.env.ZOHO_APP_PASSWORD || "",
}

// Public environment variables (safe to use on client-side)
export const PUBLIC_ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG === "true",
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
}
