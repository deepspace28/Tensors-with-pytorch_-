import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-12">
        {/* Hero Section Skeleton */}
        <section className="text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </section>

        {/* Our Mission Skeleton */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Skeleton className="h-10 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </section>

        {/* Technology Platform Skeleton */}
        <section className="space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-6 space-y-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Additional Sections Skeleton */}
        {[...Array(3)].map((_, i) => (
          <section key={i} className="space-y-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </section>
        ))}
      </div>
    </div>
  )
}
