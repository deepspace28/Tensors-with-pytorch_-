/**
 * A simple in-memory cache implementation as a fallback when Redis is unavailable
 */
class MemoryCache {
  private cache: Map<string, { value: any; expiry: number | null }> = new Map()

  async get(key: string): Promise<any> {
    const item = this.cache.get(key)

    if (!item) return null

    // Check if item has expired
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const expiry = ttl ? Date.now() + ttl * 1000 : null
    this.cache.set(key, { value, expiry })
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key)
  }

  async ttl(key: string): Promise<number> {
    const item = this.cache.get(key)
    if (!item || !item.expiry) return -1

    const ttl = Math.floor((item.expiry - Date.now()) / 1000)
    return ttl > 0 ? ttl : -1
  }

  async incr(key: string): Promise<number> {
    const item = this.cache.get(key)
    let value = 1

    if (item) {
      value = (typeof item.value === "number" ? item.value : 0) + 1
      this.cache.set(key, { value, expiry: item.expiry })
    } else {
      this.cache.set(key, { value, expiry: null })
    }

    return value
  }

  async expire(key: string, seconds: number): Promise<void> {
    const item = this.cache.get(key)
    if (item) {
      this.cache.set(key, {
        value: item.value,
        expiry: Date.now() + seconds * 1000,
      })
    }
  }
}

export default MemoryCache
