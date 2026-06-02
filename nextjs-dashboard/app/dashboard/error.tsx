'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">⚠️</span>
        </div>
        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Terjadi Kesalahan</p>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Gagal Memuat Halaman</h2>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">
          Terjadi kesalahan saat memuat halaman ini. Pastikan koneksi database aktif dan coba lagi.
        </p>

        {error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-5 text-left">
            <p className="text-xs text-red-500 font-mono break-all">{error.message}</p>
          </div>
        )}

        <button
          onClick={reset}
          className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm w-full"
        >
          🔄 Coba Lagi
        </button>
      </div>
    </div>
  );
}
