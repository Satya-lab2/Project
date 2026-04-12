import Link from "next/link"

export default function TentangKami() {
  return (
    <main>

      {/* NAVBAR (copy dari home biar konsisten) */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

          <div className="font-bold text-lg">
            SkySend Expedition
          </div>

          <div className="flex space-x-10 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/tentang-kami" className="text-blue-600 border-b-2 border-blue-600">
              TENTANG KAMI
            </Link>
            <Link href="#">HUBUNGI KAMI</Link>
            <Link href="#">LACAK KARGO</Link>
          </div>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Login Supervisor
          </button>

        </div>
      </nav>

      {/* CONTENT */}
      <section className="pt-20 grid md:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <div className="bg-blue-900 text-white p-10 flex flex-col justify-center">

          <h1 className="text-6xl font-bold opacity-80">2022</h1>

          <h2 className="mt-6 text-2xl font-bold">
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
        <div className="relative flex items-center justify-center text-white">

          {/* BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero.jpg')" }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* TEXT */}
          <div className="relative z-10 max-w-xl text-center px-6">

            <p className="mb-4">
              SkySend Expedition adalah perusahaan kargo udara modern yang berdiri sejak 2022, 
              menghadirkan solusi pengiriman cepat, aman, dan terpercaya untuk kebutuhan domestik dan internasional.
            </p>

            <p className="mb-4">
              Didukung teknologi real-time tracking dan jaringan distribusi yang luas, 
              kami memastikan setiap pengiriman dapat dipantau dengan mudah, transparan, dan tepat waktu.
            </p>

            <p>
              SkySend hadir sebagai partner logistik yang andal, membantu bisnis dan individu 
              berkembang melalui layanan pengiriman yang efisien dan inovatif.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}