import { NextResponse } from 'next/server';
import { getDbData } from '@/lib/db';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const data = await getDbData();
    
    if (password === data?.password) {
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'admin_auth',
        value: 'true',
        path: '/',
        maxAge: 86400, // 1 day
      });
      return response;
    }
    
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_auth');
  return response;
}
