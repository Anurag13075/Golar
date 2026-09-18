"use client";

import { motion } from "motion/react";
import { Mic, Image as ImageIcon, Scale, ShieldAlert, BadgeCheck, Phone, Zap } from "lucide-react";

export default function FeaturesGrid() {
  return (
    <section className="py-32 bg-slate-50 border-t border-slate-100 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            An ecosystem built for <span className="text-blue-600">protection.</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Every feature is designed to eliminate friction between a farmer's disaster and their rightful PMFBY insurance payout.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          
          {/* Feature 1: Large Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 md:p-10 relative overflow-hidden text-white shadow-2xl shadow-blue-900/20 group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Voice-First Intake in Hindi & Local Dialects</h3>
                <p className="text-blue-100 max-w-md font-medium text-lg leading-relaxed">
                  No complex forms to type. Farmers simply describe their crop damage naturally, and our AI perfectly structures the claim for PMFBY.
                </p>
              </div>
              
              {/* Decorative Audio Wave */}
              <div className="absolute bottom-0 right-0 w-3/4 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                <svg viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 50 Q 20 20 40 50 T 80 50 T 120 50 T 160 50 T 200 50" stroke="white" strokeWidth="10" strokeLinecap="round" className="animate-pulse" />
                  <path d="M200 50 Q 220 80 240 50 T 280 50 T 320 50 T 360 50 T 400 50" stroke="white" strokeWidth="10" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.2s' }}/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Tall Vertical */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 lg:col-span-1 row-span-2 bg-slate-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden text-white shadow-xl group"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                <ImageIcon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Vision AI Assessment</h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-8">
                Farmers upload a photo of their field. Our multimodal AI identifies the crop, detects the exact disease or damage type, and estimates severity instantly—acting as an incorruptible first assessor.
              </p>
              
              <div className="mt-auto relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50 aspect-[4/5] group-hover:border-emerald-500/50 transition-colors duration-500 flex items-center justify-center">
                {/* Simulated image scanning effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent h-[20%] w-full animate-[scan_3s_ease-in-out_infinite]" />
                <BadgeCheck className="w-16 h-16 text-emerald-500/20 group-hover:text-emerald-400 transition-colors duration-500" />
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Standard Square */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 lg:col-span-1 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden hover:border-orange-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">
              <ShieldAlert className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Compliance</h3>
            <p className="text-slate-500 font-medium">
              Validates against PMFBY rules in real-time, catching Aadhaar or bank mismatches before they cause a hard rejection.
            </p>
          </motion.div>

          {/* Feature 4: Large Horizontal Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 bg-emerald-50 rounded-[2rem] p-8 md:p-10 border border-emerald-100 shadow-lg shadow-emerald-100/50 relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-200 flex items-center justify-center mb-6">
                  <Scale className="w-6 h-6 text-emerald-800" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950 mb-3 tracking-tight">One-Click Legal Appeals</h3>
                <p className="text-emerald-800/80 font-medium text-lg leading-relaxed">
                  If an insurance company wrongfully rejects a claim, our system instantly drafts a legally robust grievance letter citing exact PMFBY clauses.
                </p>
              </div>
              <div className="hidden md:flex shrink-0 w-48 h-48 bg-white rounded-2xl border border-emerald-200 shadow-sm items-center justify-center p-6 text-emerald-900/40 group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-500">
                <FileTextMockup />
              </div>
            </div>
          </motion.div>

          {/* Feature 5: Standard Square Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 lg:col-span-1 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-purple-200 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">72-Hour Safeguard</h3>
            <p className="text-slate-500 font-medium">
              Tracks the critical 72h reporting window, ensuring every claim is logged and timestamped defensively.
            </p>
          </motion.div>

        </div>
      </div>
      
      {/* Global CSS for custom animations used in this component */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(400%); }
          100% { transform: translateY(-100%); }
        }
      `}} />
    </section>
  );
}

// Simple internal component to draw a tiny fake document
function FileTextMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 opacity-50">
      <div className="w-full h-4 bg-emerald-100 rounded-md" />
      <div className="w-3/4 h-3 bg-emerald-50 rounded-sm" />
      <div className="w-5/6 h-3 bg-emerald-50 rounded-sm" />
      <div className="w-full h-3 bg-emerald-50 rounded-sm" />
      <div className="mt-auto flex justify-between">
        <div className="w-12 h-12 rounded-full bg-emerald-100" />
        <div className="w-16 h-8 bg-emerald-200 rounded-md" />
      </div>
    </div>
  );
}
