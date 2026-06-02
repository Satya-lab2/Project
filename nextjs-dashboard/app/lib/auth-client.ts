// Helper untuk membaca info user dari cookie di client-side
export function getUserFromCookie(): { username: string; role: string; name: string } | null {
  if (typeof document === 'undefined') return null;
  try {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(c => c.trim().startsWith('skysend_user='));
    if (!userCookie) return null;
    const value = decodeURIComponent(userCookie.split('=').slice(1).join('=').trim());
    return JSON.parse(value);
  } catch {
    return null;
  }
}

// Fungsi logout: panggil API DELETE /auth lalu redirect ke login
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth', { method: 'DELETE' });
  } catch {
    // tetap redirect meski gagal
  }
  window.location.href = '/login';
}
