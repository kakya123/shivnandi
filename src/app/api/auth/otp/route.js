import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    const data = await getDbData();
    
    // Check if email matches contact email or target user email
    const targetEmail = 'kakya1123@gmail.com';
    const contactEmail = data.content?.contactEmail;

    if (email !== targetEmail && email !== contactEmail) {
      return NextResponse.json({ error: 'Unauthorized email address' }, { status: 401 });
    }

    // Generate a new random password
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Save New Password to DB
    data.password = newPassword;
    await saveDbData(data);

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: 'Shivnandi Restaurant CMS',
      to: email,
      subject: 'Your New CMS Password',
      text: `Hello, \n\nYour Shivnandi CMS password has been reset. \n\nNew Password: ${newPassword}\n\nPlease log in and change this password from settings if needed.\n\nRegards,\nShivnandi Backend`
    };

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Missing Email Credentials");
      }
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.log('----------------------------------------------------');
      console.log(`[PASS RESET] New Password for ${email}: ${newPassword}`);
      console.log(`[ERROR] Email failed to send: ${e.message}`);
      console.log('----------------------------------------------------');
      // Even if email fails, in dev/logs we show the password so the user isn't locked out
      return NextResponse.json({ 
        success: true, 
        message: 'Password reset successful. Since Email credentials are not configured in Vercel, the new password has been logged to Server Logs for recovery.',
        debugPassword: process.env.NODE_ENV === 'development' ? newPassword : null
      });
    }
    
    return NextResponse.json({ success: true, message: 'A new password has been sent to your email address.' });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
