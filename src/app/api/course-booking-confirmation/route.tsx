import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import CourseBookingConfirmationEmail from '@/templates/course-booking-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();

    await resend.emails.send({
      from: 'Drive 2 Learn <info@drive2learn.co.uk>',
      to: email,
      subject: 'Your Course Booking Request',
      react: CourseBookingConfirmationEmail({
        name,
        phone,
        email,
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
