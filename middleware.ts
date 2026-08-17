import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/commerce/config";
import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  if (pathname.startsWith("/account") && pathname !== "/account/login" && pathname !== "/account/callback") {
    if (!user) {
      const login = request.nextUrl.clone();
      login.pathname = "/account/login";
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!user || !isAdminEmail(user.email)) {
      const login = request.nextUrl.clone();
      login.pathname = "/account/login";
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  if (pathname.startsWith("/tools/")) {
    if (!user) {
      const login = request.nextUrl.clone();
      login.pathname = "/account/login";
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return response;
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*", "/tools/:path*"],
};
