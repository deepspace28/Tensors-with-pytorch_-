import { randomInt } from "crypto"
import Redis from "ioredis"
import { sign } from "jsonwebtoken"

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

// OTP configuration
const OTP_EXPIRY = 10 * 60 // 10 minutes in seconds
const OTP_LENGTH = 6
const MAX_VERIFICATION_ATTEMPTS = 5
const JWT_SECRET = process.env.JWT_SECRET || "synaptiq-development-secret"
const JWT_EXPIRY = "1h" // 1 hour

// Generate a random numeric OTP of specified length
export function generateOTP(length = OTP_LENGTH): string {
  // Generate a random number with the specified number of digits
  const min = Math.pow(10, length - 1)
  const max = Math.pow(10, length) - 1
  return randomInt(min, max).toString()
}

// Store OTP in Redis with expiry
export async function storeOTP(email: string, otp: string): Promise<void> {
  const key = `otp:${email}`

  // Store OTP with attempts counter
  await redis.hset(key, "otp", otp, "attempts", "0")
  await redis.expire(key, OTP_EXPIRY)
}

// Verify OTP and handle attempts
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const key = `otp:${email}`

  // Check if OTP exists
  const storedOTP = await redis.hget(key, "otp")
  if (!storedOTP) {
    return false // OTP not found or expired
  }

  // Check attempts
  const attempts = Number.parseInt((await redis.hget(key, "attempts")) || "0", 10)
  if (attempts >= MAX_VERIFICATION_ATTEMPTS) {
    await redis.del(key) // Delete OTP after max attempts
    return false
  }

  // Increment attempts
  await redis.hincrby(key, "attempts", 1)

  // Verify OTP
  if (storedOTP === otp) {
    await redis.del(key) // Delete OTP after successful verification
    return true
  }

  return false
}

// Generate JWT token
export function generateToken(email: string): string {
  return sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

// Verify JWT token
export function verifyToken(token: string): { email: string } | null {
  try {
    const decoded = sign.verify(token, JWT_SECRET) as { email: string }
    return decoded
  } catch (error) {
    return null
  }
}
