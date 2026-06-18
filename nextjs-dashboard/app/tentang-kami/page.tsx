import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali lebih dalam tentang SkySend Expedition, pelopor kargo udara nasional',
};

import Link from 'next/link';
import Image from 'next/image';

const TEAM = [
  { name: 'Satya Nugraha',    role: 'Chief Executive Officer',     initial: 'SN', color: 'bg-blue-600' },
  { name: 'Stella Olivia',   role: 'Head of Operations',          initial: 'SO', color: 'bg-indigo-600' },
  { name: 'Brayn Roboth',     role: 'Chief Technology Officer',    initial: 'BR', color: 'bg-sky-600' },
  { name: 'Vincent Thadeus', role: 'Janitor', initial: 'VT', color: 'bg-indigo-600' }
];

const TIMELINE = [
  { year: '2022', title: 'Perusahaan Didirikan', desc: 'SkySend Expedition berdiri di Tangerang dengan visi menjadi pemimpin kargo udara nasional.' },
  { year: '2023', title: 'Ekspansi 50+ Rute', desc: 'Membuka rute baru ke 50+ kota domestik dan mulai menjalin kemitraan dengan maskapai nasional.' },
  { year: '2024', title: 'Sistem Digital Penuh', desc: 'Meluncurkan platform tracking real-time dan dashboard manajemen AWB terintegrasi.' },
  { year: '2025', title: 'Rute Internasional', desc: 'Memulai layanan pengiriman internasional ke Asia Tenggara dengan kapasitas 50K+ paket/bulan.' },
];

const VALUES = [
  { icon: '⚡', title: 'Kecepatan',   desc: 'Setiap detik berarti. Kami berkomitmen memproses dan mengirim kargo secepat mungkin tanpa kompromi.',  color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { icon: '🛡️', title: 'Keamanan',   desc: 'Sistem enkripsi data dan protokol keamanan ketat memastikan setiap kargo sampai dalam kondisi sempurna.', color: 'text-red-400',    bg: 'bg-red-400/10' },
  { icon: '✅', title: 'Keandalan',  desc: 'Dengan 99% on-time rate, kepercayaan pelanggan adalah aset terbesar yang selalu kami jaga.',             color: 'text-green-400',  bg: 'bg-green-400/10' },
  { icon: '💡', title: 'Inovasi',    desc: 'Terus berinovasi dalam teknologi tracking dan sistem manajemen untuk pengalaman pengguna terbaik.',        color: 'text-blue-400',   bg: 'bg-blue-400/10' },
  { icon: '🤝', title: 'Integritas', desc: 'Transparansi penuh dalam setiap proses — dari harga tarif hingga status pengiriman secara real-time.',    color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: '🌍', title: 'Jangkauan', desc: 'Jaringan distribusi yang terus berkembang untuk menjangkau lebih banyak destinasi domestik & internasional.', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
];

export default function TentangKami() {
  return (
    <main className="bg-gray-50">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatPlane {
          0%,100% { transform: translateY(0) translateX(0); }
          40%     { transform: translateY(-14px) translateX(8px); }
          70%     { transform: translateY(-6px) translateX(14px); }
        }
        @keyframes slideLeft  { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(32px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes growLine   { from { height:0; } to { height:100%; } }

        .anim-hero     { animation: fadeInUp  0.8s ease both; }
        .anim-sub      { animation: fadeInUp  0.8s 0.18s ease both; }
        .anim-desc     { animation: fadeInUp  0.8s 0.34s ease both; }
        .anim-float    { animation: floatPlane 6s ease-in-out infinite; }
        .anim-float2   { animation: floatPlane 7s 2s ease-in-out infinite; }
        .anim-sl { animation: slideLeft  0.7s ease both; }
        .anim-sr { animation: slideRight 0.7s ease both; }
        .anim-up { animation: fadeInUp   0.7s ease both; }

        .d1 { animation-delay:0.05s; } .d2 { animation-delay:0.15s; } .d3 { animation-delay:0.25s; }
        .d4 { animation-delay:0.35s; } .d5 { animation-delay:0.45s; } .d6 { animation-delay:0.55s; }

        .nav-link { transition: color 0.2s, border-color 0.2s; }
        .nav-link:hover { color: #2563eb; border-bottom: 2px solid #2563eb; }
        .value-card { transition: transform 0.25s, box-shadow 0.25s; }
        .value-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(37,99,235,0.13); }
        .team-card  { transition: transform 0.25s, box-shadow 0.25s; }
        .team-card:hover  { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
        .timeline-dot { transition: transform 0.25s; }
        .timeline-row:hover .timeline-dot { transform: scale(1.25); }
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
            <Link href="/" className="text-gray-700 nav-link pb-0.5 border-b-2 border-transparent">HOME</Link>
            <Link href="/tentang-kami" className="text-blue-600 border-b-2 border-blue-600 pb-0.5">TENTANG KAMI</Link>
            <Link href="/kontak" className="text-gray-700 nav-link pb-0.5 border-b-2 border-transparent">HUBUNGI KAMI</Link>
            <Link href="/lacak-kargo" className="text-gray-700 nav-link pb-0.5 border-b-2 border-transparent">LACAK KARGO</Link>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
            Login Supervisor
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[62vh] flex items-center justify-center text-white pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-blue-950/90" />

        <div className="absolute top-1/3 right-20 text-6xl anim-float opacity-25 select-none hidden md:block">✈</div>
        <div className="absolute bottom-1/4 left-16 text-4xl anim-float2 opacity-15 select-none hidden md:block">✈</div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/25 border border-blue-400/40 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 anim-hero">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
            Berdiri Sejak 2022
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight anim-hero">
            TENTANG<br /><span className="text-blue-400">SKYSEND</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-300 max-w-xl mx-auto anim-desc">
            Pelopor kargo udara nasional yang menghadirkan solusi pengiriman cepat, aman, dan transparan dengan teknologi real-time.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap anim-desc">
            <Link href="/lacak-kargo" className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-xl font-bold text-sm transition-colors">
              🔍 Lacak Kargo
            </Link>
            <Link href="/kontak" className="bg-white/10 border border-white/30 hover:bg-white/20 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-colors backdrop-blur">
              Hubungi Kami →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-blue-900 py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { value: '50K+', label: 'Paket / Bulan' },
            { value: '120+', label: 'Destinasi' },
            { value: '99%',  label: 'On-Time Rate' },
            { value: '4 Thn', label: 'Pengalaman' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black text-blue-300">{s.value}</div>
              <div className="text-xs text-blue-200 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT SPLIT ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* Left text */}
          <div className="anim-sl d1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Siapa Kami</span>
            <h2 className="text-3xl font-black text-gray-800 mt-2 mb-5">
              Kargo Udara Modern<br />untuk Indonesia
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-800">SkySend Expedition</strong> adalah perusahaan kargo udara yang berdiri tahun 2022 di Tangerang.
              Kami hadir untuk menjawab kebutuhan pengiriman bisnis dan personal yang menuntut kecepatan, keamanan, dan keterbukaan informasi.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Dengan sistem AWB digital, tracking real-time, dan jaringan maskapai nasional, setiap paket dapat dipantau mulai dari gudang keberangkatan hingga tangan penerima — transparan di setiap langkahnya.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Sistem AWB otomatis & terdigitalisasi',
                'Pelacakan status pengiriman secara real-time',
                'Integrasi langsung dengan armada pesawat',
                'Dashboard manajemen pengiriman terpusat',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — visi misi cards */}
          <div className="flex flex-col gap-5 anim-sr d2">
            <div className="bg-blue-900 text-white rounded-2xl p-7 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center text-xl">🎯</div>
                <h3 className="font-bold text-blue-200 text-sm uppercase tracking-widest">Visi</h3>
              </div>
              <p className="text-gray-200 leading-relaxed text-sm">
                Menjadi perusahaan kargo udara terdepan di Asia Tenggara yang dipercaya jutaan pelanggan bisnis dan personal dengan layanan berstandar internasional.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl p-7 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">🚀</div>
                <h3 className="font-bold text-blue-200 text-sm uppercase tracking-widest">Misi</h3>
              </div>
              <ul className="text-gray-200 text-sm space-y-2">
                {[
                  'Menghadirkan pengiriman cepat, aman, dan terjangkau',
                  'Membangun teknologi tracking yang transparan',
                  'Memperluas jaringan ke seluruh penjuru Indonesia',
                  'Memberikan pelayanan terbaik 24/7',
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-300 mt-0.5">▸</span>{m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Apa yang Kami Percaya</span>
            <h2 className="text-3xl font-black text-gray-800 mt-2">Nilai-Nilai Kami</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
              Enam prinsip yang menjadi fondasi setiap keputusan dan layanan SkySend Expedition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 value-card anim-up d${i + 1}`}
              >
                <div className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Perjalanan Kami</span>
            <h2 className="text-3xl font-black text-gray-800 mt-2">Milestone SkySend</h2>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />

            <div className="flex flex-col gap-10">
              {TIMELINE.map((t, i) => (
                <div key={i} className={`timeline-row relative flex gap-6 items-start anim-sl d${i + 1}`}>
                  {/* dot */}
                  <div className="timeline-dot relative z-10 w-16 h-16 bg-blue-900 text-white rounded-2xl flex flex-col items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-xs text-blue-300 font-bold leading-none">{t.year}</span>
                  </div>
                  {/* content */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 flex-1 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-1">{t.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Orang-orang di Baliknya</span>
            <h2 className="text-3xl font-black text-white mt-2">Tim Kami</h2>
            <p className="text-blue-300 mt-3 text-sm max-w-lg mx-auto">
              Profesional berpengalaman yang berdedikasi membangun ekosistem kargo udara terbaik di Indonesia.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <div key={i} className={`team-card bg-blue-800/60 backdrop-blur border border-blue-700/50 rounded-2xl p-6 text-center anim-up d${i + 1}`}>
                <div className={`w-16 h-16 ${m.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                  {m.initial}
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{m.name}</h3>
                <p className="text-blue-300 text-xs leading-snug">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-5xl mb-4 anim-float">✈️</div>
          <h2 className="text-3xl font-black mb-3">Siap Bekerjasama?</h2>
          <p className="text-blue-200 mb-8 text-sm">
            Percayakan kebutuhan kargo udara bisnis Anda kepada SkySend Expedition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lacak-kargo" className="bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              🔍 Lacak Kargo
            </Link>
            <Link href="/kontak" className="border border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">
              Hubungi Kami →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
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
          <div className="text-xs">© 2025 SkySend Expedition. All rights reserved.</div>
        </div>
      </footer>

    </main>
  );
}