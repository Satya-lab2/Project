const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

function FlightRowSkeleton() {
  return (
    <tr className="border-t">
      <td className="px-5 py-3"><div className="h-4 w-16 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-28 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-20 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-28 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-12 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-12 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-5 w-16 rounded-full bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-7 w-14 rounded bg-gray-100" /></td>
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

      {/* Table Skeleton */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="h-5 w-52 rounded bg-gray-200 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-14 rounded-full bg-gray-100 animate-pulse" />
            <div className="h-6 w-20 rounded-full bg-gray-100 animate-pulse" />
          </div>
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
            {Array.from({ length: 6 }).map((_, i) => <FlightRowSkeleton key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
