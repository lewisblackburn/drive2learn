// hooks/useSupabase.js
import { UserResponse } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

export function useSupabase(): { user: Promise<UserResponse> | null } {
  const supabase = createClient();
  const user = supabase.auth.getUser();

  return { user };
}
