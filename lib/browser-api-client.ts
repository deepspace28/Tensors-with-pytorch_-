import { getBaseUrl } from "./get-base-url"

/**
 * API client specifically designed for browser environments
 * Handles CORS and browser-specific issues
 */
export const browserApiClient = {
  async post(path: string, data: any) {
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}${path}`

    console.log(`Making API request to: ${url}`)

    // First, try with credentials included
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add a random cache-busting header to prevent caching
          "X-Request-ID": Math.random().toString(36).substring(2, 15),
        },
        body: JSON.stringify(data),
        mode: "cors", // Explicitly set CORS mode
        credentials: "include", // Include credentials
        cache: "no-store", // Prevent caching
      })

      if (response.ok) {
        return await response.json()
      }

      console.warn(`Request failed with status: ${response.status}`)
      const errorText = await response.text()
      console.warn(`Error response: ${errorText}`)

      // If we get a 401 or 403, try without credentials
      if (response.status === 401 || response.status === 403) {
        throw new Error("Authentication failed, trying without credentials")
      }

      throw new Error(`API error: ${response.status}`)
    } catch (error) {
      console.warn(`First attempt failed: ${error.message}`)

      // Second attempt: try without credentials
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Request-ID": Math.random().toString(36).substring(2, 15),
          },
          body: JSON.stringify(data),
          mode: "cors",
          credentials: "omit", // Explicitly omit credentials
          cache: "no-store",
        })

        if (response.ok) {
          return await response.json()
        }

        const errorText = await response.text()
        throw new Error(`API error: ${response.status} - ${errorText}`)
      } catch (secondError) {
        console.error(`Second attempt failed: ${secondError.message}`)

        // Third attempt: try with no-cors mode (limited functionality)
        try {
          // Note: no-cors mode will not return JSON, so we can't parse the response
          // This is mostly for diagnostic purposes
          await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain", // no-cors only supports simple headers
            },
            body: JSON.stringify(data),
            mode: "no-cors",
            cache: "no-store",
          })

          // If we get here, the request didn't throw, but we can't access the response
          // Return a fallback response
          return {
            text: "I'm sorry, but I'm having trouble connecting to the server. Please try again later.",
          }
        } catch (thirdError) {
          console.error(`Third attempt failed: ${thirdError.message}`)
          throw new Error("All API request attempts failed")
        }
      }
    }
  },
}
