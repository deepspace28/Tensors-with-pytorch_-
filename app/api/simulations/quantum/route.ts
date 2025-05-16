import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

// The URL for the Python backend API
const PYTHON_API_URL = process.env.PYTHON_API_URL || "https://sitebackend-production.up.railway.app/simulate"

export async function POST(request: Request) {
  try {
    const { prompt, parameters = {} } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Missing required parameter: prompt" }, { status: 400 })
    }

    logger.info(`Received quantum simulation request: ${prompt}`)
    logger.info(`Using Python API URL: ${PYTHON_API_URL}`)

    try {
      // Call the Python API directly
      const response = await fetch(PYTHON_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          prompt,
          type: "quantum",
        }),
      })

      // Log the status and headers for debugging
      logger.info(`Python API response status: ${response.status}`)
      logger.info(`Python API response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`)

      // Check content type
      const contentType = response.headers.get("content-type")
      if (contentType && !contentType.includes("application/json")) {
        logger.error(`Received non-JSON response: ${contentType}`)

        // Get the text response for debugging
        const text = await response.text()
        logger.error(`Raw response (first 500 chars): ${text.substring(0, 500)}`)

        // Return a fallback with the error
        return NextResponse.json({
          success: false,
          error: `Received non-JSON response: ${contentType}`,
          rawResponse: text.substring(0, 1000), // Include part of the raw response for debugging
          fallback: {
            summary: "Fallback quantum simulation result (received HTML instead of JSON).",
            equations: ["\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})"],
            insight:
              "This is a fallback result showing what quantum entanglement would look like. The actual simulation encountered an error.",
            chart: {
              labels: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
              values: [0.5, 0, 0, 0.5],
              title: "Fallback Measurement Probabilities",
            },
          },
        })
      }

      // Try to parse the response as JSON
      let data
      try {
        data = await response.json()
        logger.info(`Python API response received: ${JSON.stringify(data).substring(0, 200)}...`)
      } catch (parseError) {
        logger.error("Failed to parse Python API response as JSON:", parseError)

        // Try to get the text response for debugging
        let text = "Could not retrieve response text"
        try {
          text = await response.text()
          logger.error(`Raw response (first 500 chars): ${text.substring(0, 500)}`)
        } catch (textError) {
          logger.error("Failed to get response text:", textError)
        }

        // Return a fallback with the error
        return NextResponse.json({
          success: false,
          error: `Failed to parse response as JSON: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
          rawResponse: text.substring(0, 1000), // Include part of the raw response for debugging
          fallback: {
            summary: "Fallback quantum simulation result (JSON parsing error).",
            equations: ["\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})"],
            insight:
              "This is a fallback result showing what quantum entanglement would look like. The actual simulation encountered an error.",
            chart: {
              labels: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
              values: [0.5, 0, 0, 0.5],
              title: "Fallback Measurement Probabilities",
            },
          },
        })
      }

      if (!response.ok) {
        logger.error(`Python API error: ${response.status} ${response.statusText}`)
        logger.error(`Error response: ${JSON.stringify(data)}`)

        // Return a fallback with the error
        return NextResponse.json({
          success: false,
          error: `Python API request failed with status ${response.status}: ${data.error || "Unknown error"}`,
          fallback: {
            summary: "Fallback quantum simulation result (API error).",
            equations: ["\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})"],
            insight:
              "This is a fallback result showing what quantum entanglement would look like. The actual simulation encountered an error.",
            chart: {
              labels: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
              values: [0.5, 0, 0, 0.5],
              title: "Fallback Measurement Probabilities",
            },
          },
        })
      }

      // Return the data directly
      return NextResponse.json({
        success: true,
        data,
      })
    } catch (error) {
      logger.error("Error calling Python API:", error)

      // Provide a more detailed error message
      return NextResponse.json({
        success: false,
        error: `Failed to run simulation: ${error instanceof Error ? error.message : "Unknown error"}`,
        fallback: {
          summary: "Fallback quantum simulation result (error occurred in actual simulation).",
          equations: ["\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})"],
          insight:
            "This is a fallback result showing what quantum entanglement would look like. The actual simulation encountered an error.",
          chart: {
            labels: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
            values: [0.5, 0, 0, 0.5],
            title: "Fallback Measurement Probabilities",
          },
        },
      })
    }
  } catch (error) {
    logger.error("Error processing quantum simulation request:", error)
    return NextResponse.json({
      success: false,
      error: "Failed to process simulation request",
      details: error instanceof Error ? error.message : "Unknown error",
      fallback: {
        summary: "Fallback quantum simulation result (request processing error).",
        equations: ["\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})"],
        insight:
          "This is a fallback result showing what quantum entanglement would look like. The actual simulation encountered an error.",
        chart: {
          labels: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
          values: [0.5, 0, 0, 0.5],
          title: "Fallback Measurement Probabilities",
        },
      },
    })
  }
}
