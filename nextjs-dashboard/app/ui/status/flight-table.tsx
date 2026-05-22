'use client';

import { useMemo } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';

const flights = [
  { no: 'GA-452', maskapai: 'Garuda Indonesia', rute: 'CGK→SUB', etd: '08:30', eta: '10:15', totalKargo: '842 kg', awb: 18, status: 'On Time' },
  { no: 'GA-716', maskapai: 'Garuda Indonesia', rute: 'CGK→DPS', etd: '11:15', eta: '13:30', totalKargo: '1.240 kg', awb: 34, status: 'Boarding' },
  { no: 'ID-8821', maskapai: 'Batik Air', rute: 'CGK→MDC', etd: '13:00', eta: '17:45', totalKargo: '560 kg', awb: 12, status: 'Delayed +45m' },
  { no: 'JT-633', maskapai: 'Lion Air', rute: 'CGK→UPG', etd: '06:45', eta: '10:10', totalKargo: '1.820 kg', awb: 41, status: 'Departed' },
  { no: 'SJ-220', maskapai: 'Sriwijaya Air', rute: 'CGK→PDG', etd: '14:30', eta: '16:00', totalKargo: '390 kg', awb: 9, status: 'On Time' },
  { no: 'JT-771', maskapai: 'Lion Air', rute: 'CGK→BDJ', etd: '07:20', eta: '10:50', totalKargo: '2.100 kg', awb: 28, status: 'Departed' },
  { no: 'GA-320', maskapai: 'Garuda Indonesia', rute: 'CGK→LOP', etd: '09:00', eta: '11:15', totalKargo: '670 kg', awb: 15, status: 'On Time' },
  { no: 'JT-950', maskapai: 'Lion Air', rute: 'CGK→BPN', etd: '10:45', eta: '14:20', totalKargo: '980 kg', awb: 22, status: 'Boarding' },
];

const ITEMS_PER_PAGE = 5;

const statusMap: Record<string, string> = {
  'On Time': 'bg-green-100 text-green-700',
  'Boarding': 'bg-blue-100 text-blue-700',
  'Delayed +45m': 'bg-orange-100 text-orange-700',
  'Departed': 'bg-gray-100 text-gray-600',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusMap[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
}

export default function FlightTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get('fquery') || '';
  const currentPage = Number(searchParams.get('fpage')) || 1;

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('fpage', '1');
    if (term) {
      params.set('fquery', term);
    } else {
      params.delete('fquery');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('fpage', String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return flights;
    return flights.filter(f =>
      f.no.toLowerCase().includes(q) ||
      f.maskapai.toLowerCase().includes(q) ||
      f.rute.toLowerCase().includes(q) ||
      f.status.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-gray-800">Status Kargo per Penerbangan</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {filtered.length} dari {flights.length} penerbangan
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live
          </span>
          <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold hover:bg-blue-700">
            Export CSV
          </button>
        </div>
      </div>

      <div className="px-5 py-3">
        <div className="relative flex flex-1">
          <label htmlFor="flight-search" className="sr-only">Search penerbangan</label>
          <input
            id="flight-search"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-400"
            placeholder="Cari no penerbangan, maskapai, rute, status..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={query}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="px-5 py-3 text-left">No Penerbangan</th>
            <th className="px-5 py-3 text-left">Maskapai</th>
            <th className="px-5 py-3 text-left">Rute</th>
            <th className="px-5 py-3 text-left">Total Kargo</th>
            <th className="px-5 py-3 text-left">ETD</th>
            <th className="px-5 py-3 text-left">ETA</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? (
            paginated.map((f, i) => (
              <tr key={i} className="border-t hover:bg-blue-50/40 transition">
                <td className="px-5 py-3 font-bold text-blue-600">{f.no}</td>
                <td className="px-5 py-3">{f.maskapai}</td>
                <td className="px-5 py-3 font-mono text-xs">{f.rute}</td>
                <td className="px-5 py-3">{f.totalKargo} / {f.awb} AWB</td>
                <td className="px-5 py-3">{f.etd}</td>
                <td className="px-5 py-3">{f.eta}</td>
                <td className="px-5 py-3"><StatusBadge status={f.status} /></td>
                <td className="px-5 py-3">
                  <button className="bg-blue-900 text-white text-xs px-3 py-1 rounded font-semibold hover:bg-blue-800">
                    Detail
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-sm">
                Tidak ada penerbangan yang cocok dengan pencarian
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">Halaman {safePage} dari {totalPages}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage <= 1}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors
                  ${page === safePage ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
