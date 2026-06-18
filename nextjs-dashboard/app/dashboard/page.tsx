'use client'

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { getUserFromCookie, logout } from '@/app/lib/auth-client';

type Stats = {
  total_pengiriman: number;
  draft: number;
  dalam_pengiriman: number;
  selesai: number;
  pending: number;
  hilang: number;
  diproses: number;
  diterima: number;
  sampai_tujuan: number;
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
  'Hilang': 'bg-red-100 text-red-700',
  'Diterima': 'bg-teal-100 text-teal-700',
};

const STATUS_BAR_COLORS: Record<string, string> = {
  'Draft': '#9ca3af',
  'Diproses': '#3b82f6',
  'Dalam Pengiriman': '#f59e0b',
  'Sampai Tujuan': '#22c55e',
  'Pending': '#f97316',
  'Selesai': '#10b981',
  'Hilang': '#ef4444',
  'Diterima': '#14b8a6',
};

// Simple bar chart component (no external lib needed)
function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-32 px-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-xs font-bold text-gray-600">{d.value}</span>
          <div
            className="w-full rounded-t-md transition-all duration-700"
            style={{
              height: `${Math.max(4, (d.value / max) * 96)}px`,
              backgroundColor: d.color,
            }}
          />
          <span className="text-[10px] text-gray-500 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// Simple donut/pie chart using SVG
function DonutChart({ segments, displayTotal }: { segments: { label: string; value: number; color: string }[]; displayTotal?: number }) {
  const total = segments.reduce((a, b) => a + b.value, 0) || 1;
  const shownTotal = displayTotal ?? total;
  let cumulative = 0;
  const cx = 60, cy = 60, r = 50, inner = 28;

  function polarToXY(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToXY(startAngle, r);
    const end = polarToXY(endAngle, r);
    const innerStart = polarToXY(endAngle, inner);
    const innerEnd = polarToXY(startAngle, inner);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} L ${innerStart.x} ${innerStart.y} A ${inner} ${inner} 0 ${large} 0 ${innerEnd.x} ${innerEnd.y} Z`;
  }

  const paths = segments.map((seg) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += seg.value;
    const endAngle = (cumulative / total) * 360;
    return { ...seg, path: describeArc(startAngle, endAngle < startAngle + 0.5 ? startAngle + 0.5 : endAngle) };
  });

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {paths.map((p, i) => (
          <path key={i} d={p.path} fill={p.color} stroke="white" strokeWidth="1.5" />
        ))}
        <text x="60" y="57" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#374151">{shownTotal}</text>
        <text x="60" y="70" textAnchor="middle" fontSize="8" fill="#9ca3af">Total</text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-gray-600">{seg.label}</span>
            <span className="font-bold text-gray-800 ml-auto pl-2">{seg.value}</span>
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
  const [stats, setStats] = useState<Stats | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);


  useEffect(() => {
    const user = getUserFromCookie();
    setCurrentUser(user);
  }, []);

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
        fetch('/api/shipments?limit=100'),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (shipRes.ok) {
        const d = await shipRes.json();
        const all: Shipment[] = d.data || [];
        setShipments(all.slice(0, 5));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
  }

  const initials = currentUser?.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'AS';

  // Chart 1: Status bar chart — semua status termasuk Draft
  const barChartData = [
    { label: 'Draft',       value: stats?.draft          ?? 0, color: STATUS_BAR_COLORS['Draft'] },
    { label: 'Diproses',    value: stats?.diproses       ?? 0, color: STATUS_BAR_COLORS['Diproses'] },
    { label: 'Pengiriman',  value: stats?.dalam_pengiriman ?? 0, color: STATUS_BAR_COLORS['Dalam Pengiriman'] },
    { label: 'Sampai\nTujuan', value: stats?.sampai_tujuan ?? 0, color: STATUS_BAR_COLORS['Sampai Tujuan'] },
    { label: 'Pending',     value: stats?.pending        ?? 0, color: STATUS_BAR_COLORS['Pending'] },
    { label: 'Selesai',     value: stats?.selesai        ?? 0, color: STATUS_BAR_COLORS['Selesai'] },
    { label: 'Hilang',      value: stats?.hilang         ?? 0, color: STATUS_BAR_COLORS['Hilang'] },
    { label: 'Diterima',    value: stats?.diterima       ?? 0, color: STATUS_BAR_COLORS['Diterima'] },
  ].filter(d => d.value > 0 || ['Draft', 'Diproses', 'Selesai'].includes(d.label));

  // Chart 2: Donut — semua status, total dihitung otomatis dari semua segments
  const donutSegments = [
    { label: 'Draft',       value: stats?.draft          ?? 0, color: '#9ca3af' },
    { label: 'Diproses',    value: stats?.diproses       ?? 0, color: '#3b82f6' },
    { label: 'Pengiriman',  value: stats?.dalam_pengiriman ?? 0, color: '#f59e0b' },
    { label: 'Selesai',     value: (stats?.selesai ?? 0) + (stats?.diterima ?? 0), color: '#10b981' },
    { label: 'Pending',     value: stats?.pending        ?? 0, color: '#f97316' },
    { label: 'Hilang',      value: stats?.hilang         ?? 0, color: '#ef4444' },
    { label: 'Sampai Tujuan', value: stats?.sampai_tujuan ?? 0, color: '#22c55e' },
  ].filter(s => s.value > 0);

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
              <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">{initials}</div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-800 leading-tight">{currentUser?.name || 'Admin Sistem'}</div>
                <div className="text-xs text-gray-500">{currentUser?.role || 'Administrator'}</div>
              </div>
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                  <div className="font-bold text-gray-800 text-sm">{currentUser?.name || 'Admin Sistem'}</div>
                  <div className="text-xs text-gray-500">{currentUser?.role}</div>
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
              <button onClick={handleLogout} disabled={loggingOut} className="px-7 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-800 hover:bg-blue-900 disabled:opacity-60">
                {loggingOut ? 'Keluar...' : 'Ya, Keluar'}
              </button>
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

      {/* CHARTS ROW */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm animate-pulse h-48" />
          <div className="bg-white rounded-xl p-5 shadow-sm animate-pulse h-48" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Chart 1: Bar chart status */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-bold text-gray-800 text-sm mb-1">Distribusi Status Kargo</h2>
            <p className="text-xs text-gray-400 mb-4">Jumlah AWB per status pengiriman</p>
            <BarChart data={barChartData} />
          </div>

          {/* Chart 2: Donut status breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-bold text-gray-800 text-sm mb-1">Komposisi Status AWB</h2>
            <p className="text-xs text-gray-400 mb-4">Proporsi berdasarkan kategori status</p>
            {donutSegments.length > 0 ? (
              <DonutChart segments={donutSegments} />
            ) : (
              <div className="h-32 flex items-center justify-center text-gray-400 text-sm">Belum ada data</div>
            )}
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
