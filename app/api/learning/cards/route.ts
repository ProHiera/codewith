import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, type, front_content, back_content, tags, difficulty, category } = body;

    // Validation
    if (!title || !type || !front_content) {
      return NextResponse.json(
        { error: 'Title, type, and front_content are required' },
        { status: 400 }
      );
    }

    // Insert learning card
    const { data, error } = await supabase
      .from('learning_cards')
      .insert({
        user_id: user.id,
        title,
        type,
        front_content,
        back_content,
        tags: tags || [],
        difficulty,
        category,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(newCard);
  } catch (error) {
    // Silent fail - return error response to client
    return NextResponse.json(
      { error: 'Failed to create learning card' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const is_mastered = searchParams.get('is_mastered');

    let query = supabase
      .from('learning_cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    if (is_mastered !== null) {
      query = query.eq('is_mastered', is_mastered === 'true');
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch {
    // Silent fail - return error response to client
    return NextResponse.json(
      { error: 'Failed to fetch learning cards' },
      { status: 500 }
    );
  }
}
