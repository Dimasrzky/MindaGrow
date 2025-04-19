import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that should be public (no auth required)
const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/',
  '/api/auth/refresh',
];

// Define path patterns that match auth-required routes
const authRequiredPatterns = [
  '/student',
  '/parent',
  '/teacher',
  '/analytics',
  '/learning',
  '/games',
  '/activities',
  '/profile',
  '/settings',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    // If user is already authenticated and trying to access auth pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password')) {
      const userRole = getUserRoleFromToken(token);
      return NextResponse.redirect(new URL(`/${userRole || 'student'}`, request.url));
    }
    return NextResponse.next();
  }
  
  // Check if the path requires authentication
  if (authRequiredPatterns.some(pattern => pathname.startsWith(pattern))) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Verify if token is valid or expired
    const isTokenValid = verifyToken(token);
    
    if (!isTokenValid && refreshToken) {
      // Token is invalid but we have a refresh token
      // In a real app, you'd handle this by redirecting to a token refresh endpoint
      // For this example, we'll just redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    } else if (!isTokenValid) {
      // No valid token or refresh token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Role-based access control
    const userRole = getUserRoleFromToken(token);
    
    // Check if user is trying to access a role-specific area they don't have access to
    if (pathname.startsWith('/teacher') && userRole !== 'teacher') {
      return NextResponse.redirect(new URL(`/${userRole || 'student'}`, request.url));
    }
    
    if (pathname.startsWith('/parent') && userRole !== 'parent') {
      return NextResponse.redirect(new URL(`/${userRole || 'student'}`, request.url));
    }
    
    if (pathname.startsWith('/student') && userRole !== 'student' && userRole !== 'parent') {
      return NextResponse.redirect(new URL(`/${userRole}`, request.url));
    }
  }
  
  return NextResponse.next();
}

// Helper function to extract user role from token
// In a real app, you'd use a proper JWT decoder
function getUserRoleFromToken(token: string): string | null {
  try {
    // This is a placeholder. In a real app, you'd decode the JWT
    // For example: const decoded = jwt_decode(token);
    // Then return decoded.role;
    return null; // Replace with actual implementation
  } catch (error) {
    return null;
  }
}

// Helper function to verify token
// In a real app, you'd use a proper JWT verification
function verifyToken(token: string): boolean {
  try {
    // This is a placeholder. In a real app, you'd verify the JWT
    // For example: const isValid = jwt_verify(token, SECRET_KEY);
    return true; // Replace with actual implementation
  } catch (error) {
    return false;
  }
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that handle their own authentication
     */
    '/((?!_next/static|_next/image|favicon.ico|images|animations|api/auth).*)',
  ],
}