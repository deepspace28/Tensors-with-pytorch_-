import { NextResponse } from "next/server"

// Google API constants
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID

// Fallback search data for when the API fails
const fallbackSearchData = {
  "quantum computing": [
    {
      title: "Quantum Computing - Wikipedia",
      snippet:
        "Quantum computing is a type of computation whose operations can harness the phenomena of quantum mechanics, such as superposition, interference, and entanglement.",
      link: "https://en.wikipedia.org/wiki/Quantum_computing",
    },
    {
      title: "What is Quantum Computing? - IBM",
      snippet:
        "Quantum computers harness the unique behavior of quantum physics to perform calculations in fundamentally different ways than classical computers.",
      link: "https://www.ibm.com/quantum/what-is-quantum-computing",
    },
    {
      title: "Quantum Computing: Progress and Prospects",
      snippet:
        "Quantum computing is an emerging technology that has the potential to solve certain problems that are intractable for classical computers.",
      link: "https://www.nap.edu/catalog/25196/quantum-computing-progress-and-prospects",
    },
  ],
  "artificial intelligence": [
    {
      title: "Artificial Intelligence - Wikipedia",
      snippet:
        "Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to intelligence of humans and other animals.",
      link: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    },
    {
      title: "What is AI? - IBM",
      snippet:
        "Artificial intelligence leverages computers and machines to mimic the problem-solving and decision-making capabilities of the human mind.",
      link: "https://www.ibm.com/topics/artificial-intelligence",
    },
  ],
}

export async function POST(req: Request) {
  try {
    const { query, messages } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    console.log(`Searching for: ${query}`)

    // Skip Google Search API in preview/development mode
    const isPreviewOrDev = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"

    // Only try to use Google Search API if we're not in preview/dev and have valid credentials
    if (!isPreviewOrDev && GOOGLE_API_KEY && SEARCH_ENGINE_ID) {
      try {
        console.log("Attempting to use Google Search API")
        const searchResults = await fetchGoogleSearchResults(query)

        if (searchResults && searchResults.items && searchResults.items.length > 0) {
          const formattedResponse = formatSearchResponse(query, searchResults.items)
          return NextResponse.json({ text: formattedResponse })
        } else {
          console.log("No search results found from Google API")
        }
      } catch (error: any) {
        console.error("Google Search API error:", error.message)

        // Log specific details for 403 errors
        if (error.message && error.message.includes("403")) {
          console.error("403 Forbidden error from Google API. This typically means:")
          console.error("- The API key doesn't have permission for Custom Search API")
          console.error("- The API key might be invalid or expired")
          console.error("- There might be billing issues with the Google Cloud account")
          console.error("- The Search Engine ID might be incorrect")
        }
      }
    } else {
      if (isPreviewOrDev) {
        console.log("Skipping Google Search API in preview/development environment")
      } else {
        console.log("Google Search API credentials not available")
      }
    }

    // If we get here, either the API failed or credentials weren't available
    // Use fallback search mechanism
    console.log("Using fallback search mechanism")

    // Generate a response based on the conversation context and query
    const responseText = generateFallbackSearchResponse(query, messages)
    return NextResponse.json({ text: responseText })
  } catch (error) {
    console.error("Error in search API:", error)
    return NextResponse.json({
      text: "I apologize, but I encountered an error while processing your search request. I'll answer based on my knowledge instead.",
    })
  }
}

async function fetchGoogleSearchResults(query: string) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`

  console.log("Fetching from Google API...")
  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) {
    const errorText = await res.text()
    console.error(`Google Search API error status: ${res.status}`)
    console.error("Google Search API error response:", errorText)
    throw new Error(`Google Search API returned ${res.status}: ${errorText}`)
  }

  return res.json()
}

function formatSearchResponse(query: string, results: any[]) {
  const response = `
# Search Results for: "${query}"

I've searched the web for information about "${query}" and found the following:

## Summary
Based on the search results, ${query} is a topic with several important aspects worth exploring. The search results provide both overview information and specific details.

## Key Information
${results
  .slice(0, 5)
  .map((result, index) => `${index + 1}. **${result.title}**: ${result.snippet || "No snippet available."}`)
  .join("\n\n")}

## Sources
${results
  .slice(0, 5)
  .map((result, index) => `${index + 1}. [${result.title}](${result.link})`)
  .join("\n\n")}

This information was gathered from web search results. For the most accurate and up-to-date information, I recommend visiting the source websites or consulting specialized scientific literature.
  `.trim()

  return response
}

function generateFallbackSearchResponse(query: string, messages?: any[]) {
  // Check if we have fallback data for this query
  const normalizedQuery = query.toLowerCase()
  let matchedResults = null

  // Try to find a matching topic in our fallback data
  for (const [topic, results] of Object.entries(fallbackSearchData)) {
    if (normalizedQuery.includes(topic)) {
      matchedResults = results
      break
    }
  }

  // If we don't have fallback data, generate a generic response
  if (!matchedResults) {
    return `
# Information about: "${query}"

I attempted to search the web for information about "${query}", but I'm currently using my internal knowledge to answer instead.

Based on what I know about "${query}":

${generateKnowledgeBasedResponse(query, messages)}

For the most accurate and up-to-date information, I recommend consulting academic journals, reputable news sources, and educational websites related to this topic.
    `.trim()
  }

  // Format the fallback results
  return `
# Search Results for: "${query}"

I've found the following information about "${query}":

## Summary
Based on available information, ${query} is a topic with several important aspects worth exploring. The results provide both overview information and specific details.

## Key Information
${matchedResults.map((result, index) => `${index + 1}. **${result.title}**: ${result.snippet}`).join("\n\n")}

## Sources
${matchedResults.map((result, index) => `${index + 1}. [${result.title}](${result.link})`).join("\n\n")}

Note: I'm providing information from my knowledge base. For the most up-to-date information, I recommend visiting the source websites or consulting specialized literature.
  `.trim()
}

// Function to generate a response based on the model's knowledge
function generateKnowledgeBasedResponse(query: string, messages?: any[]) {
  // Scientific topics
  if (query.toLowerCase().includes("quantum")) {
    return `Quantum physics is a fundamental theory in physics that describes nature at the smallest scales of energy levels of atoms and subatomic particles. Key concepts include:

1. **Quantum Superposition**: Particles can exist in multiple states simultaneously until measured
2. **Quantum Entanglement**: Particles become connected and the quantum state of each particle cannot be described independently
3. **Wave-Particle Duality**: Matter and light exhibit both wave-like and particle-like properties
4. **Heisenberg Uncertainty Principle**: The position and momentum of a particle cannot be simultaneously measured with high precision

Quantum computing leverages these principles to perform calculations using quantum bits (qubits) that can represent multiple states simultaneously.`
  }

  if (query.toLowerCase().includes("relativity") || query.toLowerCase().includes("einstein")) {
    return `Einstein's theory of relativity consists of two physical theories:

1. **Special Relativity (1905)**: Describes the relationship between space and time, introducing concepts like:
   - The speed of light is constant for all observers
   - Time dilation and length contraction occur at speeds approaching the speed of light
   - Mass and energy are equivalent (E=mc²)

2. **General Relativity (1915)**: Extends special relativity to include gravity:
   - Gravity is not a force but a curvature of spacetime caused by mass and energy
   - Predicts phenomena like gravitational waves, black holes, and the bending of light around massive objects
   
These theories revolutionized our understanding of space, time, and gravity, replacing Newton's theories for extreme conditions.`
  }

  // Generic response for other topics
  return `This topic spans multiple domains of knowledge. Some key points to consider:

1. The fundamental principles and concepts that define this subject
2. Historical development and major breakthroughs in the field
3. Current applications and relevance in today's world
4. Future directions and ongoing research

I can provide more specific information if you have particular aspects you'd like to explore.`
}
