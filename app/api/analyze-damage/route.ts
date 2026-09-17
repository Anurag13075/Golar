import { NextResponse } from "next/server";
import { invokeNovaVision } from "@/lib/bedrock";
import { NOVA_PROMPTS } from "@/lib/prompts";
import { getMockDamageAnalysis } from "@/lib/mock";

export async function POST(req: Request) {
  try {
    const { image, mimeType } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Check if AWS credentials are set, otherwise fallback to mock
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn("AWS credentials missing, falling back to mock vision data");
      return NextResponse.json(getMockDamageAnalysis());
    }

    const prompt = "Analyze this crop field photo. Identify the crop, the type of damage, and estimate the percentage of damage (0-100). Respond ONLY with the requested JSON.";
    
    let resultText = await invokeNovaVision(
      prompt, 
      image, 
      mimeType || "image/jpeg", 
      NOVA_PROMPTS.VISION_SYSTEM
    );

    // Clean up potential markdown wrappers Nova might add despite instructions
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    const analysis = JSON.parse(resultText);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    // Graceful fallback for hackathon demo
    return NextResponse.json(getMockDamageAnalysis());
  }
}
