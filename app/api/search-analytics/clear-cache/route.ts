import { NextResponse } from "next/server"
import { clearSearchCache } from "@/lib/search-cache"

export async function POST() {
  try {
    await clearSearchCache()
    return NextResponse.json({ success: true, message: "Search cache cleared successfully" })
  } catch (error: any) {
    console.error("Error clearing search cache:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
