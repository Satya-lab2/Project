const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function KontakLoading() {
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

      {/* Content skeleton */}
      <section className="pt-16 min-h-screen grid md:grid-cols-[35%_65%]">
        {/* Left panel */}
        <div className={`${shimmer} relative overflow-hidden bg-blue-900 px-8 py-16 flex flex-col justify-center`}>
          <div className="h-8 w-40 rounded bg-blue-700 mb-3" />
          <div className="h-4 w-full rounded bg-blue-800 mb-1" />
          <div className="h-4 w-4/5 rounded bg-blue-800 mb-8" />
          <div className="h-5 w-36 rounded bg-blue-700 mb-5" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-700 flex-shrink-0" />
              <div>
                <div className="h-3 w-16 rounded bg-blue-800 mb-1" />
                <div className="h-4 w-36 rounded bg-blue-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Right panel — form */}
        <div className={`${shimmer} relative overflow-hidden bg-white px-10 py-16`}>
          <div className="h-8 w-48 rounded bg-gray-200 mb-2" />
          <div className="h-4 w-64 rounded bg-gray-100 mb-8" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-11 rounded-lg bg-gray-100" />
            <div className="h-11 rounded-lg bg-gray-100" />
          </div>
          <div className="h-11 rounded-lg bg-gray-100 mb-4" />
          <div className="h-28 rounded-lg bg-gray-100 mb-4" />
          <div className="h-12 w-full rounded-xl bg-gray-200" />
        </div>
      </section>
    </main>
  );
}
