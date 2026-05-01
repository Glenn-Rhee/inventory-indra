import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.SECRET_KEY });
  if (!url.includes("/auth") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (url.includes("/auth") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
