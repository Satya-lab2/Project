import Image from 'next/image';
import Link from 'next/link';

export default function KontakPage() {
  return (
    <main>
        <nav className="fixed w-full z-50 bg-white shadow-md">
            <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">
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
                    <Link href="/">
                    HOME
                    </Link>
                    <Link href="/tentang-kami">TENTANG KAMI</Link>
                    <Link href="/kontak" className="text-blue-600 border-b-2 border-blue-600">HUBUNGI KAMI</Link>
                    <Link href="/lacak-kargo">LACAK KARGO</Link>
                </div>
    
          {/* BUTTON */}
                <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full">
                    Login Supervisor
                </Link>
            </div>
        </nav>

      <section className="pt-16 min-h-screen grid md:grid-cols-[35%_65%]">
        {/* Left */}
        <div className="bg-blue-900 text-white px-8 py-16 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">Hubungi Kami</h1>
          <p className="text-blue-200 text-sm mb-8">Tim customer support kami siap membantu Anda 24/7. Dapatkan respons cepat untuk semua kebutuhan pengiriman kargo udara Anda.</p>

          <h2 className="text-lg font-bold mb-5">Informasi Kontak</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-red-500/80 rounded-full flex items-center justify-center flex-shrink-0">📞</div>
              <div>
                <div className="text-xs text-blue-300">TELEPON</div>
                <div className="font-semibold">+62 813 1542 9116</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-600/80 rounded-full flex items-center justify-center flex-shrink-0">✉</div>
              <div>
                <div className="text-xs text-blue-300">EMAIL</div>
                <div className="font-semibold text-blue-300 underline">info@skysend.co.id</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-red-500/80 rounded-full flex items-center justify-center flex-shrink-0">📍</div>
              <div>
                <div className="text-xs text-blue-300">KANTOR PUSAT</div>
                <div className="font-semibold">Jl. Bandara Soekarno-Hatta No.1, Tangerang, Banten 15126</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-600/80 rounded-full flex items-center justify-center flex-shrink-0">🕐</div>
              <div>
                <div className="text-xs text-blue-300">OPERASIONAL</div>
                <div className="font-semibold">Senin - Minggu, 24 Jam</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex items-center justify-center py-16 px-6">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 bg-blue-900/90 backdrop-blur-sm rounded-xl p-8 w-full max-w-xl">
            <h2 className="text-white text-xl font-bold mb-6">Kirim pesan kepada kami</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-200 mb-1">Nama lengkap</label>
                <input type="text" placeholder="Nama anda" className="w-full bg-gray-200/90 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm text-blue-200 mb-1">Nomor telepon</label>
                <input type="tel" placeholder="+62" className="w-full bg-gray-200/90 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm text-blue-200 mb-1">Email</label>
                <input type="email" placeholder="Email@gmail.com" className="w-full bg-gray-200/90 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm text-blue-200 mb-1">Jenis layanan</label>
                <select className="w-full bg-gray-200/90 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilihan layanan</option>
                  <option>Kargo Reguler</option>
                  <option>Kargo Express</option>
                  <option>Same Day</option>
                  <option>International</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-blue-200 mb-1">Pesan</label>
                <textarea placeholder="Tuliskan pertanyaan atau kebutuhan anda" rows={4} className="w-full bg-gray-200/90 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Kirim Pesan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}