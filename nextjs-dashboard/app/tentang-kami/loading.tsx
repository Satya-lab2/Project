const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function TentangKamiLoading() {
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

      {/* Content */}
      <section className="pt-20 grid md:grid-cols-[30%_70%] min-h-screen w-full">
        {/* Left — dark panel */}
        <div className={`${shimmer} relative overflow-hidden bg-blue-900 px-6 py-10 flex flex-col justify-center`}>
          <div className="h-16 w-28 rounded bg-blue-700 mb-4" />
          <div className="h-3 w-24 rounded bg-blue-600 mb-6" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-blue-800 mb-2" />
          ))}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-blue-800" />
            ))}
          </div>
        </div>

        {/* Right — content */}
        <div className={`${shimmer} relative overflow-hidden bg-white px-10 py-16`}>
          <div className="h-8 w-56 rounded bg-gray-200 mb-3" />
          <div className="h-px w-full bg-gray-100 mb-6" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-gray-100 mb-2" />
          ))}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-gray-100" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
