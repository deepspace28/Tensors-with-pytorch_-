import { type NextRequest, NextResponse } from "next/server"
import { withCors } from "@/lib/cors"

async function handler(req: NextRequest) {
  // Log the request for debugging
  console.log("Test API called")
  console.log("Headers:", JSON.stringify(Object.fromEntries(req.headers.entries())))

  // Return a simple success response
  return NextResponse.json({ success: true, message: "API is working" })
}

// Export the handler with CORS middleware
export const POST = withCors(handler)
export const GET = withCors(handler)
