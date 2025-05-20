import { logger } from "./logger"

/**
 * Enhances simulation results with insights from the Grok API
 * @param result The simulation result to enhance
 * @param prompt The original user prompt
 * @returns Enhanced simulation result with additional insights
 */
export async function enhanceWithGrokInsights(result: any, prompt: string): Promise<any> {
  try {
    // Use server API route instead of direct API call with client-side key
    const response = await fetch("/api/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result,
        prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(`Insights API returned status ${response.status}`)
    }

    const data = await response.json()

    if (data.insights) {
      // Enhance the original result with insights
      return {
        ...result,
        explanation: result.explanation + "\n\n" + data.insights,
        grokInsights: data.insights,
      }
    }

    return result
  } catch (error) {
    logger.error(`Error in enhanceWithGrokInsights: ${error instanceof Error ? error.message : String(error)}`)
    // Return the original result if enhancement fails
    return result
  }
}
