import { getBaseUrl } from "./get-base-url"

// Maximum number of retries for API requests
const MAX_RETRIES = 3

/**
 * API client for making requests to our API with retry logic
 */
export const apiClient = {
  async get(path: string, options: RequestInit = {}) {
    return this.request(path, { ...options, method: "GET" })
  },

  async post(path: string, data: any, options: RequestInit = {}) {
    return this.request(path, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    })
  },

  async request(path: string, options: RequestInit, retryCount = 0): Promise<any> {
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}${path}`

    try {
      // Create a timeout for the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: "no-store", // Prevent caching
      })

      // Clear the timeout
      clearTimeout(timeoutId)

      // If the response is not ok, throw an error
      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }

      // Parse the response as JSON
      return await response.json()
    } catch (error) {
      // If we've reached the maximum number of retries, throw the error
      if (retryCount >= MAX_RETRIES) {
        console.error(`Request to ${url} failed after ${MAX_RETRIES} retries:`, error)
        throw error
      }

      // If the error is a timeout or network error, retry the request
      if (
        error instanceof Error &&
        (error.name === "AbortError" || error.message.includes("network") || error.message.includes("failed"))
      ) {
        console.warn(`Request to ${url} failed, retrying (${retryCount + 1}/${MAX_RETRIES}):`, error)

        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000
        await new Promise((resolve) => setTimeout(resolve, delay))

        // Retry the request
        return this.request(path, options, retryCount + 1)
      }

      // For other errors, just throw
      throw error
    }
  },
}
