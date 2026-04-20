'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function TrackingPage() {
  const [awb, setAwb] = useState('');
  const [result, setResult] = useState<any>(null);
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

  // 🔥 DUMMY DATABASE TRACKING
  const trackingDB: Record<string, any> = {
    '601-48291087': {
      pengirim: 'CV Maju Bersama',
      penerima: 'Toko Bali Indah',
      status: 'Loaded',
      timeline: [
        { time: '08:00', desc: 'Barang diterima di gudang CGK' },
        { time: '09:30', desc: 'Proses sortasi' },
        { time: '10:15', desc: 'Loaded ke pesawat' },
      ]
    },
    '601-48291034': {
      pengirim: 'PT Sinar Jaya',
      penerima: 'PT Mitra Surabaya',
      status: 'Arrived',
      timeline: [
        { time: '07:00', desc: 'Barang diterima di CGK' },
        { time: '08:30', desc: 'Berangkat dari CGK' },
        { time: '10:15', desc: 'Tiba di SUB' },
      ]
    }
  };

  function handleTracking() {
    const data = trackingDB[awb];

    if (data) {
      setResult(data);
    } else {
      setResult({ error: 'AWB tidak ditemukan' });
    }
  }

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tracking Airway Bill (AWB)
        </h1>

        {/* 🔥 JAM REALTIME */}
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
        <h2 className="font-bold text-gray-800 mb-2">
          Tracking Airway Bill
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Masukkan nomor AWB untuk melihat status kargo
        </p>

        <label className="text-sm font-semibold text-gray-700">
          NOMOR AIRWAY BILL (AWB)
        </label>

        <input
          value={awb}
          onChange={(e) => setAwb(e.target.value)}
          placeholder="Contoh: 601-48291087"
          className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleTracking}
          className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Lacak Status Kargo
        </button>
      </div>

      {/* HASIL TRACKING */}
      {result && (
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 max-w-2xl">

          {result.error ? (
            <p className="text-red-500 font-semibold">
              {result.error}
            </p>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-3">
                Detail Kargo
              </h3>

              <div className="mb-4 text-sm text-gray-700 space-y-1">
                <p><b>Pengirim:</b> {result.pengirim}</p>
                <p><b>Penerima:</b> {result.penerima}</p>
                <p><b>Status:</b> {result.status}</p>
              </div>

              <h4 className="font-semibold mb-3">
                Timeline Perjalanan
              </h4>

              <div className="space-y-3">
                {result.timeline.map((t: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">
                        {t.time}
                      </p>
                      <p className="text-sm text-gray-700">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}