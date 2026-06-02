'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const MAX_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 60;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Lockout state
  const [failCount, setFailCount] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  // Countdown timer saat locked
  useEffect(() => {
    if (!isLocked) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCountdown(0);
      return;
    }

    const update = () => {
      const remaining = Math.ceil((lockedUntil! - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setFailCount(0);
        setError('');
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setCountdown(remaining);
      }
    };

    update();
    timerRef.current = setInterval(update, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isLocked, lockedUntil]);

  async function handleLogin() {
    if (isLocked) return;

    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        const newCount = failCount + 1;
        setFailCount(newCount);

        if (newCount >= MAX_ATTEMPTS) {
          // Kunci form selama 60 detik
          setLockedUntil(Date.now() + LOCKOUT_SECONDS * 1000);
          setError('');
        } else {
          const sisa = MAX_ATTEMPTS - newCount;
          setError(`${data.error || 'Username atau password salah.'} Sisa percobaan: ${sisa}x`);
        }
      } else {
        router.push(redirect);
      }
    } catch {
      setError('Gagal menghubungi server. Coba lagi.');
    } finally {
      setLoading(false);
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

        {/* Tampilan saat dikunci */}
        {isLocked ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-bold text-red-600 text-lg mb-1">Akses Dikunci</h3>
            <p className="text-sm text-gray-500 mb-4">
              Terlalu banyak percobaan login yang gagal.<br />
              Silakan coba lagi dalam:
            </p>
            <div className="text-5xl font-bold text-red-500 mb-2 font-mono">
              {String(Math.floor(countdown / 60)).padStart(2, '0')}:{String(countdown % 60).padStart(2, '0')}
            </div>
            <p className="text-xs text-gray-400">detik</p>
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-xs text-red-700">
              Form login akan terbuka kembali secara otomatis setelah hitungan mundur selesai.
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                placeholder="Contoh: Andika.05"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                suppressHydrationWarning
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-400' : 'border-blue-300'}`}
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
                suppressHydrationWarning
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-400' : 'border-blue-300'}`}
              />
            </div>

            {/* Indikator percobaan */}
            {failCount > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500">Percobaan:</span>
                <div className="flex gap-1">
                  {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${i < failCount ? 'bg-red-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-red-500 font-semibold">{failCount}/{MAX_ATTEMPTS}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">
                <span>⚠</span> {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 disabled:opacity-60"
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke sistem'}
            </button>
          </>
        )}

        <div className="bg-blue-50 rounded-lg p-4 text-xs text-blue-700 mt-2">
          <p className="font-bold mb-1">Akun demo:</p>
          <p>Andika.05 / 12345 (Supervisor)</p>
          <p>admin / admin123 (Administrator)</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
