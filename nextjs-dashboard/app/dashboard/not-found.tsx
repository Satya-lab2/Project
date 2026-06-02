import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">🔍</span>
        </div>
        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Error 404</p>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Halaman dashboard yang Anda akses tidak tersedia atau telah dipindahkan.
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Kembali ke Dashboard
          </Link>
          <Link
            href="/dashboard/manifest"
            className="border border-blue-200 text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Kelola AWB
          </Link>
        </div>
      </div>
    </div>
  );
}
