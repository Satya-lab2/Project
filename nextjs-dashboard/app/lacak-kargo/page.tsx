'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type TrackingResult = {
  no_resi: string;
  nama_pengirim: string;
  nama_penerima: string;
  kota_asal: string;
  kota_tujuan: string;
  jenis_barang: string;
  berat_barang: number;
  jenis_pengiriman: string;
  status_pengiriman: string;
  tanggal_kirim: string;
  pesawat?: { kode_penerbangan: string; maskapai: string; status_pesawat: string } | null;
  timeline: { time: string; desc: string; done: boolean }[];
};

const STATUS_COLORS: Record<string, string> = {
  'Diproses': 'bg-blue-100 text-blue-700',
  'Dalam Pengiriman': 'bg-yellow-100 text-yellow-700',
  'Sampai Tujuan': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
};

export default function LacakKargoPage() {
  const [awbInput, setAwbInput] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [awbNotFound, setAwbNotFound] = useState(false);

  async function handleTrack() {
    const key = awbInput.trim();
    if (!key) {
      setError('Masukkan nomor AWB terlebih dahulu.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    setAwbNotFound(false);
    try {
      const res = await fetch(`/api/tracking?awb=${encodeURIComponent(key)}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setAwbNotFound(true);
        setError(json.error || 'AWB tidak ditemukan.');
      } else {
        setResult(json.data);
        setAwbNotFound(false);
      }
    } catch {
      setError('Gagal menghubungi server. Coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">
          <div className="flex items-center">
            <Image src="/images/Logo.png" alt="logo" width={160} height={160} />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">SkySend Expedition</span>
              <span className="text-xs text-gray-500 tracking-widest">AIR CARGO SYSTEM</span>
            </div>
          </div>
          <div className="flex space-x-10 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/tentang-kami">TENTANG KAMI</Link>
            <Link href="/kontak">HUBUNGI KAMI</Link>
            <Link href="/lacak-kargo" className="text-blue-600 border-b-2 border-blue-600">LACAK KARGO</Link>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full">Login Supervisor</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-64 flex items-end pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg lacak.png')" }} />
        <div className="absolute inset-0 bg-blue-900/70" />
      </section>

      {/* Content */}
      <section className="bg-blue-900 min-h-screen pb-16 pt-0 flex flex-col items-center">
        <div className="text-center pt-10 pb-8">
          <h1 className="text-3xl font-bold text-blue-400">Lacak Status Kargo Anda</h1>
          <p className="text-blue-200 text-sm mt-2">Masukkan nomor AWB untuk melihat posisi dan status kargo anda secara real-time</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4">
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Nomor Airway Bill (AWB)</label>
          <input
            type="text"
            value={awbInput}
            onChange={e => { setAwbInput(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleTrack()}
            placeholder="Masukkan Nomor AWB (Contoh: AWB-4829187xxx)"
            className="w-full border border-blue-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button
            onClick={handleTrack}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Mencari...' : 'Lacak Status Kargo'}
          </button>

          {error && !awbNotFound && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              ❌ {error}
            </div>
          )}

          {awbNotFound && (
            <div className="mt-5 text-center">
              <div className="text-6xl mb-3 select-none">📭</div>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-mono px-3 py-1 rounded-full mb-3">
                <span className="font-bold">404</span>
                <span>·</span>
                <span>AWB Tidak Ditemukan</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Nomor AWB Tidak Ada di Sistem</h3>
              <p className="text-sm text-gray-500 mb-4">
                Nomor <span className="font-mono font-bold text-red-600">{awbInput}</span> tidak ditemukan.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-left text-xs text-blue-700 mb-4">
                <p className="font-bold mb-2">YANG PERLU DIPERIKSA:</p>
                <p>· Pastikan nomor AWB sudah benar (contoh: AWB-1234567890)</p>
                <p>· Tidak ada spasi atau karakter ekstra</p>
                <p>· AWB belum diregistrasi atau belum diproses</p>
                <p>· Hubungi supervisor untuk verifikasi manual</p>
              </div>
              <button onClick={() => { setAwbNotFound(false); setError(''); setAwbInput(''); setResult(null); }} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
                ← Coba Nomor Lain
              </button>
            </div>
          )}

          {result && !error && (
            <div className="mt-5">
              {/* Status Badge */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-blue-700 font-mono text-sm">{result.no_resi}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_COLORS[result.status_pengiriman] || 'bg-gray-100 text-gray-600'}`}>
                    {result.status_pengiriman}
                  </span>
                </div>
                <p className="text-sm text-blue-600">{result.nama_pengirim} → {result.nama_penerima}</p>
                <p className="text-xs text-blue-500 mt-0.5">
                  {result.kota_asal} → {result.kota_tujuan} · {result.berat_barang} kg · {result.jenis_pengiriman}
                  {result.pesawat ? ` · ${result.pesawat.kode_penerbangan}` : ''}
                </p>
              </div>

              {/* Pesawat Info */}
              {result.pesawat && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex items-center gap-3 mb-4">
                  <span className="text-xl">✈️</span>
                  <div>
                    <p className="text-xs text-indigo-400 font-semibold">Pesawat Kargo</p>
                    <p className="text-sm font-bold text-indigo-700">{result.pesawat.kode_penerbangan} · {result.pesawat.maskapai}</p>
                    <p className="text-xs text-indigo-500">Status: {result.pesawat.status_pesawat}</p>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Riwayat Status</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {result.timeline.map((step, i) => (
                  <div key={i} className="flex gap-4 mb-4 relative">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center z-10 text-xs ${step.done ? 'bg-blue-600 text-white' : 'bg-gray-200 border-2 border-gray-300'}`}>
                      {step.done ? '✓' : ''}
                    </div>
                    <div className="pt-1">
                      <p className={`font-semibold text-sm ${step.done ? 'text-gray-800' : 'text-gray-400'}`}>{step.desc}</p>
                      <p className={`text-xs mt-0.5 ${step.done ? 'text-blue-500' : 'text-gray-400'}`}>{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => { setResult(null); setAwbInput(''); }} className="mt-2 w-full border border-blue-300 text-blue-600 py-2.5 rounded-lg text-sm hover:bg-blue-50">
                Lacak AWB Lain
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
