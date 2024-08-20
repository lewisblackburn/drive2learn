// price_1PkrmyK6MO17rZJ2rq5s7gpf
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'querystring';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { origin } = new URL(req.url);

    const body = await req.text();
    const parsedBody = parse(body);
    const priceId = parsedBody.priceId;

    // Validate the priceId
    if (!priceId) {
      return new NextResponse(
        JSON.stringify({ error: 'Price ID is required' }),
        {
          status: 400,
        },
      );
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId as string, // Use the priceId passed in the request body
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/book/result?success=true`,
      cancel_url: `${origin}/book/error?canceled=true`,
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
