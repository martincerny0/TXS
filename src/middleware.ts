import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const signedIn = !!request.cookies.get('authToken');

  // if not signedin, redirect to signin page
  if (pathname.startsWith('/account') && !signedIn) {
      return NextResponse.redirect(new URL('/signin', request.url));
  }


  // if signed in, redirect to account page
  if (pathname.startsWith('/signin') && signedIn) {
    return NextResponse.redirect(new URL('/account', request.url));
  }
  if (pathname.startsWith('/signup') && signedIn) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Allow access for other routes
  return NextResponse.next();
}

// export const config = {
//   matcher: ['/account/:path*'],
// };
