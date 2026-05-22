const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function TrackingLoading() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-64 rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-11 w-44 rounded-xl bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Input Card Skeleton */}
      <div className={`${shimmer} relative overflow-hidden bg-white rounded-xl shadow-sm p-6 max-w-2xl`}>
        <div className="h-5 w-48 rounded bg-gray-200 mb-2" />
        <div className="h-4 w-72 rounded bg-gray-100 mb-4" />
        <div className="h-3 w-40 rounded bg-gray-200 mb-2" />
        <div className="h-11 w-full rounded-lg bg-gray-100 mb-4" />
        <div className="h-11 w-full rounded-lg bg-gray-200" />
      </div>

      {/* Result Card Skeleton (muted hint) */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6 max-w-2xl opacity-40">
        <div className="h-6 w-36 rounded bg-gray-200 mb-4" />
        <div className="space-y-2 mb-5">
          <div className="h-4 w-52 rounded bg-gray-100" />
          <div className="h-4 w-48 rounded bg-gray-100" />
          <div className="h-4 w-32 rounded bg-gray-100" />
        </div>
        <div className="h-5 w-40 rounded bg-gray-200 mb-3" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
              <div>
                <div className="h-3 w-12 rounded bg-gray-100 mb-1" />
                <div className="h-4 w-52 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
