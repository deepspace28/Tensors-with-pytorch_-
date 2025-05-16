import { NextResponse } from "next/server"
import { testPythonApiConnection } from "@/lib/api-test"

export async function GET() {
  try {
    const result = await testPythonApiConnection()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
