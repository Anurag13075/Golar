import { NextResponse } from 'next/server';
import { getMockClaim, getMockMismatchChecks } from '@/lib/mock';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { voice_data, damage_analysis, photos, damage_date } = body;
    
    if (!voice_data || !damage_analysis) {
      return NextResponse.json({ success: false, error: 'Missing required data' }, { status: 400 });
    }

    // TODO: Build claim from data, run rules engine, store in DynamoDB
    const claim = getMockClaim();
    const mismatch_checks = getMockMismatchChecks();

    return NextResponse.json({ success: true, data: { claim, mismatch_checks } });
  } catch (error) {
    console.error('Build claim error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
