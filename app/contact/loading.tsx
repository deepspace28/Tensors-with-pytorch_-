export default function ContactLoading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-800 rounded w-1/3 mb-6"></div>
        <div className="h-4 bg-gray-800 rounded w-2/3 mb-8"></div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-6 bg-gray-800 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
              <div className="h-6 bg-gray-800 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-5 w-5 bg-gray-800 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="h-6 bg-gray-800 rounded w-1/2 mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-800 rounded w-full"></div>
                </div>
              ))}
              <div className="h-10 bg-gray-800 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
