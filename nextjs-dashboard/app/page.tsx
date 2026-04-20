import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">

    {/* LOGO */}
          <div className="flex items-center">
            <Image
            src="/images/Logo.png"
            alt="logo"
            width={160}
            height={160}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">
                SkySend Expedition
              </span>
              <span className="text-xs text-gray-500 tracking-widest">
                AIR CARGO SYSTEM
              </span>
            </div>
          </div>

      {/* MENU */}
          <div className="flex space-x-10 font-medium">
            <Link href="/" className="text-blue-600 border-b-2 border-blue-600">
              HOME
            </Link>
            <Link href="/tentang-kami">TENTANG KAMI</Link>
            <Link href="/kontak">HUBUNGI KAMI</Link>
            <Link href="/lacak-kargo">LACAK KARGO</Link>
          </div>

      {/* BUTTON */}
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Login Supervisor
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center text-white pt-20">

        {/* BACKGROUND (PASTI MUNCUL) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg.png')" }}
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

          <p className="mt-6 text-lg py-6">
            Sistem pelacakan kargo udara real-time dengan teknologi canggih
            untuk memastikan setiap paket tiba tepat waktu.
          </p>

          <Link href="/lacak-kargo" className="mt-8 bg-blue-700 px-6 py-3 rounded-lg font-semibold">
            MULAI PELACAKAN SEKARANG
          </Link>

        </div>
      </section>

    </main>
  )
}