// Simple in-memory cache for search results
type CacheEntry = {
  data: any
  timestamp: number
}

class SearchCache {
  private cache: Map<string, CacheEntry> = new Map()
  private readonly TTL: number // Time to live in milliseconds

  constructor(ttlMinutes = 60) {
    this.TTL = ttlMinutes * 60 * 1000
  }

  // Get cached result if available and not expired
  get(key: string): any | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if the entry has expired
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  // Store result in cache
  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  // Clear expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.TTL) {
        this.cache.delete(key)
      }
    }
  }

  // Get cache stats
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }
}

// Export a singleton instance
export const searchCache = new SearchCache()
