import { NextResponse } from "next/server"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV || "not set",
    hasGroqKey: !!process.env.GROQ_API_KEY,
    groqKeyLength: process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0,
    tests: {},
  }

  // Test direct Groq API connection
  if (process.env.GROQ_API_KEY) {
    try {
      console.log("Testing direct Groq API connection...")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("https://api.groq.com/openai/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      diagnostics.tests.groqApi = {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      }

      if (response.ok) {
        const data = await response.json()
        diagnostics.tests.groqApi.models = data.data.slice(0, 3).map((m: any) => m.id)
      } else {
        const text = await response.text()
        diagnostics.tests.groqApi.error = text.substring(0, 200) // Truncate long error messages
      }
    } catch (error) {
      diagnostics.tests.groqApi = {
        error: error.message,
        name: error.name,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }
    }
  }

  // Test DNS resolution
  try {
    const dnsPromise = new Promise((resolve, reject) => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        reject(new Error("DNS lookup timed out"))
      }, 5000)

      fetch("https://api.groq.com/", {
        method: "HEAD",
        signal: controller.signal,
      })
        .then(() => {
          clearTimeout(timeoutId)
          resolve(true)
        })
        .catch((err) => {
          clearTimeout(timeoutId)
          reject(err)
        })
    })

    await dnsPromise
    diagnostics.tests.dns = { ok: true }
  } catch (error) {
    diagnostics.tests.dns = {
      ok: false,
      error: error.message,
    }
  }

  // Test network connectivity
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch("https://httpbin.org/get", {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    diagnostics.tests.network = {
      ok: response.ok,
      status: response.status,
    }
  } catch (error) {
    diagnostics.tests.network = {
      ok: false,
      error: error.message,
    }
  }

  return NextResponse.json(diagnostics, {
    headers: corsHeaders,
  })
}
