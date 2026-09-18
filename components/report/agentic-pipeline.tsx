"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, Cpu, FileWarning, Globe, ShieldCheck } from "lucide-react";

const PIPELINE_STEPS = [
  {
    id: "boot",
    icon: Cpu,
    color: "text-slate-400",
    logs: [
      "[SYS] Initializing Multi-Agent Adjudication Pipeline...",
      "[SYS] Allocating Groq LPUs for parallel inference..."
    ],
    duration: 1500,
  },
  {
    id: "vision",
    icon: Globe,
    color: "text-emerald-400",
    logs: [
      "[VISION-AGENT] Ingesting photographic evidence...",
      "[VISION-AGENT] Running structural analysis on Triticum aestivum (Wheat)...",
      "[VISION-AGENT] MATCH: Hailstorm damage signature detected.",
      "[VISION-AGENT] Severity computed: 65% structural yield loss."
    ],
    duration: 2500,
  },
  {
    id: "agronomy",
    icon: FileWarning,
    color: "text-amber-400",
    logs: [
      "[AGRO-AGENT] Fetching satellite weather telemetry (Past 72h)...",
      "[AGRO-AGENT] Validating geographic coordinates against precipitation models...",
      "[AGRO-AGENT] CONFIRMED: Severe localized hailstorm at 26.9124° N, 75.7873° E."
    ],
    duration: 2000,
  },
  {
    id: "policy",
    icon: ShieldCheck,
    color: "text-blue-400",
    logs: [
      "[POLICY-AGENT] Cross-referencing PMFBY Operational Guidelines (Section 11.2)...",
      "[POLICY-AGENT] Verifying 72-hour reporting window...",
      "[POLICY-AGENT] Validating Aadhaar-Bank hash mappings in DynamoDB...",
      "[POLICY-AGENT] CLEAR: No discrepancies found."
    ],
    duration: 2500,
  },
  {
    id: "consensus",
    icon: CheckCircle2,
    color: "text-green-500",
    logs: [
      "[SYS] Agent consensus reached: 98.4% Confidence Score.",
      "[SYS] Cryptographically signing claim and writing to Amazon DynamoDB..."
    ],
    duration: 1500,
  }
];

export default function AgenticPipeline({ onComplete }: { onComplete: () => void }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    
    const runPipeline = async () => {
      let currentLogs: string[] = [];
      
      for (let i = 0; i < PIPELINE_STEPS.length; i++) {
        if (!isMounted) return;
        setActiveStepIndex(i);
        
        const step = PIPELINE_STEPS[i];
        const logDelay = step.duration / step.logs.length;
        
        for (const log of step.logs) {
          if (!isMounted) return;
          await new Promise(r => setTimeout(r, logDelay));
          currentLogs = [...currentLogs, log];
          setDisplayedLogs(currentLogs);
        }
      }
      
      if (isMounted) {
        setTimeout(onComplete, 1000);
      }
    };

    runPipeline();
    return () => { isMounted = false; };
  }, [onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[11px] font-mono text-slate-500 tracking-wider">AGENTIC_ADJUDICATION_KERNEL</div>
      </div>
      
      <div className="p-6">
        {/* Node Graph Visualization */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
          
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPast = idx < activeStepIndex;
            const Icon = step.icon;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: isActive || isPast ? "#111" : "#0A0A0A",
                    borderColor: isActive ? "#3B82F6" : isPast ? "#22C55E" : "rgba(255,255,255,0.1)",
                    scale: isActive ? 1.1 : 1
                  }}
                  className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors duration-500 ${isActive || isPast ? step.color : "text-white/20"}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full -z-10"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Terminal Logs */}
        <div className="bg-black/50 border border-white/5 rounded-xl p-4 h-64 overflow-y-auto font-mono text-sm shadow-inner relative flex flex-col">
          {displayedLogs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 leading-relaxed ${
                log.includes("MATCH") || log.includes("CONFIRMED") || log.includes("CLEAR") 
                  ? "text-green-400 font-bold" 
                  : log.includes("SYS")
                  ? "text-blue-400"
                  : "text-slate-300"
              }`}
            >
              <span className="opacity-50 text-slate-500 mr-2">{new Date().toISOString().split('T')[1].slice(0,8)}</span>
              {log}
            </motion.div>
          ))}
          <div className="mt-auto flex items-center gap-2 text-slate-500 pt-4">
            <span className="w-2 h-4 bg-white/40 animate-pulse" />
            <span className="text-xs">Processing via Groq LPUs...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
