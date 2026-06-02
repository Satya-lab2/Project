'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-red-500/20 rounded-full flex items-center justify-center border border-red-400/30">
            <span className="text-5xl">⚠️</span>
          </div>
        </div>

        <p className="text-red-400 text-sm font-bold uppercase tracking-[0.3em] mb-2">Terjadi Kesalahan</p>
        <h1 className="text-4xl font-black text-white mb-3">Oops! Ada yang Salah</h1>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          Sistem mengalami kesalahan yang tidak terduga. Tim kami sudah diberitahu.
          Silakan coba lagi atau kembali ke halaman utama.
        </p>

        {/* Error detail (development only hint) */}
        {error.message && (
          <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3 mb-6 text-left">
            <p className="text-xs text-red-400 font-mono break-all">{error.message}</p>
          </div>
        )}

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm"
          >
            🔄 Coba Lagi
          </button>
          <Link
            href="/"
            className="border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
          >
            ← Kembali ke Beranda
          </Link>
        </div>

        <p className="text-slate-500 text-xs mt-10">
          SkySend Expedition — Air Cargo System
        </p>
      </div>
    </div>
  );
}
