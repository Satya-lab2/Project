const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function LacakKargoLoading() {
  return (
    <main>
      {/* Navbar skeleton */}
      <div className="fixed w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">
          <div className="flex items-center gap-2">
            <div className="w-40 h-10 rounded bg-gray-200 animate-pulse" />
            <div>
              <div className="h-4 w-36 rounded bg-gray-200 animate-pulse mb-1" />
              <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
          <div className="flex gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            ))}
          </div>
          <div className="h-9 w-36 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Hero section */}
      <div className={`${shimmer} relative overflow-hidden pt-20 min-h-[240px] bg-blue-900 flex flex-col items-center justify-center px-4`}>
        <div className="h-10 w-72 rounded-lg bg-blue-700 mb-3" />
        <div className="h-4 w-96 rounded bg-blue-800 mb-2" />
        <div className="h-4 w-80 rounded bg-blue-800" />
      </div>

      {/* Search box skeleton */}
      <div className="max-w-2xl mx-auto -mt-8 px-4">
        <div className={`${shimmer} relative overflow-hidden bg-white rounded-2xl shadow-xl p-6`}>
          <div className="h-4 w-32 rounded bg-gray-200 mb-2" />
          <div className="flex gap-2">
            <div className="flex-1 h-12 rounded-xl bg-gray-100" />
            <div className="h-12 w-28 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Result card skeleton */}
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <div className={`${shimmer} relative overflow-hidden bg-white rounded-2xl shadow p-6 opacity-40`}>
          {/* Status header */}
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-36 rounded bg-gray-200" />
            <div className="h-6 w-20 rounded-full bg-gray-200" />
          </div>
          {/* Info rows */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-20 rounded bg-gray-100 mb-1" />
                <div className="h-4 w-32 rounded bg-gray-200" />
              </div>
            ))}
          </div>
          {/* Timeline */}
          <div className="h-4 w-40 rounded bg-gray-200 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-200 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-40 rounded bg-gray-200 mb-1" />
                  <div className="h-3 w-56 rounded bg-gray-100" />
                  <div className="h-3 w-36 rounded bg-gray-100 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
