'use client'

import Link from 'next/link';
import { useEffect, useState, useRef, Suspense } from 'react';
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import CargoTable from '@/app/ui/dashboard/cargo-table';
import { CargoTableSkeleton, StatCardsSkeleton, FlightCardsSkeleton } from '@/app/ui/dashboard/skeletons';

const flights = [
  { no: 'GA-452', maskapai: 'Garuda Indonesia', rute: 'CGK→SUB', etd: '08:30', eta: '10:15', totalKargo: '842 kg / 18 AWB', status: 'On Time' },
  { no: 'GA-716', maskapai: 'Garuda Indonesia', rute: 'CGK→DPS', etd: '11:15', eta: '13:30', totalKargo: '1.240 kg / 34 AWB', status: 'Boarding' },
  { no: 'ID-8821', maskapai: 'Batik Air', rute: 'CGK→MDC', etd: '13:00', eta: '17:45', totalKargo: '560 kg / 12 AWB', status: 'Delayed +45m' },
  { no: 'JT-633', maskapai: 'Lion Air', rute: 'CGK→UPG', etd: '06:45', eta: '10:10', totalKargo: '1.820 kg / 41 AWB', status: 'Departed' },
  { no: 'SJ-220', maskapai: 'Sriwijaya Air', rute: 'CGK→PDG', etd: '14:30', eta: '16:00', totalKargo: '390 kg / 9 AWB', status: 'On Time' },
  { no: 'JT-771', maskapai: 'Lion Air', rute: 'CGK→BDJ', etd: '07:20', eta: '10:50', totalKargo: '2.100 kg / 28 AWB', status: 'Departed' },
];

// ── Skeleton inline untuk stats cards ─────────────────────────
function StatsCards() {
  const totalKargo = 12;
  const awbDiproses = 10;
  const awbError = 1;
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Kargo Masuk</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{totalKargo}</p>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">AWB Diproses</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{awbDiproses}</p>
      </div>
      <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">AWB Error</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{awbError}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'On Time': 'bg-green-100 text-green-700',
    'Boarding': 'bg-blue-100 text-blue-700',
    'Delayed +45m': 'bg-orange-100 text-orange-700',
    'Departed': 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function FlightCards() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-800">Status Penerbangan Kargo</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {flights.map((f, i) => (
          <div key={i} className="p-4 border-b border-r border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{f.no} — {f.maskapai}</span>
              <StatusBadge status={f.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800">CGK</span>
              <span className="text-gray-400 text-xs">✈</span>
              <span className="font-bold text-blue-600">{f.rute.split('→')[1]}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Dept {f.etd} · {f.totalKargo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [time, setTime] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      });
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

  return (
    <div className="min-h-screen" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Operator</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-mono shadow-sm">
            {time}
          </span>
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

      {/* Stats Cards dengan Suspense */}
      <Suspense fallback={<StatCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      {/* Cargo Table dengan Search + Pagination + Suspense */}
      <Suspense fallback={<CargoTableSkeleton />}>
        <CargoTable />
      </Suspense>

      {/* Flight Status Cards dengan Suspense */}
      <Suspense fallback={<FlightCardsSkeleton />}>
        <FlightCards />
      </Suspense>

    </div>
  );
}
