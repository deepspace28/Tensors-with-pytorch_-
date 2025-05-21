"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface ResourceLoaderProps {
  url: string
  fallback?: React.ReactNode
  children: (content: string) => React.ReactNode
  onError?: (error: Error) => void
}

export function ResourceLoader({ url, fallback, children, onError }: ResourceLoaderProps) {
  const [content, setContent] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip blob URLs and vusercontent.net URLs
    if (url.startsWith("blob:") || url.includes("vusercontent.net")) {
      console.warn(`Skipping potentially problematic URL: ${url}`)
      setError(new Error(`Resource URL not supported: ${url}`))
      setIsLoading(false)
      if (onError) onError(new Error(`Resource URL not supported: ${url}`))
      return
    }

    async function loadResource() {
      try {
        setIsLoading(true)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to load resource: ${response.status} ${response.statusText}`)
        }
        const text = await response.text()
        setContent(text)
        setError(null)
      } catch (err) {
        console.error(`Error loading resource from ${url}:`, err)
        setError(err as Error)
        if (onError) onError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResource()
  }, [url, onError])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error || !content) {
    return fallback || <div className="text-gray-400 p-4">Failed to load resource</div>
  }

  return <>{children(content)}</>
}
