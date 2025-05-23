"use client"

// Import the analytics components directly
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export function AnalyticsProvider() {
  // Simple client component that renders the analytics components
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
