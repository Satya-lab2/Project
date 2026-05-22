const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function LoginLoading() {
  return (
    <main className="min-h-screen grid md:grid-cols-[45%_55%]">
      {/* Left panel skeleton */}
      <div className={`${shimmer} relative overflow-hidden hidden md:flex flex-col items-center justify-center bg-blue-900 px-10`}>
        <div className="w-24 h-24 rounded-full bg-blue-700 mb-6" />
        <div className="h-8 w-48 rounded bg-blue-700 mb-3" />
        <div className="h-4 w-64 rounded bg-blue-800 mb-2" />
        <div className="h-4 w-56 rounded bg-blue-800" />
      </div>

      {/* Right panel skeleton */}
      <div className={`${shimmer} relative overflow-hidden flex flex-col items-center justify-center bg-white px-10`}>
        <div className="w-full max-w-sm">
          <div className="h-8 w-40 rounded bg-gray-200 mb-2" />
          <div className="h-4 w-56 rounded bg-gray-100 mb-8" />
          <div className="h-4 w-20 rounded bg-gray-200 mb-2" />
          <div className="h-12 w-full rounded-lg bg-gray-100 mb-4" />
          <div className="h-4 w-20 rounded bg-gray-200 mb-2" />
          <div className="h-12 w-full rounded-lg bg-gray-100 mb-6" />
          <div className="h-12 w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
