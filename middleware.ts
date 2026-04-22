// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("admin_auth")?.value === "true";
  const { pathname } = req.nextUrl;

  console.log("isLoggedIn", isLoggedIn)

  const isAdminRoute = pathname === "/admin-dashboard" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin-login";

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard", "/admin/:path*", "/admin-login"],
};