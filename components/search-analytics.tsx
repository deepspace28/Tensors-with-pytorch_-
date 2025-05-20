"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simple analytics component to track search usage
export function SearchAnalytics() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/search-analytics")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch search analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Search Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p>Loading analytics data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Search Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-40 gap-4">
            <p>No analytics data available</p>
            <Button onClick={fetchAnalytics}>Refresh Data</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Search Analytics</span>
          <Button variant="outline" size="sm" onClick={fetchAnalytics}>
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="queries">Top Queries</TabsTrigger>
            <TabsTrigger value="cache">Cache Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Total Searches" value={stats.totalSearches} description="All-time search count" />
              <StatCard
                title="Cache Hit Rate"
                value={`${stats.cacheHitRate}%`}
                description="Percentage of cached results"
              />
              <StatCard title="API Calls" value={stats.apiCalls} description="Direct API requests" />
            </div>
          </TabsContent>

          <TabsContent value="queries">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Top Search Queries</h3>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Query</th>
                      <th className="p-2 text-right">Count</th>
                      <th className="p-2 text-right">Last Searched</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topQueries.map((query: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">{query.text}</td>
                        <td className="p-2 text-right">{query.count}</td>
                        <td className="p-2 text-right">{new Date(query.lastSearched).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cache">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Cache Statistics</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await fetch("/api/search-analytics/clear-cache", { method: "POST" })
                    fetchAnalytics()
                  }}
                >
                  Clear Cache
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard title="Cache Size" value={stats.cacheSize} description="Number of cached queries" />
                <StatCard title="Memory Usage" value={stats.cacheMemoryUsage} description="Estimated memory usage" />
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Recently Cached Queries</h4>
                <div className="flex flex-wrap gap-2">
                  {stats.recentlyCachedQueries.map((query: string, i: number) => (
                    <div key={i} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
                      {query}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Helper component for stats
function StatCard({ title, value, description }: { title: string; value: string | number; description: string }) {
  return (
    <div className="border rounded-md p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
  )
}
