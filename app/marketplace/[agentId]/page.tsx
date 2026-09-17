"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, Sparkles, Loader2, Bot, Shield, Sprout, LineChart } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import { useParams } from "next/navigation";

const AGENT_DATA = {
  advocate: { name: "Claim Advocate", icon: Shield, color: "text-blue-500", bg: "bg-blue-50", greeting: "Hello! I am your PMFBY Claim Advocate. Tell me about your rejected claim or policy details, and I will draft an appeal or check your eligibility." },
  doctor: { name: "Crop Doctor", icon: Sprout, color: "text-emerald-500", bg: "bg-emerald-50", greeting: "Namaste! Describe your crop's symptoms or upload a photo, and I'll diagnose the issue and suggest local treatments." },
  mandi: { name: "Mandi Trader", icon: LineChart, color: "text-amber-500", bg: "bg-amber-50", greeting: "Ram Ram! Which crop are you looking to sell? I can check the latest MSP and nearby Mandi rates for you." },
  subsidy: { name: "Scheme Finder", icon: Bot, color: "text-purple-500", bg: "bg-purple-50", greeting: "Hello! Tell me your land size, state, and category (e.g., Small Farmer), and I'll find government schemes you can claim today." },
};

export default function AgentChatPage() {
  const params = useParams();
  const agentId = params.agentId as keyof typeof AGENT_DATA;
  const configuredAgent = AGENT_DATA[agentId];
  const agent = configuredAgent || AGENT_DATA.advocate;
  const Icon = agent.icon;

  const [messages, setMessages] = useState<{role: "user"|"agent", content: string}[]>([
    { role: "agent", content: agent.greeting }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, message: userMsg, history: messages })
      });
      
      const data = await res.json();
      if (!res.ok || typeof data.reply !== "string") {
        throw new Error(data.error || "Agent request failed");
      }
      setMessages(prev => [...prev, { role: "agent", content: data.reply }]);
    } catch (err) {
      console.error("Agent chat failed:", err);
      setMessages(prev => [...prev, { role: "agent", content: "The agent is unavailable. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!configuredAgent) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agent not found</h1>
          <Link href="/marketplace" className="text-blue-600 font-semibold">Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 pt-28 pb-32 flex flex-col">
        <Link href="/marketplace" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Marketplace
        </Link>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-100 p-6 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${agent.color}`} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">{agent.name}</h2>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-xs font-bold text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Powered by Amazon Nova
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-slate-100 text-slate-800 rounded-bl-none"
                  }`}>
                    {msg.role === "agent" && i === messages.length - 1 && !isLoading ? (
                      <TypewriterText text={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                    <span className="text-sm font-medium text-slate-500">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={sendMessage} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Ask ${agent.name} anything...`}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-full pl-6 pr-14 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple typewriter effect for the AI responses
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
  const resetTimer = setTimeout(() => setDisplayed(""), 0);
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 15);
    return () => {
      clearTimeout(resetTimer);
      clearInterval(timer);
    };
  }, [text]);

  return <p className="whitespace-pre-wrap font-medium">{displayed}</p>;
}
