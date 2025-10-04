export default function Loading() {
  return (
    <div className="font-sans min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="py-4 border-b border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 py-4 lg:py-8">
          {/* Left Sidebar Skeleton */}
          <aside className="w-full lg:w-80 space-y-4 sticky top-16 sm:top-20 h-fit animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-3 p-2">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2">
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="flex flex-wrap gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <main className="flex-1 min-w-0 max-w-none space-y-6 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 lg:gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </main>

          {/* Right Sidebar Skeleton */}
          <aside className="w-full lg:w-80 space-y-4 sticky top-16 sm:top-20 h-fit animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-8 w-full bg-blue-200 dark:bg-blue-700 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
