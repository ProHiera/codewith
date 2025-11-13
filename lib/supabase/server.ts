import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();
  // createServerComponentClient expects a cookies function that returns a Promise-like value
  return createServerComponentClient({ cookies: async () => cookieStore });
};
