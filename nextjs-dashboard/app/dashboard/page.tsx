'use client'

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

type Stats = {
  total_pengiriman: number;
  dalam_pengiriman: number;
  selesai: number;
  pending: number;
  total_pesawat: number;
};

type Shipment = {
  id: string;
  no_resi: string;
  nama_pengirim: string;
  nama_penerima: string;
  kota_asal: string;
  kota_tujuan: string;
  berat_barang: number;
  harga_tarif: number;
  jenis_pengiriman: string;
  status_pengiriman: string;
  tanggal_kirim: string;
  kode_penerbangan?: string;
};

const STATUS_COLORS: Record<string, string> = {
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
};

export default function DashboardPage() {
  const [time, setTime] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { clearInterval(interval); document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [statsRes, shipRes] = await Promise.all([
        fetch('/api/dashboard-stats'),
        fetch('/api/shipments?limit=5'),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (shipRes.ok) {
        const d = await shipRes.json();
        setShipments(d.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
          </span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">AS</div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-800 leading-tight">Admin Sistem</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                  <div className="font-bold text-gray-800 text-sm">Admin Sistem</div>
                  <div className="text-xs text-gray-500">admin@kargo.com</div>
                </div>
                <button
                  onClick={() => { setShowProfileDropdown(false); setShowLogoutModal(true); }}
                  className="flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 text-sm font-medium w-full rounded-b-2xl"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" /> Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }} onClick={() => setShowLogoutModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 max-w-sm w-full mx-4 text-center" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Keluar dari Sistem?</h2>
            <p className="text-gray-500 text-sm mb-7">Pastikan semua pekerjaan sudah tersimpan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowLogoutModal(false)} className="px-7 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">Batal</button>
              <button onClick={() => { window.location.href = '/'; }} className="px-7 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-800 hover:bg-blue-900">Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}

      {/* STATS CARDS */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm animate-pulse h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total AWB</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.total_pengiriman ?? 0}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-yellow-500">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Dalam Pengiriman</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.dalam_pengiriman ?? 0}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-emerald-500">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Selesai</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.selesai ?? 0}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Pesawat</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stats?.total_pesawat ?? 0}</p>
          </div>
        </div>
      )}

      {/* RECENT SHIPMENTS */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-800">AWB Terbaru</h2>
            <p className="text-xs text-gray-500 mt-0.5">Data langsung dari database</p>
          </div>
          <Link href="/dashboard/manifest" className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-5 py-3 text-left">No AWB</th>
                  <th className="px-5 py-3 text-left">Pengirim</th>
                  <th className="px-5 py-3 text-left">Penerima</th>
                  <th className="px-5 py-3 text-left">Rute</th>
                  <th className="px-5 py-3 text-left">Pesawat</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-400">
                      Belum ada data. <Link href="/seed" className="text-blue-500 underline">Seed database</Link> terlebih dahulu.
                    </td>
                  </tr>
                ) : (
                  shipments.map((s) => (
                    <tr key={s.id} className="border-t border-gray-50 hover:bg-blue-50/40 transition-colors">
                      <td className="px-5 py-3 font-mono text-blue-600 font-semibold text-xs">{s.no_resi}</td>
                      <td className="px-5 py-3 text-gray-700 text-xs">{s.nama_pengirim}</td>
                      <td className="px-5 py-3 text-gray-700 text-xs">{s.nama_penerima}</td>
                      <td className="px-5 py-3 text-gray-600 text-xs">{s.kota_asal} → {s.kota_tujuan}</td>
                      <td className="px-5 py-3 text-gray-600 text-xs font-mono">{s.kode_penerbangan || '—'}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[s.status_pengiriman] || 'bg-gray-100 text-gray-600'}`}>
                          {s.status_pengiriman}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard/manifest" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group">
          <div className="text-3xl mb-2">📦</div>
          <div className="font-bold text-gray-800 text-sm">Kelola AWB</div>
          <div className="text-xs text-gray-500 mt-1">CRUDS pengiriman kargo udara</div>
        </Link>
        <Link href="/dashboard/pesawat" className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center group">
          <div className="text-3xl mb-2">✈️</div>
          <div className="font-bold text-gray-800 text-sm">Kelola Pesawat</div>
          <div className="text-xs text-gray-500 mt-1">Armada & manifest AWB per pesawat</div>
        </Link>
      </div>
    </div>
  );
}
