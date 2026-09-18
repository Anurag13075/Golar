import { NextResponse } from "next/server";
import { transcribeGroqAudio, invokeGroqText } from "@/lib/groq";
import { NOVA_PROMPTS } from "@/lib/prompts";

export async function POST(req: Request) {
  try {
    let transcript: string;
    if (req.headers.get("content-type")?.includes("application/json")) {
      const { manualText } = await req.json();
      if (typeof manualText !== "string" || !manualText.trim()) {
        return NextResponse.json({ error: "No description provided" }, { status: 400 });
      }
      transcript = manualText.trim();
    } else {
      const formData = await req.formData();
      const audioFile = formData.get("audio");
      if (!(audioFile instanceof File) || audioFile.size === 0) {
        return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
      }
      transcript = await transcribeGroqAudio(audioFile);
    }

    // Extract structured data from either the transcription or manually entered text.
    const extractionPrompt = `Here is the transcribed text of the farmer's report. Please extract the details according to the system prompt guidelines.\n\nTranscription:\n"${transcript}"`;
    
    let rawResponse = await invokeGroqText(extractionPrompt, NOVA_PROMPTS.EXTRACTION_SYSTEM);
    
    // Clean JSON response (strip markdown backticks if present)
    const jsonMatch = rawResponse.match(/```json\n([\s\S]*)\n```/);
    if (jsonMatch) {
      rawResponse = jsonMatch[1];
    } else {
      rawResponse = rawResponse.replace(/```/g, "").trim();
    }

    const extractedData = JSON.parse(rawResponse) as {
      text?: string;
      extracted?: {
        crop?: string | null;
        damage_type?: string | null;
        damage_date?: string | null;
        date_mentioned?: string | null;
        location_mentioned?: string | null;
        severity_described?: string | null;
        additional_details?: string | null;
      };
      confidence?: number;
    };

    return NextResponse.json({
      text: extractedData.text || transcript,
      language: "en",
      extracted: {
        crop: extractedData.extracted?.crop || undefined,
        damage_type: extractedData.extracted?.damage_type || undefined,
        damage_date: extractedData.extracted?.damage_date || extractedData.extracted?.date_mentioned || undefined,
        location_mentioned: extractedData.extracted?.location_mentioned || undefined,
        severity_described: extractedData.extracted?.severity_described || undefined,
        additional_details: extractedData.extracted?.additional_details || undefined,
      },
      confidence: extractedData.confidence ?? 0,
    });

  } catch (error) {
    console.error("Transcription/Extraction Error:", error);
    return NextResponse.json({ error: "Failed to process audio report" }, { status: 500 });
  }
}

