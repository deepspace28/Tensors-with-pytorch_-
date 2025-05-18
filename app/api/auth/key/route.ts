import { NextResponse } from "next/server"

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// This is a simplified example - in a real app, you would implement proper authentication
export async function GET() {
  // Check if the request is authenticated
  // In a real app, you would check for a valid session or token
  const isAuthenticated = true

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders })
  }

  // Get the API key from environment variables
  const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500, headers: corsHeaders })
  }

  // Return the API key
  // In a real app, you might want to encrypt this or use a more secure method
  return NextResponse.json({ key: apiKey }, { status: 200, headers: corsHeaders })
}
