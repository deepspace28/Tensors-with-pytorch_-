import { type NextRequest, NextResponse } from "next/server"
import { searchCache } from "@/lib/search-cache"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
    }

    // Normalize the query for caching
    const normalizedQuery = query.toLowerCase().trim()
    const cacheKey = `ddg-raw:${normalizedQuery}`

    // Check cache first
    const cachedResult = await searchCache.get(cacheKey)
    if (cachedResult) {
      console.log(`Cache hit for raw query: "${query}"`)
      return NextResponse.json({ data: cachedResult, source: "cache" })
    }

    // Call DuckDuckGo API
    const encodedQuery = encodeURIComponent(query)
    const apiUrl = `https://api.duckduckgo.com/?q=${encodedQuery}&format=json&no_redirect=1&skip_disambig=1&no_html=1&t=synaptiq`

    console.log(`Fetching from DuckDuckGo API: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Synaptiq Search Bot/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`DuckDuckGo API error: ${response.status}`)
    }

    const data = await response.json()

    // Cache the result
    await searchCache.set(cacheKey, data)

    return NextResponse.json({ data, source: "api" })
  } catch (error: any) {
    console.error("Search proxy error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
