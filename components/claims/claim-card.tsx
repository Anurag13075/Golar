"use client";

import { FileText, Calendar, AlertCircle, FileWarning, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Claim } from "@/lib/types";

interface ClaimCardProps {
  claim: Claim;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const getStatusColor = () => {
    switch (claim.status) {
      case "approved": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected": return "bg-red-50 text-red-700 border-red-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const isRejected = claim.status === "rejected";

  return (
    <div className={`bg-white border rounded-3xl overflow-hidden shadow-xl transition-all ${isRejected ? 'border-red-200' : 'border-slate-200'}`}>
      <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getStatusColor()}`}>
              {claim.status}
            </span>
            <span className="text-xs text-slate-500 font-bold font-mono">Ref: {claim.reference_number}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-2">{claim.policy.crop} ({claim.policy.crop_hi}) Damage</h3>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-slate-900">{claim.severity_percent}% Loss</div>
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-1 justify-end font-medium">
            <Calendar className="w-3 h-3" />
            {new Date(claim.damage_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">Policy</div>
            <div className="text-sm text-slate-900 font-medium">{claim.policy.policy_number}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">Area</div>
            <div className="text-sm text-slate-900 font-medium">{claim.policy.area_hectares} Hectares</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">Location</div>
            <div className="text-sm text-slate-900 font-medium">{claim.policy.village}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide font-bold">Type</div>
            <div className="text-sm text-slate-900 font-medium capitalize">{claim.damage_type}</div>
          </div>
        </div>

        {isRejected && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-900">Claim Rejected</h4>
                <p className="text-sm text-red-700 font-medium">{claim.rejection_reason}</p>
              </div>
            </div>
            <Link href={`/appeal/${claim.id}`}>
              <button className="whitespace-nowrap flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm shadow-red-500/20">
                <FileWarning className="w-4 h-4" />
                Draft Legal Appeal <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
