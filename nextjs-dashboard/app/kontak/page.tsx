'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const EMPTY_FORM = {
  nama: '',
  no_telepon: '',
  email: '',
  layanan: '',
  pesan: '',
};

type FormState = typeof EMPTY_FORM;
type FieldError = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.nama.trim())       errors.nama       = 'Nama wajib diisi.';
  if (!form.no_telepon.trim()) errors.no_telepon = 'Nomor telepon wajib diisi.';
  if (!form.email.trim())      errors.email      = 'Email wajib diisi.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                               errors.email      = 'Format email tidak valid.';
  if (!form.layanan)           errors.layanan    = 'Pilih jenis layanan.';
  if (!form.pesan.trim())      errors.pesan      = 'Pesan wajib diisi.';
  return errors;
}

export default function KontakPage() {
  const [form, setForm]           = useState<FormState>({ ...EMPTY_FORM });
  const [errors, setErrors]       = useState<FieldError>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]         = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit() {
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('✅ Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.', true);
        setForm({ ...EMPTY_FORM });
        setErrors({});
      } else {
        showToast(`❌ ${data.error || 'Gagal mengirim pesan.'}`, false);
      }
    } catch {
      showToast('❌ Koneksi bermasalah. Coba beberapa saat lagi.', false);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field: keyof FormState) =>
    `w-full bg-gray-200/90 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 transition-all ${
      errors[field] ? 'ring-2 ring-red-400 bg-red-50/80' : 'focus:ring-blue-400'
    }`;

  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between pl-2 pr-10 py-4 w-full">
          <div className="flex items-center">
            <Image src="/images/Logo.png" alt="logo" width={160} height={160} />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">SkySend Expedition</span>
              <span className="text-xs text-gray-500 tracking-widest">AIR CARGO SYSTEM</span>
            </div>
          </div>
          <div className="flex space-x-10 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/tentang-kami">TENTANG KAMI</Link>
            <Link href="/kontak" className="text-blue-600 border-b-2 border-blue-600">HUBUNGI KAMI</Link>
            <Link href="/lacak-kargo">LACAK KARGO</Link>
          </div>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Login Supervisor
          </Link>
        </div>
      </nav>

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 rounded-xl shadow-xl text-sm font-semibold transition-all ${
            toast.ok ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}

      <section className="pt-16 min-h-screen grid md:grid-cols-[35%_65%]">
        {/* LEFT — Info kontak */}
        <div className="bg-blue-900 text-white px-8 py-16 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">Hubungi Kami</h1>
          <p className="text-blue-200 text-sm mb-8">
            Tim customer support kami siap membantu Anda 24/7. Dapatkan respons cepat untuk semua kebutuhan pengiriman kargo udara Anda.
          </p>
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

        {/* RIGHT — Form */}
        <div className="relative flex items-center justify-center py-16 px-6">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 bg-blue-900/90 backdrop-blur-sm rounded-xl p-8 w-full max-w-xl">
            <h2 className="text-white text-xl font-bold mb-6">Kirim pesan kepada kami</h2>
            <div className="grid grid-cols-2 gap-4">

              {/* Nama */}
              <div>
                <label className="block text-sm text-blue-200 mb-1">Nama lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama anda"
                  className={inputClass('nama')}
                />
                {errors.nama && <p className="text-red-300 text-xs mt-1">{errors.nama}</p>}
              </div>

              {/* Telepon */}
              <div>
                <label className="block text-sm text-blue-200 mb-1">Nomor telepon</label>
                <input
                  type="tel"
                  name="no_telepon"
                  value={form.no_telepon}
                  onChange={handleChange}
                  placeholder="+62"
                  className={inputClass('no_telepon')}
                />
                {errors.no_telepon && <p className="text-red-300 text-xs mt-1">{errors.no_telepon}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-blue-200 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email@gmail.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Layanan */}
              <div>
                <label className="block text-sm text-blue-200 mb-1">Jenis layanan</label>
                <select
                  name="layanan"
                  value={form.layanan}
                  onChange={handleChange}
                  className={inputClass('layanan')}
                >
                  <option value="">Pilihan layanan</option>
                  <option>Kargo Reguler</option>
                  <option>Kargo Express</option>
                  <option>Same Day</option>
                  <option>International</option>
                </select>
                {errors.layanan && <p className="text-red-300 text-xs mt-1">{errors.layanan}</p>}
              </div>

              {/* Pesan */}
              <div className="col-span-2">
                <label className="block text-sm text-blue-200 mb-1">Pesan</label>
                <textarea
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  placeholder="Tuliskan pertanyaan atau kebutuhan anda"
                  rows={4}
                  className={`${inputClass('pesan')} resize-none`}
                />
                {errors.pesan && <p className="text-red-300 text-xs mt-1">{errors.pesan}</p>}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Mengirim...
                </>
              ) : 'Kirim Pesan'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}