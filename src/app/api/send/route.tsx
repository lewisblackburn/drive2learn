import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import ContactEmail from '@/templates/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'info@drive2learn.co.uk',
      to: ['info@drive2learn.co.uk'],
      subject: body.subject,
      react: ContactEmail(body),
    });

    if (error) {
      return NextResponse.json(
        { message: 'Error sending email' },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Success', data });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 400 },
    );
  }
}
