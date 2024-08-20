import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

// Get today's date and the date one month ago
const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

// Format the dates to ISO strings (supabase stores dates in ISO format)
const todayISOString = today.toISOString();
const oneMonthAgoISOString = oneMonthAgo.toISOString();

export async function GET() {
  const supabase = createClient();

  try {
    // Fetch reviews from the last month
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('*')
      .gte('created_at', oneMonthAgoISOString) // Filter reviews created after one month ago
      .lte('created_at', todayISOString) // Optional: Ensure reviews are up to today
      .order('created_at', { ascending: false });

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
