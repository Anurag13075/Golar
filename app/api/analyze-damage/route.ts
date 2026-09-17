import { NextResponse } from "next/server";
import { invokeGroqVision } from "@/lib/groq";
import { PHOTO_ANALYSIS_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const rawResponse = await invokeGroqVision(image, PHOTO_ANALYSIS_PROMPT);
    
    // Clean JSON response (strip markdown backticks if present)
    let cleanedResponse = rawResponse;
    const jsonMatch = rawResponse.match(/```json\n([\s\S]*)\n```/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[1];
    } else {
      cleanedResponse = rawResponse.replace(/```/g, "").trim();
    }

    const analysis = JSON.parse(cleanedResponse);

    return NextResponse.json({ analysis });

  } catch (error: any) {
    console.error("Vision Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze photo" }, { status: 500 });
  }
}
