import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function PUT(request: Request) {
  const supabase = createClient();

  try {
    const { id, newData } = await request.json();

    if (!id || !newData) {
      return NextResponse.json(
        { message: 'ID and new data are required' },
        { status: 400 },
      );
    }

    // Perform the update
    const { data: updatedService, error: updateError } = await supabase
      .from('services')
      .update(newData)
      .eq('id', id) // Use eq for matching the ID
      .single(); // Expect a single row to be updated

    if (updateError) {
      return NextResponse.json(
        { message: updateError.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ updatedService });
  } catch (error) {
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
