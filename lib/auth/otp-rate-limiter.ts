import Redis from "ioredis"
import type { NextRequest } from "next/server"

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

// Rate limit configuration
const OTP_REQUEST_LIMIT = 1 // 1 request per minute per email
const OTP_REQUEST_WINDOW = 60 // 1 minute in seconds

export async function otpRateLimiter(req: NextRequest, email: string) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  const key = `otp-rate-limit:${email}:${ip}`

  try {
    // Get current count
    const current = await redis.get(key)
    const currentCount = current ? Number.parseInt(current, 10) : 0

    if (currentCount >= OTP_REQUEST_LIMIT) {
      return {
        success: false,
        limit: OTP_REQUEST_LIMIT,
        remaining: 0,
        reset: await redis.ttl(key),
      }
    }

    // Increment count
    await redis.incr(key)

    // Set expiry if this is the first request in the window
    if (currentCount === 0) {
      await redis.expire(key, OTP_REQUEST_WINDOW)
    }

    // Get TTL
    const ttl = await redis.ttl(key)

    return {
      success: true,
      limit: OTP_REQUEST_LIMIT,
      remaining: OTP_REQUEST_LIMIT - (currentCount + 1),
      reset: ttl,
    }
  } catch (error) {
    console.error("OTP rate limiter error:", error)
    // If Redis fails, allow the request but log the error
    return {
      success: true,
      limit: OTP_REQUEST_LIMIT,
      remaining: 1,
      reset: OTP_REQUEST_WINDOW,
    }
  }
}
