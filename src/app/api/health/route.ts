import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/store';
import { isSupabaseConfigured, isSupabaseServiceConfigured } from '@/lib/supabase';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    demoMode: isDemoMode(),
    supabaseConfigured: isSupabaseConfigured,
    supabaseServiceConfigured: isSupabaseServiceConfigured,
    version: '1.0.0',
    platform: 'Find Ai Pros Directory',
  });
}
