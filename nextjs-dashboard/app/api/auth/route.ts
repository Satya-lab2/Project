import { NextRequest, NextResponse } from 'next/server';

// Akun yang valid (bisa dipindah ke DB jika ingin)
const VALID_USERS = [
  { username: 'Andika.05', password: '12345', role: 'Supervisor', name: 'Andika Kusuma' },
  { username: 'admin', password: 'admin123', role: 'Administrator', name: 'Admin Sistem' },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: { username: user.username, role: user.role, name: user.name },
    });

    // Set cookie session (httpOnly untuk keamanan)
    response.cookies.set('skysend_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 jam
      path: '/',
    });

    // Simpan info user di cookie terpisah (readable oleh JS untuk tampilan nama)
    response.cookies.set(
      'skysend_user',
      JSON.stringify({ username: user.username, role: user.role, name: user.name }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8,
        path: '/',
      }
    );

    return response;
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logout berhasil' });

  response.cookies.set('skysend_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  response.cookies.set('skysend_user', '', {
    httpOnly: false,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
