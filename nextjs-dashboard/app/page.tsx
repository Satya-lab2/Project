import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beranda',
  description: 'SkySend Expedition — Layanan Kargo Udara Terpercaya untuk Pengiriman Domestik dan Internasional',
};

import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatPlane {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-12px) translateX(6px); }
          50% { transform: translateY(-6px) translateX(12px); }
          75% { transform: translateY(-14px) translateX(4px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-blue {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(59,130,246,0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes trailMove {
          0% { opacity: 0; width: 0; }
          50% { opacity: 0.6; }
          100% { opacity: 0; width: 120px; }
        }
        .animate-hero-title { animation: fadeInUp 0.8s ease forwards; }
        .animate-hero-sub { animation: fadeInUp 0.8s 0.2s ease forwards; opacity: 0; }
        .animate-hero-desc { animation: fadeInUp 0.8s 0.4s ease forwards; opacity: 0; }
        .animate-hero-btn { animation: fadeInUp 0.8s 0.6s ease forwards; opacity: 0; }
        .animate-float { animation: floatPlane 6s ease-in-out infinite; }
        .animate-card-1 { animation: slideInLeft 0.7s 0.1s ease forwards; opacity: 0; }
        .animate-card-2 { animation: fadeInUp 0.7s 0.25s ease forwards; opacity: 0; }
        .animate-card-3 { animation: slideInRight 0.7s 0.4s ease forwards; opacity: 0; }
        .animate-card-4 { animation: slideInLeft 0.7s 0.55s ease forwards; opacity: 0; }
        .animate-card-5 { animation: fadeInUp 0.7s 0.7s ease forwards; opacity: 0; }
        .animate-card-6 { animation: slideInRight 0.7s 0.85s ease forwards; opacity: 0; }
        .stat-animate { animation: countUp 0.6s ease forwards; opacity: 0; }
        .stat-1 { animation-delay: 0.1s; }
        .stat-2 { animation-delay: 0.25s; }
        .stat-3 { animation-delay: 0.4s; }
        .stat-4 { animation-delay: 0.55s; }
        .cta-pulse { animation: pulse-blue 2.5s ease-in-out infinite; }
        .nav-link { transition: color 0.2s, border-color 0.2s; }
        .nav-link:hover { color: #2563eb; border-bottom: 2px solid #2563eb; }
        .feature-card { transition: transform 0.2s, box-shadow 0.2s; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(37,99,235,0.12); }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur shadow-md">
        <div className="flex items-center justify-between pl-2 pr-10 py-3 w-full">
          <div className="flex items-center">
            <Image src="/images/Logo.png" alt="logo" width={140} height={140} />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">SkySend Expedition</span>
              <span className="text-xs text-gray-500 tracking-widest">AIR CARGO SYSTEM</span>
            </div>
          </div>
          <div className="flex space-x-8 font-medium text-sm">
            <Link href="/" className="text-blue-600 border-b-2 border-blue-600 pb-0.5 nav-link">HOME</Link>
            <Link href="/tentang-kami" className="text-gray-700 nav-link pb-0.5 border-b-2 border-transparent">TENTANG KAMI</Link>
            <Link href="/kontak" className="text-gray-700 nav-link pb-0.5 border-b-2 border-transparent">HUBUNGI KAMI</Link>
            <Link href="/lacak-kargo" className="text-gray-700 nav-link pb-0.5 border-b-2 border-transparent">LACAK KARGO</Link>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
            Login Supervisor
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

        {/* Floating plane decoration */}
        <div className="absolute top-1/4 right-16 text-6xl animate-float opacity-30 select-none hidden md:block">✈</div>
        <div className="absolute bottom-1/3 left-20 text-4xl animate-float opacity-20 select-none hidden md:block" style={{ animationDelay: '2s' }}>✈</div>

        <div className="relative z-10 max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-400/40 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 animate-hero-title">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block"></span>
            Sistem Kargo Udara Real-Time
          </div>

          <h1 className="text-4xl md:text-6xl font-black animate-hero-title leading-tight">
            ANTAR KOTA &amp;<br />INTERNASIONAL
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mt-4 animate-hero-sub">
            KECEPATAN ADALAH PRIORITAS KAMI.
          </h2>

          <p className="mt-5 text-base md:text-lg text-gray-300 max-w-2xl mx-auto animate-hero-desc">
            Sistem pelacakan kargo udara real-time dengan teknologi canggih
            untuk memastikan setiap paket tiba tepat waktu dan aman.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-hero-btn">
            <Link
              href="/lacak-kargo"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all cta-pulse"
            >
              🔍 LACAK KARGO SEKARANG
            </Link>
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all backdrop-blur"
            >
              Tentang Kami →
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-blue-900 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { value: '500+', label: 'Kargo Terkirim' },
            { value: '50+', label: 'Kota Tujuan' },
            { value: '99%', label: 'On-Time Rate' },
            { value: '24/7', label: 'Pelacakan Real-time' },
          ].map((s, i) => (
            <div key={i} className={`stat-animate stat-${i + 1}`}>
              <div className="text-3xl font-black text-blue-300">{s.value}</div>
              <div className="text-xs text-blue-200 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Kenapa SkySend?</span>
            <h2 className="text-3xl font-black text-gray-800 mt-2">Layanan Unggulan Kami</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Dipercaya oleh ratusan bisnis untuk mengantarkan kargo dengan aman dan tepat waktu.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🛰️', title: 'Pelacakan Real-time', desc: 'Pantau posisi kargo Anda setiap saat menggunakan nomor AWB. Update status otomatis di setiap tahap.', cls: 'animate-card-1' },
              { emoji: '⚡', title: 'Pengiriman Cepat', desc: 'Layanan Express dan VVIP tersedia untuk kebutuhan mendesak. Sampai tujuan dalam hitungan jam.', cls: 'animate-card-2' },
              { emoji: '🔒', title: 'Keamanan Terjamin', desc: 'Sistem enkripsi data dan asuransi kargo opsional untuk ketenangan pikiran Anda.', cls: 'animate-card-3' },
              { emoji: '✈️', title: 'Armada Handal', desc: 'Bekerjasama dengan maskapai terkemuka Indonesia untuk memastikan kapasitas dan ketepatan jadwal.', cls: 'animate-card-4' },
              { emoji: '📊', title: 'Dashboard Lengkap', desc: 'Admin dan supervisor dapat memantau seluruh pengiriman dalam satu dashboard terintegrasi.', cls: 'animate-card-5' },
              { emoji: '🌐', title: 'Jangkauan Luas', desc: 'Layanan pengiriman domestik ke seluruh Indonesia dan rute internasional pilihan.', cls: 'animate-card-6' },
            ].map((f, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 feature-card ${f.cls}`}>
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Proses Mudah</span>
            <h2 className="text-3xl font-black text-gray-800 mt-2">Cara Kerja SkySend</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Daftarkan Kargo', desc: 'Input data pengirim, penerima, dan detail barang.' },
              { step: '02', title: 'AWB Digenerate', desc: 'Nomor Airway Bill otomatis dibuat oleh sistem.' },
              { step: '03', title: 'Kargo Dikirim', desc: 'Barang diproses dan ditempatkan di pesawat.' },
              { step: '04', title: 'Lacak & Terima', desc: 'Pantau status real-time hingga sampai tujuan.' },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-7 left-1/2 w-full h-px bg-blue-100" />
                )}
                <h3 className="font-bold text-gray-800 text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-5xl mb-4 animate-float">✈️</div>
          <h2 className="text-3xl font-black mb-3">Siap Mengirim Kargo?</h2>
          <p className="text-blue-200 mb-8 text-sm">Mulai lacak pengiriman Anda atau hubungi tim kami untuk konsultasi.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lacak-kargo" className="bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              🔍 Lacak Kargo
            </Link>
            <Link href="/kontak" className="border border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/Logo.png" alt="logo" width={40} height={40} className="opacity-80" />
            <div>
              <div className="text-white font-bold text-sm">SkySend Expedition</div>
              <div className="text-xs tracking-widest">AIR CARGO SYSTEM</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link>
            <Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link>
            <Link href="/lacak-kargo" className="hover:text-white transition-colors">Lacak Kargo</Link>
          </div>
          <div className="text-xs">© 2024 SkySend Expedition. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
