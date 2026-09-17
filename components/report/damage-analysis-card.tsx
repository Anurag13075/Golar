"use client";

import { AlertTriangle, Leaf, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import AnimatedCounter from "@/components/shared/animated-counter";
import type { DamageAnalysis } from "@/lib/types";

interface DamageAnalysisCardProps {
  analysis: DamageAnalysis;
}

export default function DamageAnalysisCard({ analysis }: DamageAnalysisCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xl space-y-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-500" /> AI Vision Results
        </h4>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded font-bold">
          High Confidence
        </span>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-2 gap-3"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-1">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Crop Detected</span>
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Leaf className="w-4 h-4 text-emerald-500" /> {analysis.crop_detected}
          </div>
        </motion.div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col gap-1">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Damage Type</span>
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> {analysis.damage_type.replace('_', ' ')}
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-50 border border-slate-100 rounded-2xl p-4"
      >
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Estimated Severity</span>
          <AnimatedCounter target={analysis.severity_percent} suffix="%" className="text-2xl font-black text-slate-900" />
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${analysis.severity_percent}%` }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className={`h-full ${analysis.severity_percent > 50 ? 'bg-red-500' : 'bg-amber-500'}`}
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl"
      >
        <div className={`w-2 h-2 rounded-full ${analysis.matches_voice ? 'bg-emerald-500' : 'bg-red-500'}`} />
        {analysis.matches_voice ? 'Matches Voice Report' : 'Conflicts with Voice Report'}
        <div className={`w-2 h-2 rounded-full ml-2 ${analysis.is_recent ? 'bg-emerald-500' : 'bg-red-500'}`} />
        {analysis.is_recent ? 'Recent Damage' : 'Old Damage Detected'}
      </motion.div>
    </motion.div>
  );
}
