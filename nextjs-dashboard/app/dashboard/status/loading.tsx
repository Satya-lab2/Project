const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

function FlightRowSkeleton() {
  return (
    <tr className="border-t">
      {Array.from({ length: 8 }).map((_, j) => (
        <td key={j} className="px-5 py-3">
          <div className="h-4 w-16 rounded bg-gray-100" />
        </td>
      ))}
    </tr>
  );
}

export default function StatusLoading() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-56 rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-11 w-44 rounded-xl bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Map Skeleton */}
      <div className={`${shimmer} relative overflow-hidden bg-white rounded-xl shadow-sm p-4 mb-6`}>
        <div className="h-4 w-52 rounded bg-gray-200 mb-3" />
        <div className="w-full h-72 rounded-lg bg-gray-200" />
        <div className="flex gap-4 mt-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 w-20 rounded bg-gray-100" />
          ))}
        </div>
      </div>

      {/* Table Skeleton dengan search */}
      <div className={`${shimmer} relative overflow-hidden bg-white rounded-xl shadow-sm`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <div className="h-5 w-52 rounded bg-gray-200 mb-1" />
            <div className="h-3 w-32 rounded bg-gray-100" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-14 rounded-full bg-gray-100" />
            <div className="h-6 w-20 rounded-full bg-gray-100" />
          </div>
        </div>
        {/* Search skeleton */}
        <div className="px-5 py-3">
          <div className="h-10 w-full rounded-md bg-gray-200" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {['No Penerbangan','Maskapai','Rute','Total Kargo','ETD','ETA','Status','Aksi'].map(h => (
                <th key={h} className="px-5 py-3 text-left">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.from({ length: 5 }).map((_, i) => <FlightRowSkeleton key={i} />)}
          </tbody>
        </table>
        {/* Pagination skeleton */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <div className="h-3 w-24 rounded bg-gray-100" />
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-md bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
