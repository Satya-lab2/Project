'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserIcon, ArrowRightOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type TrackingResult = {
  no_resi: string;
  nama_pengirim: string;
  nama_penerima: string;
  no_telepon: string;
  kota_asal: string;
  kota_tujuan: string;
  jenis_barang: string;
  berat_barang: number;
  harga_tarif: number;
  jenis_pengiriman: string;
  status_pengiriman: string;
  tanggal_kirim: string;
  deskripsi?: string;
  pesawat?: {
    kode_penerbangan: string;
    maskapai: string;
    status_pesawat: string;
  } | null;
  timeline: { time: string; desc: string; done: boolean }[];
};

const STATUS_COLORS: Record<string, string> = {
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
};

function formatRupiah(n: number) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

export default function TrackingPage() {
  const [awb, setAwb] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTime(`${formatted} WIB`);
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

  async function handleTracking() {
    if (!awb.trim()) {
      setError('Masukkan nomor AWB terlebih dahulu');
      setResult(null);
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/tracking?awb=${encodeURIComponent(awb.trim())}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || 'AWB tidak ditemukan');
      } else {
        setResult(json.data);
      }
    } catch {
      setError('Gagal menghubungi server. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleTracking();
  }

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tracking Airway Bill (AWB)
        </h1>

        <div className='flex items-center gap-3'>
          <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
          </span>
          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AK</div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-800 leading-tight">Andika Kusuma</div>
                <div className="text-xs text-gray-500">Supervisor</div>
              </div>
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="px-5 pt-5 pb-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-base flex-shrink-0">AK</div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">Andika Kusuma</div>
                    <div className="text-xs text-gray-500 mt-0.5">Supervisor · SkySend</div>
                  </div>
                </div>
                <div className="border-t border-gray-100 mx-4" />
                <Link href="/dashboard/profile" className="flex items-center gap-3 px-5 py-3.5 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium" onClick={() => setShowProfileDropdown(false)}>
                  <UserIcon className="w-5 h-5 text-gray-500" /> Manage Profile
                </Link>
                <div className="border-t border-gray-100 mx-4" />
                <button onClick={() => { setShowProfileDropdown(false); setShowLogoutModal(true); }} className="flex items-center gap-3 px-5 py-3.5 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium w-full mb-1">
                  <ArrowRightOnRectangleIcon className="w-5 h-5 text-orange-500" /> Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }} onClick={() => setShowLogoutModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 max-w-sm w-full mx-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Keluar dari Sistem?</h2>
            <p className="text-gray-500 text-sm mb-7 leading-relaxed">Anda akan keluar dari sesi supervisor. Pastikan semua pekerjaan sudah tersimpan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowLogoutModal(false)} className="px-7 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">Batal</button>
              <button onClick={() => { window.location.href = '/'; }} className="px-7 py-2.5 rounded-xl font-semibold text-sm text-white transition-colors" style={{ background: 'linear-gradient(180deg, #0f2044 0%, #1a3a6e 100%)' }}>Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}

      {/* CARD INPUT */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <h2 className="font-bold text-gray-800 mb-2">Tracking Airway Bill</h2>
        <p className="text-sm text-gray-500 mb-4">Masukkan nomor AWB untuk melihat status kargo</p>

        <label className="text-sm font-semibold text-gray-700">NOMOR AIRWAY BILL (AWB)</label>
        <div className="flex gap-2 mt-2">
          <input
            value={awb}
            onChange={(e) => setAwb(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Contoh: AWB-4829187xxx"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleTracking}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 text-sm"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            {loading ? 'Mencari...' : 'Lacak'}
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium">
            ❌ {error}
          </div>
        )}
      </div>

      {/* HASIL TRACKING */}
      {result && (
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 max-w-2xl space-y-5">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">Detail Kargo</h3>
            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${STATUS_COLORS[result.status_pengiriman] || 'bg-gray-100 text-gray-600'}`}>
              {result.status_pengiriman}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">No AWB</p>
              <p className="font-mono font-bold text-blue-600">{result.no_resi}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Tanggal Kirim</p>
              <p className="font-medium text-gray-700">
                {new Date(result.tanggal_kirim).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Pengirim</p>
              <p className="font-medium text-gray-700">{result.nama_pengirim}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Penerima</p>
              <p className="font-medium text-gray-700">{result.nama_penerima}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Rute</p>
              <p className="font-medium text-gray-700">{result.kota_asal} → {result.kota_tujuan}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Barang</p>
              <p className="font-medium text-gray-700">{result.jenis_barang} · {result.berat_barang} kg</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Layanan</p>
              <p className="font-medium text-gray-700">{result.jenis_pengiriman}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Tarif</p>
              <p className="font-medium text-gray-700">{formatRupiah(result.harga_tarif)}</p>
            </div>
          </div>

          {/* Pesawat Info */}
          {result.pesawat && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex items-center gap-3">
              <span className="text-2xl">✈️</span>
              <div>
                <p className="text-xs text-indigo-400 font-semibold">Pesawat</p>
                <p className="text-sm font-bold text-indigo-700">{result.pesawat.kode_penerbangan} · {result.pesawat.maskapai}</p>
                <p className="text-xs text-indigo-500">Status: {result.pesawat.status_pesawat}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Timeline Perjalanan</h4>
            <div className="space-y-0">
              {result.timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${t.done ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    {i < result.timeline.length - 1 && (
                      <div className={`w-0.5 h-8 ${t.done ? 'bg-blue-200' : 'bg-gray-100'}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-xs font-mono ${t.done ? 'text-gray-400' : 'text-gray-300'}`}>{t.time}</p>
                    <p className={`text-sm ${t.done ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.deskripsi && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 font-semibold mb-1">Catatan</p>
              <p className="text-sm text-gray-600">{result.deskripsi}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
