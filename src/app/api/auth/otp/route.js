import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    const data = await getDbData();
    
    // Verify if email matches the authorized contactEmail in DB
    if (email !== data.content.contactEmail) {
      return NextResponse.json({ error: 'Unauthorized email address' }, { status: 401 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save to DB
    data.otp = otp;
    data.otpExpires = otpExpires;
    await saveDbData(data);

    // Setup Nodemailer (User needs to configure real credentials later)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your_email@gmail.com',  
        pass: process.env.EMAIL_PASS || 'your_app_password'
      }
    });

    const mailOptions = {
      from: 'Shivnandi CMS System',
      to: email,
      subject: 'Shivnandi CMS - Password Reset OTP',
      text: `Your OTP for resetting the CMS password is: ${otp}. It is valid for 10 minutes.`
    };

    // We will attempt to send. If credentials are fake, we just print to console for local testing.
    try {
      if (!process.env.EMAIL_USER) throw new Error("No Email Credentials - Mocking");
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.log('----------------------------------------------------');
      console.log(`[DEVELOPMENT MODE] OTP Generated for ${email}: ${otp}`);
      console.log('----------------------------------------------------');
    }
    
    return NextResponse.json({ success: true, message: 'OTP sent to email (Check Server Console in Dev Mode)' });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
