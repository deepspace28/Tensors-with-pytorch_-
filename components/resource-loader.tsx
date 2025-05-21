"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ResourceLoaderProps {
  children: React.ReactNode
}

export function ResourceLoader({ children }: ResourceLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Set a timeout to prevent infinite loading if resources fail to load
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true)
      }
    }, 5000)

    // Mark as loaded when component mounts on client
    setIsLoaded(true)

    return () => clearTimeout(timeout)
  }, [])

  if (error) {
    return (
      <div className="p-4 text-red-400 text-sm">
        <p>Error loading resources: {error}</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white/50" />
      </div>
    )
  }

  return <>{children}</>
}
