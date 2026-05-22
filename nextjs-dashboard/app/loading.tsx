const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function HomeLoading() {
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

      {/* Hero section skeleton */}
      <div className={`${shimmer} relative overflow-hidden min-h-screen flex flex-col items-center justify-center`}
        style={{ background: 'linear-gradient(135deg, #0f2044 0%, #1a3a6e 60%, #2563eb 100%)' }}>
        <div className="text-center">
          <div className="h-3 w-32 rounded bg-blue-700 mx-auto mb-4" />
          <div className="h-14 w-96 rounded-lg bg-blue-700 mx-auto mb-4" />
          <div className="h-5 w-80 rounded bg-blue-800 mx-auto mb-2" />
          <div className="h-5 w-64 rounded bg-blue-800 mx-auto mb-8" />
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-36 rounded-full bg-blue-500" />
            <div className="h-12 w-36 rounded-full bg-blue-800" />
          </div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-10 flex gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 w-16 rounded bg-blue-700 mx-auto mb-1" />
              <div className="h-3 w-24 rounded bg-blue-800 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
