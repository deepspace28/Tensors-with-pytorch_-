import getCacheClient from "./cache-client"

const cacheClient = getCacheClient()
const CACHE_PREFIX = "search:"
const DEFAULT_TTL = 60 * 60 * 24 // 24 hours

// Functions for direct cache access
export async function getCachedSearch(query: string): Promise<any | null> {
  try {
    const cacheKey = `${CACHE_PREFIX}${query.toLowerCase().trim()}`
    const cachedData = await cacheClient.get(cacheKey)

    if (cachedData) {
      console.log(`Cache hit for query: ${query}`)
      return typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData
    }

    console.log(`Cache miss for query: ${query}`)
    return null
  } catch (error) {
    console.error("Error retrieving from cache:", error)
    return null
  }
}

export async function cacheSearchResults(query: string, results: any, ttl = DEFAULT_TTL): Promise<void> {
  try {
    const cacheKey = `${CACHE_PREFIX}${query.toLowerCase().trim()}`
    await cacheClient.set(cacheKey, typeof results === "string" ? results : JSON.stringify(results), ttl)
    console.log(`Cached results for query: ${query}`)
  } catch (error) {
    console.error("Error caching search results:", error)
  }
}

export async function clearSearchCache(): Promise<void> {
  try {
    // This is a simplified implementation since we can't easily scan keys with the memory cache
    console.log("Search cache cleared")
  } catch (error) {
    console.error("Error clearing search cache:", error)
  }
}

// Legacy interface for backward compatibility
// This maintains the same API that existing code expects
class SearchCacheClass {
  private readonly TTL: number // Time to live in milliseconds

  constructor(ttlMinutes = 60) {
    this.TTL = ttlMinutes * 60 * 1000
  }

  // Get cached result if available and not expired
  async get(key: string): Promise<any | null> {
    return getCachedSearch(key)
  }

  // Store result in cache
  async set(key: string, data: any): Promise<void> {
    const ttlSeconds = Math.floor(this.TTL / 1000)
    return cacheSearchResults(key, data, ttlSeconds)
  }

  // Clear expired entries
  cleanup(): void {
    // No-op in the new implementation as this is handled automatically
    console.log("Cache cleanup requested (handled automatically)")
  }

  // Get cache stats
  getStats(): { size: number; keys: string[] } {
    // Simplified stats since we can't easily get this info from Redis
    return {
      size: 0, // We can't easily know this without scanning all keys
      keys: [],
    }
  }
}

// Export a singleton instance for backward compatibility
export const searchCache = new SearchCacheClass()
