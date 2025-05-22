import { Skeleton } from "@/components/ui/skeleton"

export default function BetaLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center mb-8">
          <Skeleton className="h-8 w-8 mr-2 bg-gray-800" />
          <Skeleton className="h-8 w-40 bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="h-[600px] w-full bg-gray-800" />
          </div>
          <div>
            <Skeleton className="h-[400px] w-full bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
