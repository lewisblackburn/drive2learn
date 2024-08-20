import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  try {
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (reviewError) {
      return NextResponse.json(
        { message: reviewError.message },
        { status: 400 },
      );
    }

    const { count: totalCount, error: countError } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      return NextResponse.json(
        { message: countError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ reviews, totalCount });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
