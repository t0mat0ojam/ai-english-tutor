import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "../lib/supabase";

export async function middleware(req: NextRequest) {
  const { data } = await supabase.auth.getUser();
  
  // Redirect unauthenticated users trying to access /dashboard
  if (!data.user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to dashboard routes
};
