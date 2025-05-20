import { type NextRequest, NextResponse } from "next/server"
import { searchCache } from "@/lib/search-cache"

// Fallback search data for when the API is unavailable
const fallbackSearchData = {
  "quantum mechanics":
    "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
  "quantum computing":
    "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations. The devices that perform quantum computations are known as quantum computers.",
  // ... other fallback data entries
}

// Function to generate a fallback search response based on the query
function generateFallbackSearchResponse(query: string): string {
  const normalizedQuery = query.toLowerCase().trim()

  // Check if we have a direct match in our fallback data
  for (const [key, value] of Object.entries(fallbackSearchData)) {
    if (normalizedQuery.includes(key)) {
      return value
    }
  }

  // If no direct match, return a generic response about quantum science
  return "I couldn't find specific information about that query. Synaptiq specializes in quantum mechanics, physics simulations, and advanced mathematical modeling. Our AI models are trained on scientific literature and can assist with research in these domains. Try asking about quantum computing, physics equations, or mathematical theorems."
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query } = body

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 })
    }

    console.log(`Processing search query: "${query}"`)

    // Normalize the query for caching
    const normalizedQuery = query.toLowerCase().trim()
    const cacheKey = `ddg:${normalizedQuery}`

    // Check cache first
    const cachedResult = searchCache.get(cacheKey)
    if (cachedResult) {
      console.log(`Cache hit for query: "${query}"`)
      return NextResponse.json({
        text: formatSearchResults(query, cachedResult),
        source: "cache",
      })
    }

    // Attempt to use the DuckDuckGo API directly (no proxy)
    try {
      // Call DuckDuckGo API directly from the server
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

      // Process and enhance the response
      const enhancedData = enhanceSearchResults(data, query)

      // Cache the result
      searchCache.set(cacheKey, enhancedData)

      console.log(`Successfully fetched results for query: "${query}"`)

      // Format the search results
      const formattedResults = formatSearchResults(query, enhancedData)

      return NextResponse.json({
        text: formattedResults,
        source: "api",
      })
    } catch (error: any) {
      console.error(`DuckDuckGo API error: ${error.message}`)

      // Fall back to local data if DuckDuckGo API fails
      console.log(`Falling back to local data for query: "${query}"`)
      return NextResponse.json({
        text: generateFallbackSearchResponse(query),
        source: "fallback",
      })
    }
  } catch (error: any) {
    console.error(`Unexpected error in search route: ${error.message}`)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
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

// Enhanced formatter for search results
function formatSearchResults(query: string, data: any): string {
  // If no meaningful data, use fallback
  if (!data || (!data.abstract && (!data.relatedTopics || data.relatedTopics.length === 0) && !data.answer)) {
    return generateFallbackSearchResponse(query)
  }

  let formattedResults = `# Search Results for: "${query}"\n\n`

  // Add direct answer if available
  if (data.answer) {
    formattedResults += `## Answer\n${data.answer}\n\n`
  }

  // Add the main abstract if available
  if (data.abstract) {
    formattedResults += `## ${data.heading || "Overview"}\n\n${data.abstract}\n\n`
    if (data.abstractURL) {
      formattedResults += `Source: [${data.abstractSource || data.heading || "Learn more"}](${data.abstractURL})\n\n`
    }
  }

  // Add infobox data if available
  if (data.infobox && data.infobox.content && data.infobox.content.length > 0) {
    formattedResults += `## Quick Facts\n\n`

    data.infobox.content.slice(0, 6).forEach((item: any) => {
      formattedResults += `- **${item.label}**: ${item.plainValue || item.value}\n`
    })

    formattedResults += `\n`
  }

  // Add definition if available
  if (data.definition) {
    formattedResults += `## Definition\n\n${data.definition}\n\n`
    if (data.definitionURL) {
      formattedResults += `Source: [${data.definitionSource || "Definition source"}](${data.definitionURL})\n\n`
    }
  }

  // Add related topics if available
  if (data.relatedTopics && data.relatedTopics.length > 0) {
    formattedResults += `## Related Topics\n\n`

    data.relatedTopics.slice(0, 5).forEach((topic: any, index: number) => {
      if (topic.text) {
        formattedResults += `${index + 1}. ${topic.text}\n`
        if (topic.url) {
          formattedResults += `   [Learn more](${topic.url})\n\n`
        }
      }
    })
  }

  // Add image if available
  if (data.image) {
    formattedResults += `\n![${data.heading || query}](${data.image})\n\n`
  }

  return formattedResults
}
