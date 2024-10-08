import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import ContactEmail from '@/templates/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'info@drive2learn.co.uk',
      // Add all the emails you want to send to here
      // to: ['drive2learn.alex@gmail.com', 'info@drive2learn.co.uk'],
      to: ['drive2learn.test@gmail.com'],
      subject: body.subject,
      react: ContactEmail(body),
    });

    // console.log(data, error);

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
