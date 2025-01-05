import{ type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
 
  // const prodSessionCookie = request.cookies.get("__Secure-next-auth.session-token")
  const devSessionCookie = request.cookies.get("next-auth.session-token")

  const isSignedIn = !!devSessionCookie


  if (isSignedIn && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/account", request.url))
  }


  if (!isSignedIn && pathname === "/account") {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/signin", "/signup", "/account"],
}
