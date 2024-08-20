import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  try {
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (servicesError) {
      return NextResponse.json(
        { message: servicesError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
