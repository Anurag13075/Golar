"use client";

import { motion } from "motion/react";
import { Mic, FileText, CheckCircle2, MapPin, Camera } from "lucide-react";

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-[#F5F5F7] px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight">
            Replace bureaucratic friction with AI.
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            A complete ecosystem designed to ensure farmers never lose a legitimate PMFBY claim to a technicality again.
          </p>
        </div>

        {/* 4-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[24rem]">
          
          {/* 1. Tall Left Card (Dark) - Voice Intake */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1 md:row-span-2 rounded-[32px] bg-[#0A0A0A] p-1 flex flex-col relative overflow-hidden group"
          >
            <DotPattern />
            
            {/* Fake Browser/Chat UI */}
            <div className="flex-1 mt-6 mx-4 relative z-10">
              <div className="w-full h-full bg-[#111111] rounded-t-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                <div className="h-8 border-b border-white/5 flex items-center px-3 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="self-end bg-blue-600 text-white text-[10px] py-1.5 px-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                    "Mere khet mein baarish se gehu kharab ho gaya hai."
                  </div>
                  <div className="self-start bg-white/10 text-white/80 text-[10px] py-1.5 px-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                    Claim structured. PMFBY forms auto-filled.
                  </div>
                  <div className="mt-auto self-center p-3 bg-white/5 rounded-full mb-2 group-hover:scale-110 transition-transform duration-500">
                    <Mic className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="relative z-10 p-6 pt-4 mt-auto">
              <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Voice-First Intake</h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                Designed to perfection, our AI captures farmer dialects and automatically maps them to PMFBY insurance standards.
              </p>
            </div>
          </motion.div>

          {/* 2. Middle Top (Light) - Automated Compliance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 rounded-[32px] bg-white border border-slate-200/60 p-6 flex flex-col relative overflow-hidden shadow-sm"
          >
            <div className="relative z-10 mb-4">
              <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-1">Automated Compliance</h3>
              <p className="text-xs text-slate-500 font-medium">Pre-validation check</p>
            </div>
            
            {/* Fake Pie Chart UI */}
            <div className="flex-1 flex items-center justify-center relative z-10 mt-2">
              <div className="w-32 h-32 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                  <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#EAB308" strokeWidth="12" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} whileInView={{ strokeDashoffset: 60 }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-yellow-500 mb-1" />
                </div>
              </div>
            </div>

            {/* Notification Toast */}
            <div className="relative z-10 mt-auto bg-white border border-slate-100 shadow-lg shadow-slate-200/40 rounded-xl p-3 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="text-xs font-semibold text-slate-700">Aadhaar & Bank Linked</div>
            </div>
          </motion.div>

          {/* 3. Right Top (Dark) - Vision AI / Map */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-1 rounded-[32px] bg-[#0A0A0A] p-6 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-40">
              {/* Fake Map Grid */}
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
            </div>

            {/* Map Nodes (Glowing) */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
            <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse delay-75">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center animate-pulse delay-150">
              <div className="w-2.5 h-2.5 bg-purple-400 rounded-full" />
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white tracking-tight mb-1">Vision AI & Geotagging</h3>
              <p className="text-xs text-white/50 font-medium">Damage assessed precisely where it happens.</p>
            </div>

            {/* Fake Camera / Analysis Viewfinder */}
            <div className="relative z-10 mt-auto self-end w-48 h-32 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex items-center justify-center group-hover:border-white/20 transition-colors">
              <div className="absolute inset-4 border border-white/20 border-dashed rounded-lg" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-[scan_3s_ease-in-out_infinite]" />
              <Camera className="w-6 h-6 text-white/40" />
            </div>
          </motion.div>

          {/* 4. Middle Bottom (Light) - One-Click Appeals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 md:row-span-1 rounded-[32px] bg-white border border-slate-200/60 p-6 flex flex-col md:flex-row relative overflow-hidden shadow-sm gap-6"
          >
            <LinePattern />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-1">One-Click Legal Appeals</h3>
              <p className="text-xs text-slate-500 font-medium mb-6">Instantly generate bulletproof grievances.</p>
              
              {/* Fake Search/Input UI */}
              <div className="mt-auto bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-slate-400 font-medium">Rejection Reason</div>
                  <div className="text-xs text-slate-700 font-semibold truncate">Claim filed after 72 hours.</div>
                </div>
                <div className="px-3 py-1.5 bg-white shadow-sm border border-slate-200 rounded-lg text-[10px] font-bold text-slate-900">
                  Draft Appeal
                </div>
              </div>
            </div>

            {/* Fake Document Graphic */}
            <div className="relative z-10 w-full md:w-40 h-32 md:h-full bg-slate-100 rounded-xl border border-slate-200/60 p-3 shadow-inner shrink-0 overflow-hidden">
              <div className="w-full h-2 bg-slate-200 rounded-full mb-3" />
              <div className="w-3/4 h-1.5 bg-slate-200 rounded-full mb-1.5" />
              <div className="w-5/6 h-1.5 bg-slate-200 rounded-full mb-1.5" />
              <div className="w-full h-1.5 bg-slate-200 rounded-full mb-4" />
              <div className="w-1/2 h-4 bg-emerald-100 border border-emerald-200 rounded mt-auto flex items-center px-1 gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                <span className="text-[8px] text-emerald-700 font-bold">Clause 11.2 Cited</span>
              </div>
            </div>
          </motion.div>

          {/* 5. Right Bottom (Light) - Dashboards & Everything Else */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 md:row-span-1 rounded-[32px] bg-white border border-slate-200/60 p-6 flex flex-col relative overflow-hidden shadow-sm"
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-orange-100/50 rounded-tl-full blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-slate-900 tracking-tight mb-1">72-Hour Safeguard</h3>
              <p className="text-xs text-slate-500 font-medium">Immutable timestamps.</p>
            </div>

            <div className="relative z-10 mt-auto flex justify-end">
              <div className="w-24 h-24 bg-orange-50 border border-orange-100 rounded-2xl rounded-br-none shadow-sm flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Time Left</span>
                <span className="text-2xl font-black text-orange-600 tracking-tighter">71:59</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}} />
    </section>
  );
}

const DotPattern = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)"></circle>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotPattern)"></rect>
  </svg>
);

const LinePattern = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="linePattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40V.5H40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"></path>
        <path d="M0 .5H40V40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1"></path>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#linePattern)"></rect>
  </svg>
);
