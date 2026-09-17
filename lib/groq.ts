import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Text Reasoning / Extraction using Groq
 */
export async function invokeGroqText(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const messages: Array<{ role: "system" | "user"; content: string }> = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    const completion = await groq.chat.completions.create({
      messages,
      model: process.env.GROQ_MODEL_ID_TEXT || "openai/gpt-oss-120b", // current Groq flagship text model
      temperature: 0.1,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error: unknown) {
    console.error("Groq Text Error:", error);
    throw error;
  }
}

/**
 * Vision Analysis using Groq
 */
export async function invokeGroqVision(base64Image: string, prompt: string): Promise<string> {
  try {
    const cleanBase64 = base64Image.includes("base64,")
      ? base64Image.split("base64,")[1]
      : base64Image;

    const mimeType = base64Image.startsWith("data:image/png") ? "image/png" : "image/jpeg";

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${cleanBase64}`,
              },
            },
          ],
        },
      ],
      model: process.env.GROQ_MODEL_ID_VISION || "qwen/qwen3.6-27b", // verify exact current vision model at console.groq.com/docs/models
      temperature: 0.1,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error: unknown) {
    console.error("Groq Vision Error:", error);
    throw error;
  }
}

/**
 * Audio Transcription using Groq Whisper
 */
export async function transcribeGroqAudio(file: File): Promise<string> {
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3",
    });

    return transcription.text;
  } catch (error: unknown) {
    console.error("Groq Audio Error:", error);
    throw error;
  }
}