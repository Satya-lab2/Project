import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Halaman Tidak Ditemukan | SkySend Expedition',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span className="text-6xl">✈️</span>
          </div>
        </div>

        {/* Kode error */}
        <p className="text-blue-300 text-sm font-bold uppercase tracking-[0.3em] mb-2">Error 404</p>
        <h1 className="text-5xl font-black text-white mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-blue-200 text-base mb-8 leading-relaxed">
          Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
          Pastikan URL sudah benar.
        </p>

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            ← Kembali ke Beranda
          </Link>
          <Link
            href="/lacak-kargo"
            className="border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
          >
            Lacak Kargo
          </Link>
        </div>

        {/* Footer kecil */}
        <p className="text-blue-400 text-xs mt-10">
          SkySend Expedition — Air Cargo System
        </p>
      </div>
    </div>
  );
}
