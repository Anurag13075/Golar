import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference_number, language } = body;
    
    if (!reference_number) {
      return NextResponse.json({ success: false, error: 'No reference number provided' }, { status: 400 });
    }

    // TODO: Call Amazon Polly with Hindi voice, return audio stream
    const text = language === 'hi' 
      ? `आपका दावा सफलता पूर्वक दर्ज कर लिया गया है। आपका संदर्भ संख्या ${reference_number} है।`
      : `Your claim has been successfully submitted. Your reference number is ${reference_number}.`;

    return NextResponse.json({ success: true, data: { text, audio_url: null } });
  } catch (error) {
    console.error('Speak confirmation error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
