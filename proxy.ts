import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasToken = request.cookies.has('refreshToken');

  const isPrivateRoute =
    pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

  const isPublicOnlyRoute = pathname === '/' || pathname === '/signup';

  if (isPrivateRoute && !hasToken) {
    const loginUrl = new URL('/', request.url);

    // loginUrl.searchParams.set('from', pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (isPublicOnlyRoute && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
