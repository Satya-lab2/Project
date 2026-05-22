'use client';

import { useMemo } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';

const cargoData = [
  { awb: '601-48291034', pengirim: 'PT Sinar Jaya', penerima: 'PT Mitra Surabaya', rute: 'CGK→SUB', berat: '48 kg', penerbangan: 'GA-452', status: 'Arrived' },
  { awb: '601-48291087', pengirim: 'CV Maju Bersama', penerima: 'Toko Bali Indah', rute: 'CGK→DPS', berat: '22 kg', penerbangan: 'GA-716', status: 'Loaded' },
  { awb: '601-48291102', pengirim: 'Toko Elektro Mas', penerima: 'PT Nusa Manado', rute: 'CGK→MDC', berat: '9 kg', penerbangan: 'ID-8821', status: 'Delayed' },
  { awb: '601-48291115', pengirim: 'PT Logistik Prima', penerima: 'CV Makassar Jaya', rute: 'CGK→UPG', berat: '67 kg', penerbangan: 'JT-633', status: 'Arrived' },
  { awb: '601-48291143', pengirim: 'RS Harapan', penerima: 'RS Padang Utama', rute: 'CGK→PDG', berat: '5 kg', penerbangan: 'SJ-220', status: 'Sortation' },
  { awb: '601-48291198', pengirim: 'CV Tekstil Nusantara', penerima: 'PT Palembang Store', rute: 'CGK→PLM', berat: '31 kg', penerbangan: 'GA-904', status: 'AWB Error' },
  { awb: '601-48291207', pengirim: 'PT Agro Makmur', penerima: 'Depot Banjarmasin', rute: 'CGK→BDJ', berat: '88 kg', penerbangan: 'JT-771', status: 'Departed' },
  { awb: '601-48291220', pengirim: 'PT Garuda Logistik', penerima: 'CV Lombok Mandiri', rute: 'CGK→LOP', berat: '14 kg', penerbangan: 'GA-320', status: 'Loaded' },
  { awb: '601-48291235', pengirim: 'Apotek Kimia Farma', penerima: 'RS Kanujoso Balikpapan', rute: 'CGK→BPN', berat: '3 kg', penerbangan: 'JT-950', status: 'Departed' },
  { awb: '601-48291248', pengirim: 'PT Matahari Retail', penerima: 'Toko Ambon Baru', rute: 'CGK→AMQ', berat: '55 kg', penerbangan: 'GA-688', status: 'Sortation' },
  { awb: '601-48291261', pengirim: 'CV Indo Sparepart', penerima: 'PT Tekno Manado', rute: 'CGK→MDC', berat: '28 kg', penerbangan: 'ID-8825', status: 'Arrived' },
  { awb: '601-48291274', pengirim: 'PT Fresh Express', penerima: 'Hotel Nusa Dua Bali', rute: 'CGK→DPS', berat: '11 kg', penerbangan: 'GA-718', status: 'Loaded' },
];

const ITEMS_PER_PAGE = 6;

const statusColors: Record<string, string> = {
  'Arrived': 'bg-green-100 text-green-700',
  'Loaded': 'bg-blue-100 text-blue-700',
  'Delayed': 'bg-orange-100 text-orange-700',
  'Sortation': 'bg-purple-100 text-purple-700',
  'AWB Error': 'bg-red-100 text-red-700',
  'Departed': 'bg-gray-100 text-gray-700',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

export default function CargoTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return cargoData;
    return cargoData.filter(row =>
      row.awb.toLowerCase().includes(q) ||
      row.pengirim.toLowerCase().includes(q) ||
      row.penerima.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q) ||
      row.rute.toLowerCase().includes(q) ||
      row.penerbangan.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-gray-800">Daftar Kargo Masuk Hari Ini</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {filtered.length} dari {cargoData.length} data · Manifest Real-Time
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
          Live
        </span>
      </div>

      {/* Search */}
      <div className="px-5 py-3">
        <div className="relative flex flex-1">
          <label htmlFor="cargo-search" className="sr-only">Search</label>
          <input
            id="cargo-search"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-400"
            placeholder="Cari AWB, pengirim, penerima, rute, status..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={query}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-5 py-3 text-left font-semibold">No AWB</th>
              <th className="px-5 py-3 text-left font-semibold">Pengirim</th>
              <th className="px-5 py-3 text-left font-semibold">Penerima</th>
              <th className="px-5 py-3 text-left font-semibold">Rute</th>
              <th className="px-5 py-3 text-left font-semibold">Berat</th>
              <th className="px-5 py-3 text-left font-semibold">Penerbangan</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-blue-50/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-blue-600 font-semibold text-xs">{row.awb}</td>
                  <td className="px-5 py-3 text-gray-700">{row.pengirim}</td>
                  <td className="px-5 py-3 text-gray-700">{row.penerima}</td>
                  <td className="px-5 py-3 text-gray-600 font-mono text-xs">{row.rute}</td>
                  <td className="px-5 py-3 text-gray-600">{row.berat}</td>
                  <td className="px-5 py-3 text-gray-600 font-semibold">{row.penerbangan}</td>
                  <td className="px-5 py-3"><StatusBadge status={row.status} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-400 text-sm">
                  Tidak ada data yang cocok dengan pencarian &ldquo;{query}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Halaman {safePage} dari {totalPages}
          </p>
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
                  ${page === safePage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
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
