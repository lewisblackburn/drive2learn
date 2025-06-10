import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import ContactEmail from '@/templates/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();

    await resend.emails.send({
      from: 'Drive 2 Learn <info@drive2learn.co.uk>',
      to: 'info@drive2learn.co.uk',
      subject: 'New Contact Form Submission',
      react: ContactEmail({
        name,
        phone,
        email,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
