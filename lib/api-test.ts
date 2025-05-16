import { logger } from "./logger"

// The URL for the Python backend API
const PYTHON_API_URL = process.env.PYTHON_API_URL || "https://sitebackend-production.up.railway.app/simulate"

/**
 * Tests the connection to the Python API
 */
export async function testPythonApiConnection() {
  try {
    logger.info(`Testing connection to Python API: ${PYTHON_API_URL}`)

    const response = await fetch(PYTHON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Test connection",
        type: "test",
      }),
    })

    logger.info(`Python API test response status: ${response.status}`)

    let data
    try {
      data = await response.json()
      logger.info(`Python API test response: ${JSON.stringify(data)}`)
    } catch (parseError) {
      const text = await response.text()
      logger.error(`Failed to parse test response as JSON. Raw response: ${text.substring(0, 500)}...`)
      return {
        success: false,
        error: "Failed to parse response as JSON",
        rawResponse: text.substring(0, 500),
      }
    }

    return {
      success: response.ok,
      status: response.status,
      data,
    }
  } catch (error) {
    logger.error("Error testing Python API connection:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
