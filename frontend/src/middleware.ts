import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/auth/login' || 
    path === '/auth/register' || 
    path === '/auth/forgot-password' ||
    path === '/' ||
    path.startsWith('/api/');

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect unauthenticated users to login page if trying to access protected routes
  if (!isPublicPath && !token) {
    // Create the URL to redirect to
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    
    // Add original URL as a query parameter to redirect after login
    url.search = `?redirectTo=${path}`;
    
    // Redirect to login
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/register pages
  if (token && (path === '/auth/login' || path === '/auth/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard/student'; // Default dashboard
    return NextResponse.redirect(url);
  }

  // Redirect /login to /auth/login (handle common error paths)
  if (path === '/login') {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // Redirect the root path to login if no token, otherwise to dashboard
  if (path === '/') {
    const url = request.nextUrl.clone();
    if (!token) {
      url.pathname = '/auth/login';
    } else {
      url.pathname = '/dashboard/student';
    }
    return NextResponse.redirect(url);
  }
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside public)
     * 4. /examples (inside public)
     * 5. all root files like favicon.ico, robots.txt, manifest.json, etc.
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
};