import { NextResponse } from "next/server";
import { invokeGroqText } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { claimId, reason } = await req.json();

    const prompt = `Draft a formal grievance appeal letter for the PMFBY (Pradhan Mantri Fasal Bima Yojana) insurance company.
    
Claim ID: ${claimId}
Reason for Rejection/Grievance: ${reason}

Write a formal, persuasive, and legally sound letter (max 250 words) from the perspective of an Indian farmer to the insurance grievance officer. Request an immediate reassessment.`;

    const appealText = await invokeGroqText(prompt, "You are a professional legal advocate for farmers in India.");

    return NextResponse.json({ appeal: appealText });
  } catch (error) {
    console.error("Generate Appeal Error:", error);
    return NextResponse.json({ error: "Failed to generate appeal" }, { status: 500 });
  }
}
