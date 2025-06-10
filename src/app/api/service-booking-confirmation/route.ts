import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import ServiceBookingConfirmationEmail from '@/templates/service-booking-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: 'Drive 2 Learn <info@drive2learn.co.uk>',
      to: email,
      subject: 'Your Service Booking Request',
      react: ServiceBookingConfirmationEmail({
        name,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 },
    );
  }
}
