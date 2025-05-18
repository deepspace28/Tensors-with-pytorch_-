/**
 * Simple rate limiter that doesn't use Redis
 */
export class RateLimiter {
  private limits: Map<string, { count: number; resetTime: number }> = new Map()

  /**
   * Check if a user has exceeded their rate limit
   * @param userId User identifier
   * @param limit Maximum number of requests
   * @param windowMs Time window in milliseconds
   * @returns Whether the user has exceeded their limit
   */
  async isRateLimited(userId: string, limit = 10, windowMs = 60000): Promise<boolean> {
    const now = Date.now()
    const userLimit = this.limits.get(userId)

    // If no existing limit or the window has expired, create a new limit
    if (!userLimit || now > userLimit.resetTime) {
      this.limits.set(userId, {
        count: 1,
        resetTime: now + windowMs,
      })
      return false
    }

    // Increment the count
    userLimit.count++

    // Check if the user has exceeded their limit
    return userLimit.count > limit
  }

  /**
   * Get the number of requests remaining for a user
   * @param userId User identifier
   * @param limit Maximum number of requests
   * @returns Number of requests remaining
   */
  async getRemainingRequests(userId: string, limit = 10): Promise<number> {
    const userLimit = this.limits.get(userId)
    if (!userLimit || Date.now() > userLimit.resetTime) {
      return limit
    }
    return Math.max(0, limit - userLimit.count)
  }
}

// Export a singleton instance
export const rateLimiter = new RateLimiter()
