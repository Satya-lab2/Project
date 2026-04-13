import Link from "next/link"
import Image from "next/image"

export default function TentangKami() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">

          {/* LOGO */}
          <div className="flex items-center">
            <Image
            src='/images/Logo.png'
            alt='logo'
            width={160}
            height={160}
            />

            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">
                SkySend Expedition
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                AIR CARGO SYSTEM
              </span>
            </div>
          </div>

          {/* MENU */}
          <div className="flex space-x-10 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/tentang-kami" className="text-blue-600 border-b-2 border-blue-600">
              TENTANG KAMI
            </Link>
            <Link href="/kontak">HUBUNGI KAMI</Link>
            <Link href="/tracking">LACAK KARGO</Link>
          </div>

          {/* BUTTON */}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Login Supervisor
          </button>

        </div>
      </nav>

      {/* CONTENT */}
      <section className="pt-20 grid md:grid-cols-[30%_70%] min-h-screen w-full">

        {/* LEFT SIDE */}
        <div className="bg-blue-900 text-white px-4 py-10 md:px-6 flex flex-col justify-center">

          <h1 className="text-6xl font-bold opacity-80">2022</h1>

          <p className="text-blue-300 mt-4 font-semibold">
            TENTANG KAMI
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            SkySend Expedition
          </h2>

          <p className="mt-4 text-gray-200">
            Perusahaan cargo udara terpercaya yang melayani pengiriman antar kota 
            dan internasional sejak tahun 2022 dengan teknologi real-time tracking.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-blue-700 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">50K+</h3>
              <p className="text-sm">Paket/bulan</p>
            </div>

            <div className="bg-blue-700 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">120+</h3>
              <p className="text-sm">Destinasi</p>
            </div>

            <div className="bg-blue-700 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">99%</h3>
              <p className="text-sm">On-time rate</p>
            </div>

            <div className="bg-blue-700 p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold">4 Tahun</h3>
              <p className="text-sm">Pengalaman</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col justify-center px-6 md:px-16 text-white">

          {/* BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.png')" }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* CONTENT */}
          <div className="relative z-10">

            {/* DESKRIPSI */}
            <div className="bg-blue-900/80 backdrop-blur-md p-6 rounded-xl mb-6">
              <p className="mb-4">
                <b>SkySend Expedition</b> adalah perusahaan kargo udara modern yang berdiri sejak 2022, 
                menghadirkan solusi pengiriman cepat, aman, dan terpercaya untuk kebutuhan domestik dan internasional.
              </p>

              <p>
                Didukung teknologi real-time tracking dan jaringan distribusi yang luas, 
                kami memastikan setiap pengiriman dapat dipantau dengan mudah, transparan, dan tepat waktu.
              </p>
            </div>

            {/* VISI MISI */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">

              <div className="bg-blue-900/80 p-6 rounded-xl">
                <h3 className="text-blue-300 font-bold mb-2">VISI</h3>
                <p>
                  Menjadi perusahaan kargo udara terdepan di Asia Tenggara yang dipercaya jutaan pelanggan bisnis dan personal.
                </p>
              </div>

              <div className="bg-blue-900/80 p-6 rounded-xl">
                <h3 className="text-blue-300 font-bold mb-2">MISI</h3>
                <p>
                  Menghadirkan layanan pengiriman cepat, aman, dan terjangkau dengan teknologi dan sistem real-time tracking.
                </p>
              </div>

            </div>

            {/* ICON VALUES (SVG) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {/* KECEPATAN */}
              <div className="bg-blue-900/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                <svg className="w-10 h-10 mx-auto mb-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h7v8l10-12h-7z"/>
                </svg>
                <p>Kecepatan</p>
              </div>

              {/* KEAMANAN */}
              <div className="bg-blue-900/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                <svg className="w-10 h-10 mx-auto mb-3 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"/>
                </svg>
                <p>Keamanan</p>
              </div>

              {/* KEANDALAN */}
              <div className="bg-blue-900/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                <svg className="w-10 h-10 mx-auto mb-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5z"/>
                </svg>
                <p>Keandalan</p>
              </div>

              {/* INOVASI */}
              <div className="bg-blue-900/70 backdrop-blur-md p-6 rounded-xl text-center hover:scale-105 transition-all duration-300">
                <svg className="w-10 h-10 mx-auto mb-3 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21h6v-1H9v1zm3-20C7.5 1 4 4.5 4 9c0 2.8 1.5 5.2 3.7 6.6L8 17h8l.3-1.4C18.5 14.2 20 11.8 20 9c0-4.5-3.5-8-8-8z"/>
                </svg>
                <p>Inovasi</p>
              </div>

            </div>

          </div>
        </div>

      </section>

    </main>
  )
}