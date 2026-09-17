"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { MismatchCheck } from "@/lib/types";

interface MismatchAlertProps {
  check: MismatchCheck;
}

export default function MismatchAlert({ check }: MismatchAlertProps) {
  const [expanded, setExpanded] = useState(false);

  const isPass = check.status === "pass";
  const isWarning = check.status === "warning";
  const isFail = check.status === "fail";

  const getStyles = () => {
    if (isPass) return { bg: "bg-emerald-50", border: "border-l-emerald-500 border-emerald-100", icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /> };
    if (isWarning) return { bg: "bg-amber-50", border: "border-l-amber-500 border-amber-200", icon: <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" /> };
    return { bg: "bg-red-50", border: "border-l-red-500 border-red-200", icon: <XCircle className="w-5 h-5 text-red-600 mt-0.5" /> };
  };

  const styles = getStyles();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full rounded-xl border border-l-4 p-4 ${styles.bg} ${styles.border} transition-colors shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{styles.icon}</div>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-900">{check.label}</h4>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 px-2 py-0.5 rounded bg-black/5 text-slate-900">
              {check.status}
            </span>
          </div>
          
          <p className={`text-sm mt-1 ${isPass ? 'text-slate-500' : 'text-slate-300'}`}>
            {check.details}
          </p>

          <AnimatePresence>
            {expanded && check.how_to_fix && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-950/50 rounded-lg p-3 text-sm text-slate-300 border border-white/5">
                  <span className="font-medium text-white mb-1 block">How to fix:</span>
                  {check.how_to_fix}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
