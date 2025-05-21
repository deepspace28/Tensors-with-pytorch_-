import { type NextRequest, NextResponse } from "next/server"
import getCacheClient from "./cache-client"

// Get the cache client (Redis or memory fallback)
const cacheClient = getCacheClient()

interface RateLimitConfig {
  limit: number
  window: number // in seconds
}

// Different rate limits for different user types
const rateLimits: Record<string, RateLimitConfig> = {
  anonymous: { limit: 10, window: 60 * 60 }, // 10 requests per hour for anonymous users
  free: { limit: 50, window: 60 * 60 }, // 50 requests per hour for free users
  premium: { limit: 200, window: 60 * 60 }, // 200 requests per hour for premium users
}

export async function rateLimiter(
  req: NextRequest,
  userType: "anonymous" | "free" | "premium" = "anonymous",
  userId = "anonymous",
) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  const key = `rate-limit:${userType}:${userId !== "anonymous" ? userId : ip}`

  const config = rateLimits[userType]

  try {
    // Get current count
    const current = await cacheClient.get(key)
    const currentCount = current ? Number.parseInt(current.toString(), 10) : 0

    if (currentCount >= config.limit) {
      return {
        success: false,
        limit: config.limit,
        remaining: 0,
        reset: await cacheClient.ttl(key),
      }
    }

    // Increment count
    await cacheClient.incr(key)

    // Set expiry if this is the first request in the window
    if (currentCount === 0) {
      await cacheClient.expire(key, config.window)
    }

    // Get TTL
    const ttl = await cacheClient.ttl(key)

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - (currentCount + 1),
      reset: ttl,
    }
  } catch (error) {
    console.error("Rate limiter error:", error)
    // If cache fails, allow the request but log the error
    return {
      success: true,
      limit: config.limit,
      remaining: 1,
      reset: config.window,
    }
  }
}

export function getRateLimitResponse(result: Awaited<ReturnType<typeof rateLimiter>>) {
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": result.limit.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": result.reset.toString(),
          "Retry-After": result.reset.toString(),
        },
      },
    )
  }

  return null
}
