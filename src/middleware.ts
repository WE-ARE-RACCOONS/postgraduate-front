import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(request);
  if (request.nextUrl.pathname.includes('mentoring-apply')) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/mentoring-apply/:path*'],
};
