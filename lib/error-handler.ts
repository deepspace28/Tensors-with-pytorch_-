import type React from "react"
/**
 * Enhanced error handler for asset loading
 * This utility helps manage asset loading errors and provides fallbacks
 */

// Function to handle image loading errors
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = "/placeholder.svg",
) {
  const target = event.currentTarget

  // Set fallback image
  target.onerror = null // Prevent infinite error loop
  target.src = fallbackSrc

  // Log the error for debugging
  console.warn(`Image failed to load, using fallback: ${fallbackSrc}`)
}

// Function to create a safe image URL
export function getSafeImageUrl(url: string, fallbackUrl = "/placeholder.svg") {
  if (!url || url.includes("blob:") || url.includes("vusercontent.net")) {
    // If URL is empty, a blob URL, or from vusercontent.net, use fallback
    console.warn(`Potentially unsafe image URL detected: ${url}, using fallback`)
    return fallbackUrl
  }

  return url
}

// Function to safely load resources
export async function safeLoadResource(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to load resource: ${response.status} ${response.statusText}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Error loading resource from ${url}:`, error)
    return null
  }
}
