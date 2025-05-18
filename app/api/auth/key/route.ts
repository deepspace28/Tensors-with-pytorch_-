import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"

// This endpoint provides the API key only to authenticated requests
export async function GET(req: Request) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    // Verify the token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    try {
      verify(token, process.env.JWT_SECRET)
    } catch (error) {
      console.error("Invalid token:", error)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Check if GROQ_API_KEY is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Return the API key
    return NextResponse.json({ key: process.env.GROQ_API_KEY })
  } catch (error) {
    console.error("Error in /api/auth/key:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
