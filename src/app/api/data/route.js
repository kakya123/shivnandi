import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getDbData();
  if (!data) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PUT(request) {
  try {
    const newData = await request.json();
    const success = await saveDbData(newData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
