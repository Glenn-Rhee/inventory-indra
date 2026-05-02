import { getToken } from "next-auth/jwt";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.pathname;
  if (
    url.startsWith("/_next/") ||
    url.startsWith("/api/") ||
    url.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.SECRET_KEY });
  if (url.includes("/api")) {
    return NextResponse.next();
  }

  if (url.includes("/auth")) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const matcher: MiddlewareConfig = {
  matcher: ["/:path"],
};
