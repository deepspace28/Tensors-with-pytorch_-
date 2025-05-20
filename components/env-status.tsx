"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function EnvStatus() {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})
  const [apiStatus, setApiStatus] = useState<{ available: boolean; message: string }>({
    available: false,
    message: "Checking...",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only collect non-sensitive public environment variables
    const publicEnvVars = {
      API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG,
      DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
    }

    setEnvVars(publicEnvVars)

    // Check API status without exposing sensitive information
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setApiStatus({
          available: data.status === "ok",
          message: data.status === "ok" ? "API services available" : "API services unavailable",
        })
      })
      .catch(() => {
        setApiStatus({
          available: false,
          message: "Could not connect to API",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          Environment Configuration
          {loading ? (
            <Badge variant="outline" className="ml-2">
              Loading...
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
              Loaded
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Current environment variables available to the client</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center border-b pb-2">
              <div className="font-mono text-sm">NEXT_PUBLIC_{key}</div>
              <div className="flex items-center">
                {value ? (
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{value}</span>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center">
                    <XCircle className="h-3 w-3 mr-1" />
                    Not Set
                  </Badge>
                )}
              </div>
            </div>
          ))}

          {/* API Status indicator */}
          <div className="flex justify-between items-center border-b pb-2">
            <div className="font-mono text-sm">API Status</div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className={`flex items-center ${
                  apiStatus.available
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {apiStatus.available ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                {apiStatus.message}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Security Note:</p>
            <p>
              All environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser and visible to users.
              Never put sensitive credentials in public variables.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
