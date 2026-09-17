import { NextResponse } from "next/server";
import { transcribeGroqAudio, invokeGroqText } from "@/lib/groq";
import { DAMAGE_EXTRACTION_PROMPT } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // 1. Transcribe audio using Groq Whisper
    // We need to convert Blob to File for Groq SDK
    const file = new File([audioFile], "audio.webm", { type: audioFile.type });
    const transcript = await transcribeGroqAudio(file);

    // 2. Extract structured data using Groq Text
    const extractionPrompt = `Here is the transcribed text of the farmer's report. Please extract the details according to the system prompt guidelines.\n\nTranscription:\n"${transcript}"`;
    
    let rawResponse = await invokeGroqText(extractionPrompt, DAMAGE_EXTRACTION_PROMPT);
    
    // Clean JSON response (strip markdown backticks if present)
    const jsonMatch = rawResponse.match(/```json\n([\s\S]*)\n```/);
    if (jsonMatch) {
      rawResponse = jsonMatch[1];
    } else {
      rawResponse = rawResponse.replace(/```/g, "").trim();
    }

    const extractedData = JSON.parse(rawResponse);

    return NextResponse.json({
      transcript: transcript,
      extractedData: extractedData
    });

  } catch (error: any) {
    console.error("Transcription/Extraction Error:", error);
    return NextResponse.json({ error: "Failed to process audio report" }, { status: 500 });
  }
}
