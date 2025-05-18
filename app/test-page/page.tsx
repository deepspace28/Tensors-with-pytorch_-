export default function TestPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Test Page</h1>
      <p className="text-lg mb-4">This is a simple test page to verify that the build process is working correctly.</p>
      <div className="p-4 bg-gray-100 rounded-md">
        <p>If you can see this page, the build was successful!</p>
        <p className="mt-2">
          Environment variable test:{" "}
          {process.env.NEXT_PUBLIC_FEATURE_FLAG ? "Feature flag is enabled" : "Feature flag is disabled"}
        </p>
      </div>
    </div>
  )
}
