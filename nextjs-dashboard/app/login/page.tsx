'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const users = [
  { username: 'Andika.05', password: '12345', role: 'Supervisor', redirect: '/dashboard' },
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleLogin() {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      router.push(user.redirect);
    } else {
      setError('Username atau password salah.');
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/images/Logo.png" alt="logo" width={100} height={100} />
                <div>
                <div className="font-bold text-sm">SkySend Expedition</div>
                <div className="text-xs text-gray-400 tracking-widest">AIR CARGO SYSTEM</div>
                </div>
            </Link>
        </div>
      </nav>

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }} />
      <div className="absolute inset-0 bg-black/60" />

      {/* Form */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Image src="/images/Logo.png" alt="logo" width={500} height={500} />
          </div>
          <div>
            <div className="font-bold text-blue-600 text-lg">SkySend Expedition</div>
            <div className="text-xs text-gray-400 tracking-widest">AIR CARGO SYSTEM</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-600 mb-1">Selamat Datang</h2>
        <p className="text-sm text-gray-500 mb-6">Masuk ke sistem manajemen kargo udara</p>

        <div className="mb-4">
          <label className="block text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(''); }}
            placeholder="Contoh: Andika.05"
            className="w-full border border-blue-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            placeholder="Masukkan Password"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full border border-blue-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">
            <span>⚠</span> {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
        >
          Masuk ke sistem
        </button>

        <div className="bg-blue-50 rounded-lg p-4 text-xs text-blue-700">
          <p className="font-bold mb-1">Akun demo:</p>
          <p>Andika.05 / 12345 (Supervisor)</p>
        </div>
      </div>
    </div>
  );
}