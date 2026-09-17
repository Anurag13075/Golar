import { NextResponse } from 'next/server';
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

const polly = new PollyClient({ region: process.env.MY_AWS_REGION || process.env.AWS_REGION });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference_number, language } = body;
    
    if (!reference_number) {
      return NextResponse.json({ success: false, error: 'No reference number provided' }, { status: 400 });
    }

    const text = language === 'hi' 
      ? `आपका दावा सफलता पूर्वक दर्ज कर लिया गया है। आपका संदर्भ संख्या ${reference_number} है।`
      : `Your claim has been successfully submitted. Your reference number is ${reference_number}.`;

    const result = await polly.send(new SynthesizeSpeechCommand({
      Text: text,
      OutputFormat: "mp3",
      VoiceId: language === "hi" ? "Aditi" : "Raveena",
      LanguageCode: language === "hi" ? "hi-IN" : "en-IN",
    }));
    if (!result.AudioStream) {
      throw new Error("Polly returned no audio");
    }
    const audioBytes = await result.AudioStream.transformToByteArray();
    return NextResponse.json({
      success: true,
      data: { text, audio_base64: Buffer.from(audioBytes).toString("base64"), content_type: "audio/mpeg" },
    });
  } catch (error) {
    console.error('Speak confirmation error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
