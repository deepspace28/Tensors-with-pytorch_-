import { SearchTest } from "@/components/search-test"
import { SearchAnalytics } from "@/components/search-analytics"

export default function SearchTestPage() {
  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Search Functionality Test</h1>
      <p className="text-gray-500">
        This page allows you to test the DuckDuckGo search integration with all improvements: adjusted parameters,
        enhanced response parsing, CORS proxy, and caching.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SearchTest />
        <SearchAnalytics />
      </div>
    </div>
  )
}
