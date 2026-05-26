'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, EyeIcon } from '@heroicons/react/24/outline';

type Pesawat = {
  id: string;
  nama_pesawat: string;
  kode_penerbangan: string;
  maskapai: string;
  kota_asal: string;
  kota_tujuan: string;
  kapasitas_muatan: number;
  status_pesawat: string;
  jumlah_awb: number;
  total_berat: number;
};

type AWB = {
  id: string;
  no_resi: string;
  nama_pengirim: string;
  nama_penerima: string;
  jenis_barang: string;
  berat_barang: number;
  status_pengiriman: string;
};

const STATUS_COLORS: Record<string, string> = {
  'Tersedia': 'bg-green-100 text-green-700',
  'Terbang': 'bg-blue-100 text-blue-700',
  'Maintenance': 'bg-red-100 text-red-700',
};

const AWB_STATUS_COLORS: Record<string, string> = {
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
};

export default function FlightTable() {
  const [pesawat, setPesawat] = useState<Pesawat[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [awbList, setAwbList] = useState<AWB[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailPesawat, setDetailPesawat] = useState<Pesawat | null>(null);

  const fetchPesawat = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pesawat');
      const data = await res.json();
      setPesawat(data.data || []);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPesawat(); }, [fetchPesawat]);

  async function openDetail(p: Pesawat) {
    setDetailPesawat(p);
    setDetailId(p.id);
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/pesawat/${p.id}`);
      const data = await res.json();
      setAwbList(data.awbList || []);
    } catch { setAwbList([]); }
    finally { setLoadingDetail(false); }
  }

  const filtered = pesawat.filter(p => {
    const q = query.toLowerCase();
    return !q || p.kode_penerbangan.toLowerCase().includes(q) || p.maskapai.toLowerCase().includes(q) ||
      p.kota_asal.toLowerCase().includes(q) || p.kota_tujuan.toLowerCase().includes(q) || p.status_pesawat.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-gray-800">Status Kargo per Pesawat</h2>
          <p className="text-xs text-gray-500 mt-0.5">{filtered.length} dari {pesawat.length} pesawat — data dari database</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live
        </span>
      </div>

      <div className="px-5 py-3">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            placeholder="Cari kode penerbangan, maskapai, rute, status..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="px-5 py-3 text-left">Kode</th>
            <th className="px-5 py-3 text-left">Maskapai</th>
            <th className="px-5 py-3 text-left">Rute</th>
            <th className="px-5 py-3 text-left">Total AWB</th>
            <th className="px-5 py-3 text-left">Berat Terisi</th>
            <th className="px-5 py-3 text-left">Kapasitas</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <tr key={i} className="border-t">
                {[...Array(8)].map((_, j) => (
                  <td key={j} className="px-5 py-3"><div className="h-4 w-20 rounded bg-gray-100 animate-pulse" /></td>
                ))}
              </tr>
            ))
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-sm">
                {query ? 'Tidak ada pesawat yang cocok dengan pencarian.' : 'Belum ada data pesawat.'}
              </td>
            </tr>
          ) : (
            filtered.map((p) => {
              const pct = p.kapasitas_muatan > 0 ? Math.min(100, (Number(p.total_berat) / Number(p.kapasitas_muatan)) * 100) : 0;
              return (
                <tr key={p.id} className="border-t hover:bg-blue-50/40 transition">
                  <td className="px-5 py-3 font-bold text-blue-600 font-mono">{p.kode_penerbangan}</td>
                  <td className="px-5 py-3 text-gray-700">{p.maskapai}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{p.kota_asal} → {p.kota_tujuan}</td>
                  <td className="px-5 py-3 font-bold text-indigo-600">{p.jumlah_awb} AWB</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-400' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{Number(p.total_berat).toLocaleString('id-ID')} kg</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{Number(p.kapasitas_muatan).toLocaleString('id-ID')} kg</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[p.status_pesawat] || 'bg-gray-100 text-gray-600'}`}>
                      {p.status_pesawat}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => openDetail(p)}
                      className="flex items-center gap-1 bg-blue-900 text-white text-xs px-3 py-1 rounded font-semibold hover:bg-blue-800"
                    >
                      <EyeIcon className="w-3 h-3" /> Detail
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* DETAIL AWB MODAL */}
      {detailId && detailPesawat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-800">✈️ {detailPesawat.kode_penerbangan} — Manifest AWB</h2>
                <p className="text-xs text-gray-500">{detailPesawat.maskapai} · {detailPesawat.kota_asal} → {detailPesawat.kota_tujuan}</p>
              </div>
              <button onClick={() => { setDetailId(null); setDetailPesawat(null); }} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="px-6 py-4">
              {loadingDetail ? (
                <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}</div>
              ) : awbList.length === 0 ? (
                <p className="text-center text-gray-400 py-8 text-sm">Belum ada AWB dalam pesawat ini.</p>
              ) : (
                <div className="overflow-x-auto max-h-72 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-gray-50">
                      <tr className="text-gray-500 uppercase">
                        <th className="px-3 py-2 text-left">No AWB</th>
                        <th className="px-3 py-2 text-left">Pengirim</th>
                        <th className="px-3 py-2 text-left">Penerima</th>
                        <th className="px-3 py-2 text-left">Barang</th>
                        <th className="px-3 py-2 text-left">Berat</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {awbList.map(a => (
                        <tr key={a.id} className="border-t border-gray-50 hover:bg-blue-50/30">
                          <td className="px-3 py-2 font-mono text-blue-600 font-semibold">{a.no_resi}</td>
                          <td className="px-3 py-2 text-gray-700">{a.nama_pengirim}</td>
                          <td className="px-3 py-2 text-gray-700">{a.nama_penerima}</td>
                          <td className="px-3 py-2 text-gray-600">{a.jenis_barang}</td>
                          <td className="px-3 py-2 text-gray-600">{a.berat_barang} kg</td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded-full font-semibold ${AWB_STATUS_COLORS[a.status_pengiriman] || 'bg-gray-100 text-gray-600'}`}>
                              {a.status_pengiriman}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => { setDetailId(null); setDetailPesawat(null); }} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 text-sm font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
