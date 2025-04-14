import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/sessions"];
const publicRoutes = [
  "/",
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/confirm-account",
  "/verify-mfa",
];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);
  const accessToken = request.cookies.get("access_token")?.value;
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  return NextResponse.next();
}