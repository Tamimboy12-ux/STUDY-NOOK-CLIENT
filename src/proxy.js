import { NextResponse } from 'next/server';

export function proxy (request) {
  const sessionToken = request.cookies.get('better-auth.session-token')?.value || 
        request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  if (!sessionToken) {
    if (!pathname.startsWith('/login') && !pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (sessionToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-room",
    "/my-listings",
    "/my-bookings",
    "/rooms/update/:path*",
  ],
};