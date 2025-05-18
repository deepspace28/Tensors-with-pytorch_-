import { NextResponse } from "next/server"

// CORS headers directly in the route
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  console.log("CORS test OPTIONS request received")
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function GET() {
  console.log("CORS test GET request received")
  return NextResponse.json({ message: "CORS is working correctly!" }, { headers: corsHeaders })
}
