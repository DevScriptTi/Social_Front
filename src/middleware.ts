import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuth } from './lib/server/tools/auth';

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/logout'];
const publicRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  // Handle internationalization
  const intlMiddleware = createMiddleware(routing);
  const intlResponse = await intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const locale = pathname.split('/')[1];
  const isAuthenticated = await isAuth();

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // If user is authenticated and trying to access public route
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};