import { NextRequest, NextResponse } from 'next/server';

// Routes yang membutuhkan login
const PROTECTED_PATHS = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah route ini perlu proteksi
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const session = request.cookies.get('skysend_session');

    if (!session || session.value !== 'authenticated') {
      // Redirect ke login jika belum login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
