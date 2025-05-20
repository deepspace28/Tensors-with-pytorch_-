import { type NextRequest, NextResponse } from "next/server"
import { searchCache } from "@/lib/search-cache"

// This endpoint acts as a proxy for DuckDuckGo API to avoid CORS issues
export async function GET(req: NextRequest) {
  try {
    // Get query from URL parameters
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get("q")

    // Validate query
    if (!query || typeof query !== "string" || query.trim() === "") {
      return NextResponse.json({ error: "Valid query is required" }, { status: 400 })
    }

    // Check cache first
    const cacheKey = `ddg:${query.toLowerCase().trim()}`
    const cachedResult = searchCache.get(cacheKey)

    if (cachedResult) {
      console.log(`Cache hit for query: "${query}"`)
      return NextResponse.json({
        source: "cache",
        data: cachedResult,
      })
    }

    console.log(`Cache miss for query: "${query}", fetching from DuckDuckGo API`)

    // Enhanced parameters for better results
    const url = new URL("https://api.duckduckgo.com/")
    url.searchParams.append("q", query)
    url.searchParams.append("format", "json")
    url.searchParams.append("no_redirect", "1")
    url.searchParams.append("skip_disambig", "1")
    url.searchParams.append("no_html", "1")
    url.searchParams.append("t", "synaptiq") // Custom t parameter to identify our app

    // Make request to DuckDuckGo API
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "Synaptiq Search Bot/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`DuckDuckGo API error: ${response.status}`)
    }

    const data = await response.json()

    // Process and enhance the response
    const enhancedData = enhanceSearchResults(data, query)

    // Cache the result
    searchCache.set(cacheKey, enhancedData)

    return NextResponse.json({
      source: "api",
      data: enhancedData,
    })
  } catch (error: any) {
    console.error(`Search proxy error:`, error)
    return NextResponse.json(
      {
        error: "Failed to fetch search results",
        message: error.message,
      },
      { status: 500 },
    )
  }
}

// Function to enhance and normalize search results
function enhanceSearchResults(data: any, query: string) {
  // Extract the most relevant information
  const result = {
    heading: data.Heading || "",
    abstract: data.AbstractText || "",
    abstractSource: data.AbstractSource || "",
    abstractURL: data.AbstractURL || "",
    image: data.Image ? `https://duckduckgo.com${data.Image}` : null,
    relatedTopics: [],
    infobox: null,
    answer: data.Answer || "",
    answerType: data.AnswerType || "",
    definition: data.Definition || "",
    definitionSource: data.DefinitionSource || "",
    definitionURL: data.DefinitionURL || "",
    query: query,
    timestamp: new Date().toISOString(),
  }

  // Process related topics with better structure
  if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
    result.relatedTopics = data.RelatedTopics.filter((topic: any) => topic.Text && !topic.Name) // Filter out section headers
      .map((topic: any) => ({
        text: topic.Text || "",
        url: topic.FirstURL || "",
        icon: topic.Icon?.URL ? `https://duckduckgo.com${topic.Icon.URL}` : null,
      }))
      .slice(0, 8) // Limit to 8 related topics
  }

  // Extract structured data from Infobox if available
  if (data.Infobox && data.Infobox.content) {
    result.infobox = {
      title: data.Infobox.meta?.title || "",
      content: data.Infobox.content
        .filter((item: any) => item.label && item.value)
        .map((item: any) => ({
          label: item.label,
          value: item.value,
          // Convert wiki codes to plain text
          plainValue: item.value.replace(/\[\[([^\]]+)\]\]/g, "$1"),
        })),
    }
  }

  return result
}
