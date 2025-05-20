/**
 * Dynamic Environment Configuration for Synaptiq
 *
 * This utility provides environment-specific configuration based on the current hostname.
 * It automatically detects whether the application is running in development, staging, or production.
 */

export type Environment = "development" | "staging" | "production"

export interface FeatureFlags {
  enableQuantumSimulations: boolean
  enableAdvancedMath: boolean
  enableBetaFeatures: boolean
  enablePythonExecutor: boolean
  enableOfflineMode: boolean
}

export interface EnvironmentConfig {
  environment: Environment
  apiBaseUrl: string
  baseUrl: string
  featureFlags: FeatureFlags
  analyticsEnabled: boolean
  debugMode: boolean
}

/**
 * Determines the current environment based on hostname or environment variables
 */
function determineEnvironment(): Environment {
  // Check if we're in a browser context
  const hostname = typeof window !== "undefined" ? window.location.hostname : process.env.VERCEL_URL || "localhost"

  // Determine environment based on hostname
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return "development"
  } else if (hostname.includes("staging") || hostname.includes("preview") || hostname.includes("test")) {
    return "staging"
  } else {
    return "production"
  }
}

/**
 * Gets feature flags based on environment and existing environment variables
 */
function getFeatureFlags(environment: Environment): FeatureFlags {
  // Base feature flags that can be overridden by environment variables
  const baseFlags: FeatureFlags = {
    enableQuantumSimulations: environment !== "production",
    enableAdvancedMath: environment !== "production",
    enableBetaFeatures: environment !== "production",
    enablePythonExecutor: environment !== "production",
    enableOfflineMode: true,
  }

  // Use the existing NEXT_PUBLIC_FEATURE_FLAG environment variable
  const featureFlagValue = process.env.NEXT_PUBLIC_FEATURE_FLAG

  // Override with environment variables if they exist
  return {
    enableQuantumSimulations: featureFlagValue === "quantum" || baseFlags.enableQuantumSimulations,
    enableAdvancedMath: featureFlagValue === "math" || baseFlags.enableAdvancedMath,
    enableBetaFeatures: featureFlagValue === "beta" || baseFlags.enableBetaFeatures,
    enablePythonExecutor: featureFlagValue === "python" || baseFlags.enablePythonExecutor,
    enableOfflineMode: featureFlagValue !== "online-only" && baseFlags.enableOfflineMode,
  }
}

/**
 * Gets the base URL for the current environment
 */
function getBaseUrl(environment: Environment): string {
  // Use existing environment variable if available
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  // Fallback values based on environment
  switch (environment) {
    case "development":
      return "http://localhost:3000"
    case "staging":
      return "https://staging.synaptiq.example.com"
    case "production":
      return "https://synaptiq.example.com"
    default:
      return "http://localhost:3000"
  }
}

/**
 * Gets the API base URL for the current environment
 */
function getApiBaseUrl(environment: Environment, baseUrl: string): string {
  // Use existing environment variable if available
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL
  }

  // Also check for the alternative API URL format
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }

  // Fallback to baseUrl + /api
  return `${baseUrl}/api`
}

/**
 * Returns the complete environment configuration
 */
export function getDynamicEnv(): EnvironmentConfig {
  const environment = determineEnvironment()
  const baseUrl = getBaseUrl(environment)
  const apiBaseUrl = getApiBaseUrl(environment, baseUrl)
  const featureFlags = getFeatureFlags(environment)

  return {
    environment,
    baseUrl,
    apiBaseUrl,
    featureFlags,
    analyticsEnabled: environment === "production",
    debugMode: environment !== "production",
  }
}

/**
 * Checks if a specific feature is enabled
 */
export function isFeatureEnabled(featureName: keyof FeatureFlags): boolean {
  const { featureFlags } = getDynamicEnv()
  return featureFlags[featureName]
}

/**
 * Gets the current environment name
 */
export function getEnvironmentName(): Environment {
  return getDynamicEnv().environment
}

/**
 * Checks if the application is running in development mode
 */
export function isDevelopment(): boolean {
  return getDynamicEnv().environment === "development"
}

/**
 * Checks if the application is running in production mode
 */
export function isProduction(): boolean {
  return getDynamicEnv().environment === "production"
}

/**
 * Gets the API base URL
 */
export function getApiUrl(): string {
  return getDynamicEnv().apiBaseUrl
}
