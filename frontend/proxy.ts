// middleware.ts or proxy.ts
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  "/admin-dashboard",
  "/driver-portal",
  "/owner-portal",
];

export function proxy(request: NextRequest) {
  // 1. Retrieve the httpOnly token set by your Next.js auth route handler
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;


  // 2. Check if the user is trying to access a restricted page
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  // Case 1: No access token and no refresh token -> Kick out immediately
  if (!accessToken && !refreshToken) {
    return redirectToLogin(request, pathname);
  }

  // Case 2: Access token exists -> Verify it
  if (accessToken) {
    try {
      return NextResponse.next(); // Access token is fully valid, proceed!
    } catch (error: any) {
      // If error is NOT an expiration error (e.g. malformed/tampered), reject
      if (error.code !== "ERR_JWT_EXPIRED") {
        return redirectToLogin(request, pathname);
      }
      // If it is simply expired, execution falls through to Case 3 below
    }
  }

  if (isProtected && !token) {
    // Redirect to login if token is missing
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); // For post-login redirect
    return NextResponse.redirect(loginUrl);
  }

  //Check if authorised
  if (userRole === "ADMIN" && pathname === "/admin-dashboard") {
    const loginUrl = new URL("/admin-dashboard", request.url);
    return NextResponse.redirect(loginUrl);
    
  } else if (userRole === "DRIVER" && pathname === "/driver-portal") {
    const loginUrl = new URL("/driver-portal", request.url);
    return NextResponse.redirect(loginUrl);

  } else if (userRole === "OWNER" && pathname === "/owner-portal") {
    const loginUrl = new URL("/owner-portal", request.url);
    return NextResponse.redirect(loginUrl);
    
  } else {
    //Show Unauthorised page
    const loginUrl = new URL("/unauthorised");
    NextResponse.redirect(loginUrl);
  }
    return NextResponse.next(); 
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", pathname);

  // Wipe out cookies upon forced logout to keep state clean
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  return response;
}

// Optimize middleware execution by matching only application routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
