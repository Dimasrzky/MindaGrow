import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
];

// Define role-specific paths
const roleBasedPaths = {
  student: ['/student'],
  teacher: ['/teacher'],
  parent: ['/parent'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public resource or API route
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;
  
  // If the path is public, allow access
  if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    // If user is already authenticated and trying to access auth pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password')) {
      // Redirect to appropriate dashboard based on role
      if (userRole) {
        return NextResponse.redirect(new URL(`/${userRole}`, request.url));
      }
      // Default to student dashboard if role is not specified
      return NextResponse.redirect(new URL('/student', request.url));
    }
    
    return NextResponse.next();
  }

  // If user is not authenticated, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Role-based access control
  if (userRole) {
    // Check if user has access to the requested path based on their role
    const hasAccess = Object.entries(roleBasedPaths).some(([role, paths]) => {
      if (role === userRole) {
        return true; // User can access their own role's paths
      }
      
      // Check if the current path is restricted to another role
      return !paths.some(path => pathname.startsWith(path));
    });
    
    if (!hasAccess) {
      // Redirect to their appropriate dashboard
      return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }
  }

  return NextResponse.next();
}

// Configure matcher to run middleware on specific paths
export const config = {
  matcher: [
    // Match all routes except static files, api routes, and other excluded paths
    '/((?!_next/static|_next/image|favicon.ico|images|animations).*)',
  ],
};