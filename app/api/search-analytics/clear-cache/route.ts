import { NextResponse } from "next/server"
import { searchCache } from "@/lib/search-cache"

export async function POST() {
  try {
    // Create a new empty cache (effectively clearing it)
    // @ts-ignore - Accessing private property for demo purposes
    searchCache.cache = new Map()

    return NextResponse.json({ success: true, message: "Cache cleared successfully" })
  } catch (error) {
    console.error("Error clearing search cache:", error)
    return NextResponse.json({ error: "Failed to clear cache" }, { status: 500 })
  }
}
