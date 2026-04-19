'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const awbData: Record<string, {
  awb: string; status: string; pengirim: string; penerima: string; rute: string; berat: string; maskapai: string;
  timeline: { label: string; time: string; location: string; done: boolean }[];
}> = {
  '601-48291087': {
    awb: '601-48291087', status: 'Departed',
    pengirim: 'CV Maju Bersama', penerima: 'Toko Bali Indah',
    rute: 'CGK→DPS', berat: '22 kg', maskapai: 'GA-716',
    timeline: [
      { label: 'Received at Warehouse', time: '04 Apr 2026, 06:12 WIB', location: 'Gudang Terminal Kargo, Bandara Soedirman', done: true },
      { label: 'Sortation', time: '04 Apr 2026, 07:45 WIB', location: 'Area Sortasi Terminal Kargo CGK', done: true },
      { label: 'Loaded to Aircraft', time: '04 Apr 2026, 10:00 WIB', location: 'Apron GA-716, Gate K-7', done: true },
      { label: 'Departed', time: '04 Apr 2026, 11:15 WIB', location: 'Take-off dari Bandara Soedirman', done: true },
      { label: 'Arrived at Destination', time: 'Est. 04 Apr 2026, 13:30 WIB', location: 'Bandara Ngurah Rai, Bali', done: false },
    ],
  },
};

export default function LacakKargoPage() {
  const [awbInput, setAwbInput] = useState('');
  const [result, setResult] = useState<typeof awbData[string] | null | 'not_found'>(null);

  function handleTrack() {
    const key = awbInput.trim();
    if (awbData[key]) setResult(awbData[key]);
    else if (key) setResult('not_found');
  }

  return (
    <main>
        <nav className="fixed w-full z-50 bg-white shadow-md">
            <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">
                <div className="flex items-center">
                    <Image
                    src="/images/Logo.png"
                    alt="logo"
                    width={160}
                    height={160}
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="font-bold text-lg">
                        SkySend Expedition
                        </span>
                        <span className="text-xs text-gray-500 tracking-widest">
                        AIR CARGO SYSTEM
                        </span>
                    </div>
                </div>
          {/* MENU */}
                <div className="flex space-x-10 font-medium">
                    <Link href="/">
                    HOME
                    </Link>
                    <Link href="/tentang-kami">TENTANG KAMI</Link>
                    <Link href="/kontak">HUBUNGI KAMI</Link>
                    <Link href="/lacak-kargo" className="text-blue-600 border-b-2 border-blue-600">LACAK KARGO</Link>
                </div>
    
          {/* BUTTON */}
                <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full">
                    Login Supervisor
                </Link>
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
            onChange={e => setAwbInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleTrack()}
            placeholder="Masukkan Nomor AWB (Contoh: 601-48291087)"
            className="w-full border border-blue-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button onClick={handleTrack} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Lacak Status Kargo
          </button>

          {result === 'not_found' && (
            <div className="mt-5 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-500 text-xl font-bold">!</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Nomor AWB Tidak Ditemukan</h3>
              <p className="text-sm text-gray-500 mb-3">Kargo dengan nomor AWB tersebut tidak ada dalam sistem. Pastikan nomor yang dimasukkan sudah benar.</p>
              <div className="bg-blue-50 rounded-lg p-4 text-left text-xs text-blue-700 mb-3">
                <p className="font-bold mb-2">YANG PERLU DIPERIKSA:</p>
                <p>· Format AWB: XXX-XXXXXXXX (contoh: 601-48291087)</p>
                <p>· Pastikan tidak ada spasi atau karakter ekstra</p>
                <p>· AWB belum diregistrasi atau belum diproses</p>
                <p>· Hubungi supervisor untuk verifikasi manual</p>
              </div>
              <button onClick={() => { setResult(null); setAwbInput(''); }} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
                Coba Nomor Lain
              </button>
            </div>
          )}

          {result && result !== 'not_found' && (
            <div className="mt-5">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-blue-700 font-mono">{result.awb}</span>
                  <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">{result.status}</span>
                </div>
                <p className="text-sm text-blue-600">{result.pengirim} → {result.penerima}</p>
                <p className="text-xs text-blue-500 mt-0.5">{result.rute} · {result.berat} · {result.maskapai}</p>
              </div>
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Riwayat Status</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {result.timeline.map((step, i) => (
                  <div key={i} className="flex gap-4 mb-4 relative">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center z-10 text-xs ${step.done ? 'bg-blue-600 text-white' : 'bg-gray-200 border-2 border-gray-300'}`}>
                      {step.done ? '✓' : ''}
                    </div>
                    <div className="pt-1">
                      <p className={`font-semibold text-sm ${step.done ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>
                      <p className={`text-xs mt-0.5 ${step.done ? 'text-blue-500' : 'text-gray-400'}`}>{step.time}</p>
                      <p className={`text-xs ${step.done ? 'text-gray-500' : 'text-gray-400'}`}>{step.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}