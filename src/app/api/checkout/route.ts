import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'querystring';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { origin } = new URL(req.url);

    const body = await req.text();
    const parsedBody = parse(body);
    const priceId = parsedBody.priceId as string;
    const intensive = parsedBody.intensive === 'on';

    // Validate the priceId
    if (!priceId) {
      return new NextResponse(
        JSON.stringify({ error: 'Price ID is required' }),
        {
          status: 400,
        },
      );
    }

    // Create the checkout session with a custom description
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Use the priceId passed in the request body
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        description: `
        Course Payment - Intensive: ${intensive ? 'Yes' : 'No'}
        `,
      },
      success_url: `${origin}/success?success=true`,
      cancel_url: `${origin}/error?canceled=true`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.statusCode || 500,
    });
  }
}
