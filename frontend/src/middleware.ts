import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Selalu izinkan akses ke homepage dan file statis
  if (
    path === '/' || 
    path.startsWith('/_next') || 
    path.startsWith('/api') ||
    path === '/favicon.ico' ||
    path === '/logo.svg' ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.svg')
  ) {
    return NextResponse.next();
  }
  
  // Path untuk halaman autentikasi
  const isAuthPage = path.startsWith('/auth/');
  
  // Mendapatkan token
  const token = request.cookies.get('token')?.value || '';
  
  // Untuk halaman yang memerlukan autentikasi
  if (!isAuthPage && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirectTo', path);
    return NextResponse.redirect(url);
  }
  
  // Jika user sudah terautentikasi, redirect dari halaman auth ke dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard/student', request.url));
  }
  
  return NextResponse.next();
}

// Matcher sederhana tanpa regex kompleks
export const config = {
  // Aplikasikan middleware ke semua rute
  matcher: ['/:path*'],
};