import Link from "next/link"

export default function Home() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">

    {/* LOGO */}
          <div className="font-bold text-lg">
            SkySend Expedition
          </div>

      {/* MENU */}
          <div className="flex space-x-10 font-medium">
            <Link href="/" className="text-blue-600 border-b-2 border-blue-600">
              HOME
            </Link>
            <Link href="/tentang-kami">TENTANG KAMI</Link>
            <Link href="#">HUBUNGI KAMI</Link>
            <Link href="#">LACAK KARGO</Link>
          </div>

      {/* BUTTON */}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Login Supervisor
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center text-white pt-20">

        {/* BACKGROUND (PASTI MUNCUL) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl px-6">

          <h1 className="text-4xl md:text-5xl font-bold">
            ANTAR KOTA DAN INTERNASIONAL
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mt-3">
            KECEPATAN ADALAH PRIORITAS KAMI.
          </h2>

          <p className="mt-6 text-lg">
            Sistem pelacakan kargo udara real-time dengan teknologi canggih
            untuk memastikan setiap paket tiba tepat waktu.
          </p>

          <button className="mt-8 bg-blue-700 px-6 py-3 rounded-lg font-semibold">
            MULAI PELACAKAN SEKARANG
          </button>

        </div>
      </section>

    </main>
  )
}