"use client";

import { motion } from "motion/react";
import { Mic, Camera, FileText, CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Speak", icon: Mic },
  { id: 2, label: "Photo", icon: Camera },
  { id: 3, label: "Review", icon: FileText },
  { id: 4, label: "Done", icon: CheckCircle2 },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative max-w-sm mx-auto px-4">
        {/* Background Line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0" />
        
        {/* Progress Line */}
        <motion.div
          className="absolute top-1/2 left-8 h-1 bg-emerald-500 -translate-y-1/2 rounded-full z-0"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep - 1) * 33}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ maxWidth: "calc(100% - 4rem)" }}
        />

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? "#22C55E" : "#ffffff",
                  borderColor: isCompleted || isActive ? "#22C55E" : "#e2e8f0",
                  scale: isActive ? 1.1 : 1,
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm transition-colors
                  ${isActive ? 'ring-4 ring-green-500/20' : ''}
                `}
              >
                <step.icon
                  className={`w-5 h-5 ${
                    isCompleted || isActive ? "text-white" : "text-slate-400"
                  }`}
                />
              </motion.div>
              <span
                className={`text-xs font-medium ${
                  isCompleted || isActive ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
