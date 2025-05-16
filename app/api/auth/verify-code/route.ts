import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyOTP, generateToken } from "@/lib/auth/otp-service"
import { logger } from "@/lib/logger"

// Verification schema
const verifySchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "Code must be 6 digits"),
})

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const result = verifySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.format() }, { status: 400 })
    }

    const { email, code } = result.data

    // Verify OTP
    const isValid = await verifyOTP(email, code)

    if (!isValid) {
      // Log failed attempt
      logger.warn(`Failed OTP verification for ${email}`, {
        event: "auth:otp:verification:failed",
        email,
        ip: req.headers.get("x-forwarded-for") || "unknown",
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({ error: "Invalid or expired code" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken(email)

    // Create user object
    const user = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "admin" : "researcher",
      profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${email.split("@")[0]}`,
    }

    // Log successful verification
    logger.info(`Successful OTP verification for ${email}`, {
      event: "auth:otp:verification:success",
      email,
      ip: req.headers.get("x-forwarded-for") || "unknown",
      timestamp: new Date().toISOString(),
    })

    // Return token and user data
    return NextResponse.json(
      {
        success: true,
        token,
        user,
        expiresIn: 3600, // 1 hour in seconds
      },
      { status: 200 },
    )
  } catch (error) {
    logger.error("Error in OTP verification", { error })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
