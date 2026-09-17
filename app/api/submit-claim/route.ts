import { NextResponse } from 'next/server';
import { saveClaimToDynamo } from "@/lib/dynamodb";
import type { Claim } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claim } = body;
    
    if (!claim) {
      return NextResponse.json({ success: false, error: 'No claim provided' }, { status: 400 });
    }

    const submittedClaim: Claim = {
      ...claim,
      status: "submitted",
      updated_at: new Date().toISOString(),
    };
    await saveClaimToDynamo(submittedClaim);

    return NextResponse.json({
      success: true,
      data: { reference_number: submittedClaim.reference_number, claim_id: submittedClaim.id },
    });
  } catch (error) {
    console.error('Submit claim error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
