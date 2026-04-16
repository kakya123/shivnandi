import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  console.log('Proxy path:', url.pathname);
  
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const authCookie = request.cookies.get('admin_auth');
    if (!authCookie || authCookie.value !== 'true') {
      console.log('Unauthorized access to admin, redirecting to login');
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
