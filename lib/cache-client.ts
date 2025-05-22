import MemoryCache from "./memory-cache"

// Create a singleton cache client that falls back to memory cache if Redis fails
let cacheClient: MemoryCache

function createCacheClient() {
  if (cacheClient) return cacheClient

  // Always use memory cache for now to avoid Redis connection issues
  console.log("Using in-memory cache for stability")
  cacheClient = new MemoryCache()
  return cacheClient
}

// Export the cache client
export default function getCacheClient() {
  if (!cacheClient) {
    cacheClient = createCacheClient()
  }
  return cacheClient
}
