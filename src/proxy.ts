import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isLoggedIn = request.cookies.get('isLoggedIn');

    // Protect any route deeper than /developers
    if (pathname.startsWith('/developers/') && !isLoggedIn) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/developers/:path*'],
};
