import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function POST(request) {
  try {
    const { otp, newPassword } = await request.json();
    const data = await getDbData();
    
    if (!data.otp || !data.otpExpires) {
      return NextResponse.json({ error: 'No OTP requested' }, { status: 400 });
    }

    if (Date.now() > data.otpExpires) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    if (data.otp === otp) {
      // Valid OTP
      data.password = newPassword;
      // Invalidate OTP after use
      data.otp = null;
      data.otpExpires = null;
      await saveDbData(data);
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Incorrect OTP' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
