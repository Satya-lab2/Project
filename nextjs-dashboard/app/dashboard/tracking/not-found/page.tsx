'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/24/outline';

function NotFoundContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const awb = searchParams.get('awb') || '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        {/* 404 Number */}
        <div className="relative mb-2 select-none">
          <span className="text-[10rem] font-black text-gray-100 leading-none tracking-tighter">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">📭</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 px-8 py-8 mt-2">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            AWB Tidak Ditemukan
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Data kargo tidak ada di sistem
          </h1>

          <p className="text-gray-500 text-sm mb-1 leading-relaxed">
            Nomor AWB{' '}
            <span className="font-mono font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
              {awb || '—'}
            </span>{' '}
            tidak ditemukan dalam database.
          </p>

          <p className="text-gray-400 text-xs mb-6">
            Periksa kembali nomor AWB. Format yang benar: <span className="font-mono">AWB-4829187xxx</span>
          </p>

          {/* Divider info */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-300 mb-6">
            <span className="px-2 py-0.5 bg-gray-100 rounded font-mono text-gray-400">404</span>
            <span>·</span>
            <span>Not Found</span>
            <span>·</span>
            <span>SkySend System</span>
          </div>

          {/* Possible causes */}
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <p className="text-xs font-semibold text-gray-500 mb-2">Kemungkinan penyebab:</p>
            <ul className="space-y-1.5">
              {[
                'Nomor AWB salah ketik atau tidak lengkap',
                'Kargo belum diinput ke sistem',
                'Nomor AWB sudah kadaluarsa',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="text-red-300 mt-0.5 flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/dashboard/tracking')}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              Cari AWB Lain
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-5">
          Butuh bantuan? Hubungi admin sistem SkySend.
        </p>
      </div>
    </div>
  );
}

export default function TrackingNotFoundPage() {
  return (
    <Suspense>
      <NotFoundContent />
    </Suspense>
  );
}