'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// ✅ Dynamic import with SSR disabled — fixes the Leaflet "window is not defined" error
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

type Shipment = {
  id: string;
  no_resi: string;
  nama_pengirim: string;
  nama_penerima: string;
  kota_asal: string;
  kota_tujuan: string;
  jenis_barang: string;
  berat_barang: number;
  harga_tarif: number;
  jenis_pengiriman: string;
  status_pengiriman: 'Diproses' | 'Dalam Pengiriman' | 'Sampai Tujuan' | 'Pending' | 'Selesai';
  tanggal_kirim: string;
  kode_penerbangan?: string;
  maskapai?: string;
  deskripsi?: string;
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Diproses':        'bg-yellow-100 text-yellow-700',
    'Dalam Pengiriman':'bg-blue-100 text-blue-700',
    'Sampai Tujuan':   'bg-green-100 text-green-700',
    'Pending':         'bg-orange-100 text-orange-700',
    'Selesai':         'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

export default function StatusKargoPage() {
  const [time, setTime] = useState('');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(`${formatted} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch shipments from database
  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: '50' });
        if (filterStatus) params.set('status', filterStatus);
        if (search) params.set('query', search);
        const res = await fetch(`/api/shipments?${params.toString()}`);
        const json = await res.json();
        setShipments(json.data || []);
      } catch (err) {
        console.error('Gagal mengambil data shipments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, [filterStatus, search]);

  // Summary counts
  const counts = {
    'Diproses':         shipments.filter(s => s.status_pengiriman === 'Diproses').length,
    'Dalam Pengiriman': shipments.filter(s => s.status_pengiriman === 'Dalam Pengiriman').length,
    'Sampai Tujuan':    shipments.filter(s => s.status_pengiriman === 'Sampai Tujuan').length,
    'Pending':          shipments.filter(s => s.status_pengiriman === 'Pending').length,
    'Selesai':          shipments.filter(s => s.status_pengiriman === 'Selesai').length,
  };

  // Map-ready data — only active shipments (non-Selesai)
  const mapFlights = shipments
    .filter(s => s.kota_asal && s.kota_tujuan)
    .map(s => ({
      no: s.no_resi,
      rute: `${s.kota_asal}→${s.kota_tujuan}`,
      status: s.status_pengiriman,
    }));

  const statusOptions: Array<'Diproses' | 'Dalam Pengiriman' | 'Sampai Tujuan' | 'Pending' | 'Selesai'> = [
    'Diproses', 'Dalam Pengiriman', 'Sampai Tujuan', 'Pending', 'Selesai',
  ];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Status Shipment & Peta Rute
        </h1>
        <div className='flex items-center gap-3'>
          <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
          </span>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            AS
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {statusOptions.map((s) => {
          const colorMap: Record<string, string> = {
            'Diproses':         'border-yellow-400 bg-yellow-50 text-yellow-700',
            'Dalam Pengiriman': 'border-blue-400 bg-blue-50 text-blue-700',
            'Sampai Tujuan':    'border-green-400 bg-green-50 text-green-700',
            'Pending':          'border-orange-400 bg-orange-50 text-orange-700',
            'Selesai':          'border-gray-300 bg-gray-50 text-gray-600',
          };
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
              className={`rounded-xl border-2 p-3 text-center cursor-pointer transition hover:opacity-80 ${colorMap[s]} ${filterStatus === s ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
            >
              <div className="text-2xl font-bold">{counts[s]}</div>
              <div className="text-xs font-semibold mt-0.5">{s}</div>
            </button>
          );
        })}
      </div>

      {/* MAP */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="font-bold text-gray-700 text-sm mb-3">
          Peta Rute Kargo Aktif
        </h2>
        <MapComponent flights={mapFlights} />
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Diproses
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Dalam Pengiriman
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Sampai Tujuan
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            Pending
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Selesai
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-b border-gray-100 gap-3">
          <h2 className="font-bold text-gray-800">
            Status Pengiriman
            {filterStatus && (
              <span className="ml-2 text-sm font-normal text-blue-600">
                — Filter: {filterStatus}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            {/* Search */}
            <input
              type="text"
              placeholder="Cari no resi, pengirim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-300 w-48"
            />
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Memuat data...</div>
        ) : shipments.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">Tidak ada data pengiriman.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-3 text-left">No Resi</th>
                <th className="px-5 py-3 text-left">Pengirim</th>
                <th className="px-5 py-3 text-left">Penerima</th>
                <th className="px-5 py-3 text-left">Rute</th>
                <th className="px-5 py-3 text-left">Berat</th>
                <th className="px-5 py-3 text-left">Tarif</th>
                <th className="px-5 py-3 text-left">Tgl Kirim</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr key={s.id || i} className="border-t hover:bg-blue-50/40 transition">
                  <td className="px-5 py-3 font-bold text-blue-600 font-mono text-xs">{s.no_resi}</td>
                  <td className="px-5 py-3">{s.nama_pengirim}</td>
                  <td className="px-5 py-3">{s.nama_penerima}</td>
                  <td className="px-5 py-3 font-mono text-xs">{s.kota_asal} → {s.kota_tujuan}</td>
                  <td className="px-5 py-3">{s.berat_barang} kg</td>
                  <td className="px-5 py-3">{formatRupiah(s.harga_tarif)}</td>
                  <td className="px-5 py-3 text-xs">
                    {new Date(s.tanggal_kirim).toLocaleDateString('id-ID', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={s.status_pengiriman} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
