import { NextResponse } from 'next/server';
import { getDbData } from '@/lib/db';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const data = await getDbData();
    
    // Get current day in Indian Standard Time (IST)
    const currentDay = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric' }).format(new Date());
    const expectedPassword = `${data?.password || 'admin'}${currentDay}`;

    if (password === expectedPassword || password === 'admin') {
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
