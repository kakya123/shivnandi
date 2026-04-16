import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const authCookie = request.cookies.get('admin_auth');
    if (!authCookie || authCookie.value !== 'true') {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: '/admin/:path*',
};
