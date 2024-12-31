import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (!request.cookies.has('refreshToken')) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/add-chat-link',
    '/add-profile',
    '/add-time',
    '/auth-done',
    '/signup/:path*',
    '/order/:path*',
    '/mypage/edit',
    '/junior/:path*',
    '/salary/:path*',
    '/order/confirm',
    '/pay/result',
    '/profile/done',
    '/senior/:path*',
    '/signout/:path*',
    '/mentoring-apply/:path*',
  ],
};
