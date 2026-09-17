import { NextResponse } from "next/server";
import { invokeGroqText } from "@/lib/groq";

const AGENT_PROMPTS: Record<string, string> = {
  advocate: "You are the 'Claim Advocate' AI for farmers in India. Your goal is to help them understand PMFBY insurance rules, draft appeals for rejected claims, and give them confidence to fight unfair rejections. Be deeply empathetic, use formal but simple language, and always side with the farmer. Keep responses concise.",
  doctor: "You are the 'Crop Doctor' AI. A farmer is asking for your help diagnosing crop diseases or pest attacks. Ask clarifying questions about the symptoms if needed. Recommend affordable, locally available (in India) organic or chemical treatments. Keep responses concise and practical.",
  mandi: "You are the 'Mandi Trader' AI. Help farmers understand MSP and market decisions in India. Never invent or claim current prices. If live mandi data is not supplied, say that current prices are unavailable and ask for the farmer's market and crop. Keep responses concise and business-focused.",
  subsidy: "You are the 'Scheme Finder' AI. You help Indian farmers discover state and central government subsidies (like PM-KISAN, KCC, state-specific schemes). Ask for their land size and state, and suggest 2-3 relevant schemes they can apply for today. Keep responses concise and actionable."
};

export async function POST(req: Request) {
  try {
    const { agentId, message, history } = await req.json();

    if (!message || !agentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Object.prototype.hasOwnProperty.call(AGENT_PROMPTS, agentId)) {
      return NextResponse.json({ error: "Unknown agent" }, { status: 404 });
    }
    const systemPrompt = AGENT_PROMPTS[agentId];
    
    const conversationHistory = Array.isArray(history) ? history as Array<{ role: "user" | "agent"; content: string }> : [];
    const historyText = conversationHistory
      .slice(-4) 
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");
      
    const finalPrompt = `Previous Conversation:\n${historyText}\n\nUSER'S NEW MESSAGE:\n${message}\n\nPlease respond as the AI agent based on your system instructions. Do NOT use JSON formatting, just respond with conversational text.`;

    const resultText = await invokeGroqText(finalPrompt, systemPrompt);

    return NextResponse.json({ reply: resultText });
  } catch (error) {
    console.error("Agent Chat Error:", error);
    return NextResponse.json({ 
      error: "Failed to communicate with Groq AI" 
    }, { status: 500 });
  }
}
