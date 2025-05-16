"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchResult {
  title: string
  description: string
  url: string
  section: string
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mock search data - in a real implementation, this would be a larger dataset or API call
  const searchIndex: SearchResult[] = [
    {
      title: "NeuroSymbolic Engine",
      description: "Integration of reasoning and ML",
      url: "/docs/core-concepts/neurosymbolic-engine",
      section: "Core Concepts",
    },
    {
      title: "Theory Graphs",
      description: "Representation of evolving hypotheses",
      url: "/docs/core-concepts/theory-graphs",
      section: "Core Concepts",
    },
    {
      title: "REST API",
      description: "Core REST API endpoints for interacting with Synaptiq",
      url: "/docs/api/rest",
      section: "API Reference",
    },
    {
      title: "GraphQL API",
      description: "Flexible GraphQL interface for complex queries",
      url: "/docs/api/graphql",
      section: "API Reference",
    },
    {
      title: "Installation & Setup",
      description: "Set up your environment and install dependencies",
      url: "/docs/installation",
      section: "Quickstart",
    },
    {
      title: "Cloud Deployment",
      description: "Deploy Synaptiq on managed cloud infrastructure",
      url: "/docs/deployment/cloud",
      section: "Deployment",
    },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])

  useEffect(() => {
    if (query.length > 2) {
      // Simple search algorithm - in a real implementation, use a more sophisticated approach
      const filtered = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  function handleResultClick(url: string) {
    router.push(url)
    setIsSearching(false)
    setQuery("")
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search documentation..."
          className="w-full rounded-md border border-gray-800 bg-gray-900 py-2 pl-8 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsSearching(true)}
        />
        {query && (
          <button
            className="absolute right-2 top-2.5"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {isSearching && (results.length > 0 || query.length > 2) && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-80 overflow-auto rounded-md border border-gray-800 bg-black shadow-lg">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((result, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-900">
                  <button className="w-full text-left" onClick={() => handleResultClick(result.url)}>
                    <div className="flex flex-col">
                      <span className="text-white">{result.title}</span>
                      <span className="text-xs text-gray-400">
                        {result.section} • {result.description}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-400">No results found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}
