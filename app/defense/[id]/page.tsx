"use client";

import { motion } from "motion/react";
import { Shield, CloudLightning, FileSearch, Scale, ArrowRight, Download, CheckCircle2, Bot } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/shared/navbar";

export default function AgentDefensePage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 6000),
      setTimeout(() => setStep(4), 8000),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Bot className="w-4 h-4" />
            Autonomous Agent Active
          </div>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            AI Legal Defense & Relief Maximizer
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Insurance companies use armies of lawyers and data to reject claims. We give the farmer an autonomous AI agent that fights back with satellite data, policy RAG, and multi-scheme discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Meteorological Defense */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium flex items-center gap-2 text-slate-900">
                <CloudLightning className="text-indigo-500" /> Meteorological RAG Verification
              </h2>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${step >= 1 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700 animate-pulse"}`}>
                {step >= 1 ? "EVIDENCE SECURED" : "QUERYING IMD SATELLITES..."}
              </span>
            </div>

            <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
              {/* Fake Satellite Radar Map */}
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
              
              {step >= 1 ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 text-center">
                  <div className="w-16 h-16 border-2 border-indigo-400 rounded-full mx-auto mb-3 flex items-center justify-center bg-indigo-500/20">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
                  </div>
                  <div className="text-white font-mono text-xs mb-1">LAT: 26.9124° N | LNG: 75.7873° E</div>
                  <div className="text-indigo-300 font-mono text-xs">HISTORICAL RADAR: HAILSTORM SIGNATURE CONFIRMED</div>
                </motion.div>
              ) : (
                <div className="text-slate-500 font-mono text-sm animate-pulse">Syncing with ISRO/IMD Historical Data Nodes...</div>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>The Problem:</strong> Insurers often reject claims citing "no extreme weather recorded at the nearest district weather station (50km away)."<br/><br/>
              <strong>The Agent's Move:</strong> Autonomously queried historical Sentinel-2 and IMD radar data for the exact micro-coordinates of the farmer's field on the reported date, mathematically proving localized hailstorm presence.
            </p>
          </motion.div>

          {/* Column 2: Legal RAG */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#0A0A0A] rounded-[2rem] p-8 border border-white/10 shadow-xl text-white flex flex-col"
          >
            <h2 className="text-xl font-medium flex items-center gap-2 mb-6">
              <Scale className="text-emerald-400" /> Policy RAG Arbitrator
            </h2>

            <div className="flex-1 space-y-4 font-mono text-xs">
              <div className="text-slate-500">SYSTEM: Ingesting PMFBY_Guidelines_2026.pdf (154 pages)...</div>
              
              {step >= 2 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-400">
                  &gt; SEARCH: "Rejection due to delayed physical survey"
                </motion.div>
              )}
              
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-emerald-100">
                  <strong>MATCH FOUND (Sec 11.2.4):</strong><br/>
                  "If the insurance company fails to conduct a physical assessment within 7 days of the intimation, the photographic evidence provided via the digital portal shall be deemed final and legally binding."
                </motion.div>
              )}
            </div>

            {step >= 4 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                <button className="w-full py-3 bg-white text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                  <Download className="w-4 h-4" /> Download Legal Counter-Notice
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Column 3: The Relief Maximizer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                  <FileSearch className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-medium text-slate-900 mb-2 tracking-tight">Autonomous Relief Maximizer</h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Farmers only know about PMFBY. Our agent scours 50+ central and state-level disaster relief schemes, automatically discovering and auto-filling applications for additional grants they qualify for due to the exact same disaster.
                </p>
                <div className="text-3xl font-bold text-emerald-600 tracking-tight">
                  + ₹17,000 <span className="text-sm font-medium text-slate-500">extra found</span>
                </div>
              </div>
              
              <div className="md:w-2/3 w-full space-y-3">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900 text-sm mb-1">PMFBY Crop Insurance (Base)</div>
                    <div className="text-xs text-slate-500">Wheat • 2 Hectares • 65% Loss</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">₹45,000</div>
                    <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 justify-end"><CheckCircle2 className="w-3 h-3"/> Claim Filed</div>
                  </div>
                </div>

                {step >= 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-orange-900 text-sm mb-1 flex items-center gap-2">State Disaster Response Fund (SDRF) <span className="text-[9px] bg-orange-200 px-2 py-0.5 rounded-full uppercase tracking-widest">Auto-Discovered</span></div>
                      <div className="text-xs text-orange-700/70">Qualifies under "Severe Hailstorm" criteria for Rajasthan.</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-900">₹12,000</div>
                      <div className="text-xs text-orange-600 font-bold">Auto-Filing...</div>
                    </div>
                  </motion.div>
                )}

                {step >= 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-orange-900 text-sm mb-1 flex items-center gap-2">PM-KISAN Seed Replacement Subsidy <span className="text-[9px] bg-orange-200 px-2 py-0.5 rounded-full uppercase tracking-widest">Auto-Discovered</span></div>
                      <div className="text-xs text-orange-700/70">Qualifies due to &gt;50% Rabi crop loss.</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-900">₹5,000</div>
                      <div className="text-xs text-orange-600 font-bold">Auto-Filing...</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          
        </div>
      </main>
    </div>
  );
}
