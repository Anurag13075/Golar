import { NextResponse } from "next/server";
import { invokeNovaText } from "@/lib/bedrock";
import { NOVA_PROMPTS } from "@/lib/prompts";
import { getMockAppeal } from "@/lib/mock";
import type { Claim } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { claim } = await req.json() as { claim: Claim };

    if (!claim) {
      return NextResponse.json({ error: "No claim provided" }, { status: 400 });
    }

    // Check if AWS credentials are set, otherwise fallback to mock
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn("AWS credentials missing, falling back to mock appeal data");
      return NextResponse.json(getMockAppeal());
    }

    const prompt = `Draft a grievance appeal for the following rejected PMFBY claim.
Claim Ref: ${claim.reference_number}
Farmer: ${claim.policy.farmer_name}
Crop: ${claim.policy.crop}
Damage Date: ${claim.damage_date}
Rejection Reason: ${claim.rejection_reason}

Write a persuasive, formal letter to the District Level Monitoring Committee (DLMC) requesting an overturn of this rejection. Cite specific rules from the operational guidelines.`;
    
    let resultText = await invokeNovaText(prompt, NOVA_PROMPTS.APPEAL_SYSTEM);

    // Clean up potential markdown wrappers
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    const appeal = JSON.parse(resultText);
    return NextResponse.json(appeal);
  } catch (error) {
    console.error("Appeal Generation Error:", error);
    return NextResponse.json(getMockAppeal());
  }
}
