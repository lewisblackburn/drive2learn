import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const supabase = createClient();

  try {
    const { error } = await supabase.from('team').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
