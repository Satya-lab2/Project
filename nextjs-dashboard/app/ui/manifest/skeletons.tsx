const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

function TableRowSkeleton() {
  return (
    <tr className="border-t border-gray-50">
      <td className="px-5 py-3">
        <div className="h-4 w-28 rounded bg-gray-200" />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 w-32 rounded bg-gray-200" />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 w-32 rounded bg-gray-200" />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 w-20 rounded bg-gray-200" />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 w-12 rounded bg-gray-200" />
      </td>
      <td className="px-5 py-3">
        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </td>
      <td className="px-5 py-3">
        <div className="h-7 w-14 rounded bg-gray-200" />
      </td>
    </tr>
  );
}

export function ShipmentsTableSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-900 text-white text-xs">
            <th className="px-5 py-3 text-left font-semibold">No AWB</th>
            <th className="px-5 py-3 text-left font-semibold">Pengirim</th>
            <th className="px-5 py-3 text-left font-semibold">Penerima</th>
            <th className="px-5 py-3 text-left font-semibold">Layanan</th>
            <th className="px-5 py-3 text-left font-semibold">Berat (kg)</th>
            <th className="px-5 py-3 text-left font-semibold">Status</th>
            <th className="px-5 py-3 text-left font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </tbody>
      </table>
    </div>
  );
}
