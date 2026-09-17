import { NextResponse } from "next/server";
import { invokeNovaText } from "@/lib/bedrock";
import { NOVA_PROMPTS } from "@/lib/prompts";
import { getMockTranscription } from "@/lib/mock";

export async function POST(req: Request) {
  try {
    // We can receive either JSON with { manualText: string } 
    // OR FormData with an audio file
    const contentType = req.headers.get("content-type") || "";
    
    let transcriptionText = "";

    if (contentType.includes("application/json")) {
      const { manualText } = await req.json();
      transcriptionText = manualText;
    } else if (contentType.includes("multipart/form-data")) {
      // In a full production AWS architecture, we would upload this audio Blob to S3, 
      // trigger an Amazon Transcribe job, and await the result.
      // For this hackathon scope, we'll simulate the AWS Transcribe output for audio.
      transcriptionText = "कल रात भारी ओलावृष्टि से मेरी गेहूं की फसल पूरी तरह नष्ट हो गई है। लगभग 70 प्रतिशत नुकसान हुआ है।"; 
    }

    if (!transcriptionText) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    // Check if AWS credentials are set, otherwise fallback to mock
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.warn("AWS credentials missing, falling back to mock extraction data");
      return NextResponse.json(getMockTranscription(transcriptionText));
    }

    const prompt = `Extract the crop damage details from this farmer's report. Report: "${transcriptionText}"`;
    
    let resultText = await invokeNovaText(prompt, NOVA_PROMPTS.EXTRACTION_SYSTEM);

    // Clean up potential markdown wrappers
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    const analysis = JSON.parse(resultText);
    
    // Ensure we maintain the text property required by the frontend
    if (!analysis.text) {
      analysis.text = transcriptionText;
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Transcription/Extraction Error:", error);
    return NextResponse.json(getMockTranscription("Error processing request."));
  }
}
