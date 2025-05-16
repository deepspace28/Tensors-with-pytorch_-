const SYSTEM_PROMPT = `You are a scientific experiment compiler. Given a freeform experiment request, return:

A title

Governing equations (in LaTeX)

Input parameters (name, label, default, min, max, unit)

A formula or dataset for graphing

Chart type (line, scatter, 3D)

A 3-5 sentence explanation of the result
Respond in strict JSON format.`

export async function generateSimulation(prompt: string) {
  try {
    // Use only the server-side environment variable
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      throw new Error("GROQ API key is not defined")
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the JSON response
    try {
      // Sometimes the API returns JSON with markdown code blocks, so we need to extract it
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```([\s\S]*?)```/)
      const jsonString = jsonMatch ? jsonMatch[1] : content

      return JSON.parse(jsonString)
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError)
      console.log("Raw response:", content)

      // Fallback to a simple simulation if parsing fails
      return {
        title: "Simple Pendulum Simulation",
        equations: ["\\theta(t) = \\theta_0 \\cos(\\omega t)", "\\omega = \\sqrt{\\frac{g}{L}}"],
        parameters: [
          {
            name: "length",
            label: "Pendulum Length (L)",
            default: 1,
            min: 0.1,
            max: 5,
            unit: "m",
          },
          {
            name: "gravity",
            label: "Gravity (g)",
            default: 9.8,
            min: 1,
            max: 20,
            unit: "m/s²",
          },
          {
            name: "initialAngle",
            label: "Initial Angle (θ₀)",
            default: 30,
            min: 0,
            max: 90,
            unit: "°",
          },
        ],
        chartType: "line",
        explanation:
          "This simulation shows the motion of a simple pendulum. The period of oscillation depends on the length of the pendulum and the gravitational acceleration. For small angles, the motion is approximately simple harmonic.",
      }
    }
  } catch (error) {
    console.error("Error generating simulation:", error)
    throw error
  }
}
