"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDynamicEnv } from "@/lib/dynamic-env"
import { Check, X, RefreshCw, Info } from "lucide-react"

export function EnvironmentDisplay() {
  const [config, setConfig] = useState(getDynamicEnv())

  const refreshConfig = () => {
    setConfig(getDynamicEnv())
  }

  const getEnvironmentColor = () => {
    switch (config.environment) {
      case "development":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "staging":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "production":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get existing environment variables
  const existingEnvVars = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "Not set",
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "Not set",
    NEXT_PUBLIC_FEATURE_FLAG: process.env.NEXT_PUBLIC_FEATURE_FLAG || "Not set",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "Not set",
    NEXT_PUBLIC_GROQ_API_KEY: process.env.NEXT_PUBLIC_GROQ_API_KEY ? "Set (hidden)" : "Not set",
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>Current environment and feature flags</CardDescription>
        </div>
        <Badge className={`text-xs px-3 py-1 ${getEnvironmentColor()}`}>{config.environment}</Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Feature Flags</TabsTrigger>
            <TabsTrigger value="urls">URLs</TabsTrigger>
            <TabsTrigger value="env">Environment Variables</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Environment</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{config.environment}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Debug Mode</p>
                <p className="flex items-center">
                  {config.debugMode ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {config.debugMode ? "Enabled" : "Disabled"}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Analytics</p>
                <p className="flex items-center">
                  {config.analyticsEnabled ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {config.analyticsEnabled ? "Enabled" : "Disabled"}
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Detected Hostname</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {typeof window !== "undefined" ? window.location.hostname : "Server-side rendering"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <div className="space-y-4">
              {Object.entries(config.featureFlags).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">{key}</span>
                  </div>
                  <Badge
                    variant={value ? "default" : "outline"}
                    className={
                      value
                        ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                        : ""
                    }
                  >
                    {value ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="urls" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Base URL</p>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">{config.baseUrl}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">API Base URL</p>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">{config.apiBaseUrl}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="env" className="space-y-4 mt-4">
            <div className="space-y-4">
              {Object.entries(existingEnvVars).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <p className="text-sm font-medium">{key}</p>
                  <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">{value}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm" onClick={refreshConfig} className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
