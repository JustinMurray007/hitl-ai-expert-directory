import { NextResponse } from 'next/server';
import { createMatchRequest } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createMatchRequest(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      matchId: result.matchId,
      message: 'Matchmaking inquiry received. Our team will review and introduce specialists.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
