"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Scale, AlertTriangle, FileText, Loader2, Download, Send } from "lucide-react";
import type { Claim } from "@/lib/types";
import { motion } from "motion/react";
import Navbar from "@/components/shared/navbar";

export default function AppealPage() {
  const params = useParams();
  const router = useRouter();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [appeal, setAppeal] = useState<{
    appeal_text: string;
    cited_guidelines: Array<{ section: string; description: string }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const res = await fetch(`/api/claims/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch claim");
        const data = await res.json();
        setClaim(data.claim);
      } catch (error) {
        console.error("Error fetching claim:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClaim();
  }, [params.id]);

  const handleGenerateAppeal = async () => {
    if (!claim) return;
    setGenerating(true);
    
    try {
      const res = await fetch("/api/generate-appeal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim })
      });
      
      const data = await res.json();
      setAppeal(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!claim) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <Navbar />

      <main className="max-w-3xl mx-auto p-4 pt-24">
        <Link 
          href="/claims"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-8 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Claims
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 tracking-tight flex items-center gap-3">
            <Scale className="w-8 h-8 text-blue-600" />
            File Legal Appeal
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Our AI will draft a formal appeal citing specific PMFBY guidelines to challenge your rejection.
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 text-lg mb-1">Rejection Reason</h3>
              <p className="text-red-700 font-medium mb-3">{claim.rejection_reason}</p>
              <div className="text-sm bg-white/60 border border-red-200 p-3 rounded-xl text-red-900 font-medium">
                Ref: {claim.reference_number} • Crop: {claim.policy.crop} • Date: {new Date(claim.damage_date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {!appeal ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-xl">
            <Scale className="w-16 h-16 text-blue-100 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Draft Grievance Letter</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">
              We will cross-reference your rejection reason against the official PMFBY operational guidelines and generate a formal appeal letter for the Grievance Redressal Committee.
            </p>
            <button
              onClick={handleGenerateAppeal}
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mx-auto w-full max-w-xs"
            >
              {generating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
              ) : (
                <><FileText className="w-5 h-5" /> Generate Appeal</>
              )}
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" /> Appeal Draft
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                  Ready to Submit
                </span>
              </div>
              
              <div className="prose prose-slate prose-p:leading-relaxed max-w-none">
                <div className="whitespace-pre-wrap font-medium text-slate-700 text-sm md:text-base p-6 bg-slate-50 rounded-2xl border border-slate-100 font-serif">
                  {appeal.appeal_text}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Cited Guidelines</h4>
                <div className="flex flex-col gap-2">
                  {appeal.cited_guidelines.map((g, i) => (
                    <div key={i} className="text-sm bg-blue-50/50 border border-blue-100 text-blue-900 px-4 py-2.5 rounded-xl font-medium">
                      <span className="font-bold mr-2">Section {g.section}:</span>
                      {g.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="py-4 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl font-bold flex justify-center items-center gap-2 transition-colors shadow-sm">
                <Download className="w-5 h-5" /> Download PDF
              </button>
              <button className="py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
                <Send className="w-5 h-5" /> Submit to Grievance Cell
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
