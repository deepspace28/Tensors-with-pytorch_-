import Redis from "ioredis"
import MemoryCache from "./memory-cache"

// Create a singleton cache client that falls back to memory cache if Redis fails
let cacheClient: Redis | MemoryCache

function createCacheClient() {
  if (cacheClient) return cacheClient

  try {
    // Try to create Redis client
    if (process.env.REDIS_URL) {
      const redisOptions = {
        enableReadyCheck: true,
        maxRetriesPerRequest: 3,
        retryStrategy: (times: number) => {
          // Exponential backoff with max 3 seconds
          return Math.min(times * 100, 3000)
        },
      }

      const redis = new Redis(process.env.REDIS_URL, redisOptions)

      // Handle connection errors
      redis.on("error", (err) => {
        console.warn("Redis connection error, falling back to memory cache:", err.message)
        if (!cacheClient || cacheClient instanceof Redis) {
          cacheClient = new MemoryCache()
        }
      })

      // Test connection
      redis
        .ping()
        .then(() => {
          console.log("Redis connection successful")
          cacheClient = redis
        })
        .catch(() => {
          console.warn("Redis ping failed, using memory cache")
          cacheClient = new MemoryCache()
        })

      return redis
    }
  } catch (error) {
    console.warn("Failed to initialize Redis, using memory cache:", error)
  }

  // Fallback to memory cache
  console.log("Using in-memory cache (no Redis URL provided)")
  return new MemoryCache()
}

// Export the cache client
export default function getCacheClient() {
  if (!cacheClient) {
    cacheClient = createCacheClient()
  }
  return cacheClient
}
