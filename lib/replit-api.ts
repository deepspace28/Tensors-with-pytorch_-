import { logger } from "./logger"

// Use the provided backend URL
const BACKEND_API_URL = process.env.PYTHON_API_URL || "https://sitebackend-production.up.railway.app/simulate"

/**
 * Makes a request to the backend API for simulations
 */
export async function callBackendAPI(prompt: string, type: string, parameters: Record<string, any> = {}) {
  try {
    logger.info(`Calling backend API for ${type} simulation: ${prompt}`)
    logger.info(`Using API URL: ${BACKEND_API_URL}`)

    const requestBody = {
      prompt,
      type,
      ...(Object.keys(parameters).length > 0 ? { parameters } : {}),
    }

    logger.info(`Request body: ${JSON.stringify(requestBody)}`)

    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      logger.error(`Backend API error: ${response.status} ${response.statusText}`)
      logger.error(`Error response: ${JSON.stringify(data)}`)
      throw new Error(`Backend API request failed with status ${response.status}: ${data.error || "Unknown error"}`)
    }

    logger.info(`Backend API response received for ${type} simulation`)
    return data
  } catch (error) {
    logger.error(`Error calling backend API for ${type} simulation:`, error)
    throw error
  }
}
