import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import ContactEmail from '@/templates/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      // This will need to be changed when verifying your domain
      from: 'Acme <onboarding@resend.dev>',
      // Add all the emails you want to send to here
      to: ['delivered@resend.dev'],
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
