import { Loader2 } from "lucide-react"

export default function ContactSuccessLoading() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-gray-600">Loading confirmation...</p>
    </div>
  )
}
