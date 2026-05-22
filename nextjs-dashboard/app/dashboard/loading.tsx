const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

function StatCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden bg-white rounded-xl p-5 shadow-sm border-l-4 border-gray-200`}>
      <div className="h-3 w-32 rounded bg-gray-200 mb-3" />
      <div className="h-8 w-16 rounded bg-gray-200" />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr className="border-t border-gray-50">
      <td className="px-5 py-3"><div className="h-4 w-28 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-32 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-28 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-16 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-12 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-4 w-16 rounded bg-gray-100" /></td>
      <td className="px-5 py-3"><div className="h-5 w-16 rounded-full bg-gray-100" /></td>
    </tr>
  );
}

function FlightCardSkeleton() {
  return (
    <div className="p-4 border-b border-r border-gray-50">
      <div className="flex items-center justify-between mb-2">
        <div className="h-3 w-28 rounded bg-gray-100" />
        <div className="h-5 w-16 rounded-full bg-gray-100" />
      </div>
      <div className="flex items-center justify-between mb-1">
        <div className="h-5 w-10 rounded bg-gray-200" />
        <div className="h-3 w-4 rounded bg-gray-100" />
        <div className="h-5 w-10 rounded bg-gray-200" />
      </div>
      <div className="h-3 w-36 rounded bg-gray-100 mt-2" />
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-52 rounded-lg bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 rounded-lg bg-gray-200" />
          <div className="h-11 w-44 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Manifest Table */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <div className="h-5 w-52 rounded bg-gray-200 mb-1" />
            <div className="h-3 w-28 rounded bg-gray-100" />
          </div>
          <div className="h-6 w-14 rounded-full bg-gray-100" />
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {['No AWB','Pengirim','Penerima','Rute','Berat','Penerbangan','Status'].map(h => (
                <th key={h} className="px-5 py-3 text-left">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.from({ length: 7 }).map((_, i) => <TableRowSkeleton key={i} />)}
          </tbody>
        </table>
      </div>

      {/* Flight Status */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="h-5 w-48 rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <FlightCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
