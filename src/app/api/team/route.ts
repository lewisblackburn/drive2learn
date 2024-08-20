import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  try {
    const { data: team, error: teamError } = await supabase
      .from('team')
      .select('*')
      .order('created_at', { ascending: false });

    if (teamError) {
      return NextResponse.json({ message: teamError.message }, { status: 400 });
    }

    return NextResponse.json({ team });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
