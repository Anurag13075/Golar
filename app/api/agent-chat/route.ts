import { NextResponse } from "next/server";
import { invokeNovaText } from "@/lib/bedrock";

const AGENT_PROMPTS: Record<string, string> = {
  advocate: "You are the 'Claim Advocate' AI for farmers in India. Your goal is to help them understand PMFBY insurance rules, draft appeals for rejected claims, and give them confidence to fight unfair rejections. Be deeply empathetic, use formal but simple language, and always side with the farmer. Keep responses concise.",
  doctor: "You are the 'Crop Doctor' AI. A farmer is asking for your help diagnosing crop diseases or pest attacks. Ask clarifying questions about the symptoms if needed. Recommend affordable, locally available (in India) organic or chemical treatments. Keep responses concise and practical.",
  mandi: "You are the 'Mandi Trader' AI. You help farmers decide when and where to sell their crops based on market trends and MSP (Minimum Support Price) in India. Offer hypothetical current prices for common crops like Wheat, Rice, Cotton, Soybean to illustrate your point. Keep responses concise and business-focused.",
  subsidy: "You are the 'Scheme Finder' AI. You help Indian farmers discover state and central government subsidies (like PM-KISAN, KCC, state-specific schemes). Ask for their land size and state, and suggest 2-3 relevant schemes they can apply for today. Keep responses concise and actionable."
};

export async function POST(req: Request) {
  try {
    const { agentId, message, history } = await req.json();

    if (!message || !agentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const systemPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.advocate;
    
    // Construct the conversation history for Nova
    // Note: To keep it simple for the hackathon, we'll format the history into the current prompt
    // In a production app, we would pass the actual message history array to the Converse API.
    const historyText = history
      .slice(-4) // Only take last 4 messages to save context
      .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");
      
    const finalPrompt = `Previous Conversation:\n${historyText}\n\nUSER'S NEW MESSAGE:\n${message}\n\nPlease respond as the AI agent based on your system instructions. Do NOT use JSON formatting, just respond with conversational text.`;

    // Check if AWS credentials are set, otherwise fallback to mock
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      // Mock response for hackathon safety
      await new Promise(r => setTimeout(r, 1500));
      return NextResponse.json({ 
        reply: `(MOCK MODE) I am the ${agentId} agent. I hear you saying: "${message}". Please configure your AWS keys in .env.local to connect me to Amazon Nova!` 
      });
    }
    
    const resultText = await invokeNovaText(finalPrompt, systemPrompt);

    return NextResponse.json({ reply: resultText });
  } catch (error) {
    console.error("Agent Chat Error:", error);
    return NextResponse.json({ 
      reply: "I'm having trouble connecting to my knowledge base right now. Please try again." 
    });
  }
}
