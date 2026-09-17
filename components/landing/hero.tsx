"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 w-full min-h-[90vh] flex flex-col items-center overflow-hidden bg-[#0A74F0]">
      {/* Background Image / Sky Vibe */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          className="w-full h-full object-cover opacity-90 mix-blend-overlay"
          alt="Bright Sky"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A74F0]/60 via-[#298BFE]/40 to-[#60A5FA]/20" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mt-12 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          Your AI agent for <br /> crop insurance claims
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-2xl mx-auto"
        >
          One intelligent assistant every farmer uses to file PMFBY claims perfectly before the 72-hour window closes.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/report">
            <button className="bg-white text-slate-900 rounded-full px-8 py-3.5 font-semibold flex items-center gap-2 hover:bg-slate-50 transition-transform hover:scale-105 mx-auto shadow-xl shadow-black/10">
              Get Started <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </Link>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-8 border-t border-white/20 justify-center">
            <p className="text-white/80 text-sm font-medium">✨ New Feature:</p>
            <Link 
              href="/marketplace" 
              className="group relative flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-5 py-2.5 transition-all"
            >
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[10px] shadow-sm">👨‍⚖️</div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[10px] shadow-sm">🩺</div>
                <div className="w-6 h-6 rounded-full bg-amber-500 border border-white flex items-center justify-center text-[10px] shadow-sm">📈</div>
              </div>
              <span className="text-sm font-bold text-white transition-colors">
                Explore the AI Agent Marketplace <span className="ml-1 text-blue-200 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Uploaded User Image Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-20 relative max-w-5xl mx-auto w-[95%] z-10"
      >
        {/* Subtle glow behind the mockup */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse" />
        
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative bg-white/40 backdrop-blur-3xl rounded-[2rem] border border-white/40 p-2 shadow-2xl"
        >
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-inner">
            {/* Fake Browser Chrome */}
            <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 flex-1 max-w-sm flex items-center gap-2">
                <div className="w-3 h-3 border border-slate-300 rounded-sm" />
                fasalrakshak.in
              </div>
            </div>
            {/* App UI Image */}
            <div className="relative aspect-[16/10] bg-slate-100 w-full overflow-hidden flex items-center justify-center group">
              <img 
                src="/hero-mockup.png" 
                alt="Fasal Rakshak App Interface" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
