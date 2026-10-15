import { NextResponse } from 'next/server';
import { createExpertApplication } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createExpertApplication(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      expertId: result.expertId,
      applicationId: result.applicationId,
      message: 'Application received. Pending administrative review.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
