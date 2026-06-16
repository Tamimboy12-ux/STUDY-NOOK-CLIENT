import { NextResponse } from "next/server";

export function proxy(request) {
  const betterAuthToken =
    request.cookies.get("__Secure-better-auth.session_token");

  const jwtToken =
    request.cookies.get("token");

  const pathname = request.nextUrl.pathname;

  const isLoggedIn =
    betterAuthToken || jwtToken;

  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
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