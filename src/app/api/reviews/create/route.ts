import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json(); // Parse JSON directly

    const supabase = createClient();

    const { error } = await supabase
      .from('reviews')
      .insert([{ name, description }])
      .select();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Review uploaded successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
