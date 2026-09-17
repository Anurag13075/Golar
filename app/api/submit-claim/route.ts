import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claim } = body;
    
    if (!claim) {
      return NextResponse.json({ success: false, error: 'No claim provided' }, { status: 400 });
    }

    // TODO: Save to DynamoDB, trigger Step Functions workflow
    const reference_number = `PMFBY-${new Date().getFullYear()}-RJ-${Math.floor(10000 + Math.random() * 90000)}`;
    const claim_id = `claim-${Date.now()}`;

    return NextResponse.json({ success: true, data: { reference_number, claim_id } });
  } catch (error) {
    console.error('Submit claim error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
