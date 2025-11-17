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

    const { question_id, selected_answer, time_spent } = await request.json();

    if (!question_id || selected_answer === undefined) {
      return NextResponse.json(
        { error: 'question_id and selected_answer are required' },
        { status: 400 }
      );
    }

    // Get question
    const { data: question, error: questionError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('id', question_id)
      .single();

    if (questionError || !question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const is_correct = question.correct_answer === selected_answer;

    // Save result
    const { data: result, error: resultError } = await supabase
      .from('quiz_results')
      .insert({
        user_id: user.id,
        question_id,
        selected_answer,
        is_correct,
        time_spent,
      })
      .select()
      .single();

    if (resultError) throw resultError;

    // Update user progress (XP)
    if (is_correct) {
      const xp_earned = question.difficulty === 'hard' ? 15 : question.difficulty === 'medium' ? 10 : 5;

      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (progress) {
        await supabase
          .from('user_progress')
          .update({
            total_xp: progress.total_xp + xp_earned,
            current_level: Math.floor((progress.total_xp + xp_earned) / 100) + 1,
          })
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_xp: xp_earned,
            current_level: 1,
          });
      }
    }

    return NextResponse.json({
      ...result,
      is_correct,
      correct_answer: question.correct_answer,
      explanation: question.explanation,
    });
  } catch (error) {
    console.error('Submit Quiz Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
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
    const mission_id = searchParams.get('mission_id');
    const difficulty = searchParams.get('difficulty');
    const limit = searchParams.get('limit') || '10';

    let query = supabase
      .from('quiz_questions')
      .select('*')
      .limit(parseInt(limit));

    if (mission_id) {
      query = query.eq('mission_id', mission_id);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Get Quiz Questions Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz questions' },
      { status: 500 }
    );
  }
}
