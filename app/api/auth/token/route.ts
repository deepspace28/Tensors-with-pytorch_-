import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

// This endpoint generates a short-lived token for client-side API access
export async function GET() {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Create a token that expires in 15 minutes
    const token = sign(
      {
        // Don't include the actual API key in the token payload
        exp: Math.floor(Date.now() / 1000) + 15 * 60, // 15 minutes
      },
      process.env.JWT_SECRET,
    )

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
