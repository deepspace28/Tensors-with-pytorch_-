import { NextResponse } from "next/server"
import { searchCache } from "@/lib/search-cache"

// Mock data for search analytics
// In a real app, this would be stored in a database
const searchAnalytics = {
  totalSearches: 127,
  apiCalls: 42,
  cacheHits: 85,
  queries: [
    { text: "quantum computing", count: 23, lastSearched: new Date().toISOString() },
    { text: "schrödinger equation", count: 18, lastSearched: new Date().toISOString() },
    { text: "quantum entanglement", count: 15, lastSearched: new Date().toISOString() },
    { text: "quantum mechanics", count: 12, lastSearched: new Date().toISOString() },
    { text: "heisenberg uncertainty principle", count: 9, lastSearched: new Date().toISOString() },
  ],
}

export async function GET() {
  try {
    // Get cache statistics
    const cacheStats = searchCache.getStats()

    // Calculate cache hit rate
    const cacheHitRate =
      searchAnalytics.totalSearches > 0
        ? Math.round((searchAnalytics.cacheHits / searchAnalytics.totalSearches) * 100)
        : 0

    // Return analytics data
    return NextResponse.json({
      totalSearches: searchAnalytics.totalSearches,
      apiCalls: searchAnalytics.apiCalls,
      cacheHits: searchAnalytics.cacheHits,
      cacheHitRate,
      topQueries: searchAnalytics.queries,
      cacheSize: cacheStats.size,
      cacheMemoryUsage: `~${Math.round(cacheStats.size * 5)}KB`, // Rough estimate
      recentlyCachedQueries: cacheStats.keys.slice(0, 10),
    })
  } catch (error) {
    console.error("Error fetching search analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
