"use client";

import { FileText, ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import type { Claim, MismatchCheck } from "@/lib/types";
import MismatchAlert from "./mismatch-alert";

interface ClaimFormProps {
  claim: Claim;
  mismatchChecks: MismatchCheck[];
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const DAMAGE_LABELS: Record<string, string> = {
  hailstorm: "Hailstorm / ओलावृष्टि", flood: "Flood / बाढ़", drought: "Drought / सूखा",
  cyclone: "Cyclone / चक्रवात", pest: "Pest Attack / कीट हमला", disease: "Crop Disease / फसल रोग",
  unseasonal_rain: "Unseasonal Rain / बेमौसम बारिश", frost: "Frost / पाला",
  landslide: "Landslide / भूस्खलन", other: "Other / अन्य",
};

export default function ClaimForm({ claim, mismatchChecks, onSubmit, isSubmitting = false }: ClaimFormProps) {
  const passesCount = mismatchChecks.filter(c => c.status === "pass").length;
  const warningsCount = mismatchChecks.filter(c => c.status === "warning").length;
  const failsCount = mismatchChecks.filter(c => c.status === "fail").length;
  const hasFails = failsCount > 0;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Claim — Auto-Filled</h2>
            <p className="text-xs text-slate-500 font-medium">आपका दावा — स्वतः भरा गया</p>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="p-5 space-y-1"
        >
          {[
            { label: "Policy Number", value: claim.policy.policy_number },
            { label: "Farmer Name", value: claim.policy.farmer_name },
            { label: "Village / District", value: `${claim.policy.village}, ${claim.policy.district}` },
            { label: "Crop", value: `${claim.policy.crop} (${claim.policy.crop_hi})` },
            { label: "Affected Area", value: `${claim.policy.area_hectares} Hectares` },
            { label: "Damage Type", value: DAMAGE_LABELS[claim.damage_type] || claim.damage_type },
            { label: "Estimated Loss", value: `${claim.severity_percent}%` },
            { label: "Date of Incident", value: new Date(claim.damage_date).toLocaleDateString("en-IN") },
          ].map((field, i) => (
            <motion.div 
              key={i}
              variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
              className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0"
            >
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">{field.label}</span>
              <span className="text-sm font-bold text-slate-900">{field.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 px-2">
          <ShieldCheck className="w-5 h-5 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Compliance Check</h3>
          <div className="ml-auto flex gap-2 text-xs font-bold">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{passesCount} Pass</span>
            {warningsCount > 0 && <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">{warningsCount} Warn</span>}
            {failsCount > 0 && <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">{failsCount} Fail</span>}
          </div>
        </div>
        
        <div className="space-y-3">
          {mismatchChecks.map((check) => (
            <MismatchAlert key={check.id} check={check} />
          ))}
        </div>
      </div>

      <div className="pt-4 pb-8">
        <button
          onClick={onSubmit}
          disabled={hasFails || isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-sm
            ${hasFails 
              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 shadow-lg"
            }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Claim"}
        </button>
        
        {hasFails && (
          <p className="text-red-500 text-sm text-center mt-3 flex items-center justify-center gap-1.5 font-medium">
            <AlertCircle className="w-4 h-4" />
            Fix the issues above before submitting
          </p>
        )}
      </div>
    </div>
  );
}
