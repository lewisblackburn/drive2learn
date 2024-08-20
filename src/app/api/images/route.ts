import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  try {
    const { data: images, error: imagesError } = await supabase
      .from('images')
      .select('*')
      .order('created_at', { ascending: false });

    if (imagesError) {
      return NextResponse.json(
        { message: imagesError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
