import { fetchFilteredShipments } from '@/app/lib/data';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Selesai: 'bg-green-100 text-green-700',
    Expired: 'bg-red-100 text-red-700',
    Proses: 'bg-blue-100 text-blue-700',
    'Dalam Perjalanan': 'bg-yellow-100 text-yellow-700',
  };
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}
    >
      {status}
    </span>
  );
}

export default async function ShipmentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const shipments = await fetchFilteredShipments(query, currentPage);

  return (
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
      <tbody>
        {shipments.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center py-8 text-gray-400">
              Tidak ada data shipment ditemukan
            </td>
          </tr>
        ) : (
          shipments.map((s: any, i: number) => (
            <tr
              key={s.id ?? i}
              className="border-t border-gray-50 hover:bg-blue-50/40 transition-colors"
            >
              <td className="px-5 py-3 font-semibold text-blue-600 text-xs font-mono">
                {s.no_awb}
              </td>
              <td className="px-5 py-3 text-gray-700">{s.pengirim}</td>
              <td className="px-5 py-3 text-gray-700">{s.penerima}</td>
              <td className="px-5 py-3 text-gray-600 text-xs">{s.layanan}</td>
              <td className="px-5 py-3 text-gray-600 text-xs">{s.berat_kg}</td>
              <td className="px-5 py-3">
                <StatusBadge status={s.status} />
              </td>
              <td className="px-5 py-3">
                <button className="bg-blue-900 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-800 transition-colors">
                  Detail
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
