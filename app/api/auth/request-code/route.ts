import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateOTP, storeOTP } from "@/lib/auth/otp-service"
import { otpRateLimiter } from "@/lib/auth/otp-rate-limiter"
import { getOTPEmailTemplate } from "@/lib/auth/email-templates"
import { transporter } from "@/lib/mail"
import { logger } from "@/lib/logger"

// Email validation schema
const requestSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const result = requestSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Invalid request", details: result.error.format() }, { status: 400 })
    }

    const { email } = result.data

    // Check rate limit
    const rateLimit = await otpRateLimiter(req, email)
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many requests",
          details: "Please wait before requesting another code",
          retryAfter: rateLimit.reset,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.reset.toString(),
          },
        },
      )
    }

    // Generate and store OTP
    const otp = generateOTP()
    await storeOTP(email, otp)

    // Send email
    const { subject, text, html } = getOTPEmailTemplate(otp)
    await transporter.sendMail({
      from: '"Synaptiq" <auth@synaptiq.ai>',
      to: email,
      subject,
      text,
      html,
    })

    // Log the event (but not the actual OTP)
    logger.info(`OTP requested for ${email}`, {
      event: "auth:otp:requested",
      email,
      ip: req.headers.get("x-forwarded-for") || "unknown",
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Verification code sent" }, { status: 200 })
  } catch (error) {
    logger.error("Error in OTP request", { error })
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
