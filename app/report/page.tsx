"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import StepIndicator from "@/components/report/step-indicator";
import CountdownTimer from "@/components/report/countdown-timer";
import VoiceRecorder from "@/components/report/voice-recorder";
import PhotoCapture from "@/components/report/photo-capture";
import DamageAnalysisCard from "@/components/report/damage-analysis-card";
import ClaimForm from "@/components/report/claim-form";
import Confirmation from "@/components/report/confirmation";
import AgenticPipeline from "@/components/report/agentic-pipeline";

import type { VoiceTranscription, DamageAnalysis, Claim, MismatchCheck, PhotoEvidence } from "@/lib/types";

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [damageDate, setDamageDate] = useState<string | null>(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  const [policyNumber, setPolicyNumber] = useState("TEST-POLICY-001");
  
  const [transcription, setTranscription] = useState<VoiceTranscription | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<DamageAnalysis | null>(null);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [mismatchChecks, setMismatchChecks] = useState<MismatchCheck[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSimulatingAgent, setIsSimulatingAgent] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ referenceNumber: string; claimId: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const testModeEnabled = process.env.NEXT_PUBLIC_ENABLE_TEST_MODE === "true";

  const handleTranscriptionComplete = (data: VoiceTranscription) => {
    setError(null);
    setTranscription(data);
    if (data.extracted?.damage_date) {
      setDamageDate(data.extracted.damage_date);
    }
  };

  const handlePhotoAnalyzed = (data: { analysis: DamageAnalysis; photoUrl: string }) => {
    setError(null);
    setPhotoUrl(data.photoUrl);
    setAnalysis(data.analysis);
  };

  const prepareClaimData = async () => {
    if (!transcription || !analysis || !damageDate || !policyNumber.trim() || !photoUrl) {
      setError("Policy number, damage date, voice report, and photo evidence are required.");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch("/api/build-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policy_number: policyNumber.trim(),
          voice_data: transcription,
          damage_analysis: analysis,
          damage_date: damageDate,
          photos: photoUrl ? [{
            s3_key: "",
            url: photoUrl,
            timestamp: new Date().toISOString(),
            analysis,
          } satisfies PhotoEvidence] : [],
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Unable to build claim");
      }
      setClaim(json.data.claim);
      setMismatchChecks(json.data.mismatch_checks);
      setCurrentStep(3);
    } catch (error) {
      console.error("Claim preparation failed:", error);
      setError(error instanceof Error ? error.message : "Unable to prepare claim");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitClaim = async () => {
    if (!claim) return;
    setIsSimulatingAgent(true);
  };

  const handlePipelineComplete = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/submit-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit claim");
      }

      setSubmissionResult({
        referenceNumber: json.data.reference_number,
        claimId: json.data.claim_id,
      });
      setIsSimulatingAgent(false);
      setCurrentStep(4);
    } catch (error) {
      console.error("Claim submission failed:", error);
      setError(error instanceof Error ? error.message : "Failed to submit claim");
      setIsSimulatingAgent(false);
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 2 && analysis) {
      prepareClaimData();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const canProceed = () => {
    if (currentStep === 1) return transcription !== null && Boolean(policyNumber.trim()) && Boolean(damageDate);
    if (currentStep === 2) return analysis !== null;
    if (currentStep === 3) return !mismatchChecks.some((c) => c.status === "fail");
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
          <span className="text-2xl">🌾</span> Fasal Rakshak
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
        {currentStep < 4 && (
          <>
            <CountdownTimer damageDate={damageDate} />
            <StepIndicator currentStep={currentStep as 1 | 2 | 3 | 4} />
          </>
        )}

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-slate-900">Describe the Damage</h1>
                  <p className="text-slate-500 font-medium">Tell us what happened to your crop. / अपनी फसल को क्या हुआ बताएं।</p>
                </div>
                <label className="block space-y-2">
                  <span className="text-sm font-bold text-slate-700">PMFBY Policy Number</span>
                  <input
                    value={policyNumber}
                    onChange={(event) => setPolicyNumber(event.target.value)}
                    placeholder="Enter your policy number"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                {testModeEnabled && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    <p className="font-bold">Local test mode enabled</p>
                    <p className="mt-1">This uses a clearly labeled test policy and local in-memory claims. It is not real insurance data.</p>
                    <button
                      type="button"
                      onClick={() => setPolicyNumber("TEST-POLICY-001")}
                      className="mt-3 rounded-lg bg-amber-600 px-3 py-2 font-bold text-white hover:bg-amber-700"
                    >
                      Use test policy TEST-POLICY-001
                    </button>
                  </div>
                )}
                <label className="block space-y-2">
                  <span className="text-sm font-bold text-slate-700">Date of Damage</span>
                  <input
                    type="date"
                    value={damageDate ? damageDate.slice(0, 10) : ""}
                    onChange={(event) => setDamageDate(event.target.value ? new Date(`${event.target.value}T00:00:00`).toISOString() : null)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <VoiceRecorder onTranscriptionComplete={handleTranscriptionComplete} />
                
                {transcription && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md"
                  >
                    <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-bold">We heard:</div>
                    <p className="text-slate-700 italic mb-4 font-medium">&ldquo;{transcription.text}&rdquo;</p>
                    <div className="flex flex-wrap gap-2">
                      {transcription.extracted?.crop && (
                        <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1.5 rounded-lg border border-green-200 font-medium">
                          🌾 {transcription.extracted.crop}
                        </span>
                      )}
                      {transcription.extracted?.damage_type && (
                        <span className="bg-red-50 text-red-700 text-xs px-2.5 py-1.5 rounded-lg border border-red-200 font-medium">
                          ⚠️ {transcription.extracted.damage_type}
                        </span>
                      )}
                      {transcription.extracted?.severity_described && (
                        <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1.5 rounded-lg border border-amber-200 font-medium">
                          📊 {transcription.extracted.severity_described}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-slate-900">Add Photo Evidence</h1>
                  <p className="text-slate-500 font-medium">Upload a clear photo of the damaged crop. / क्षतिग्रस्त फसल की फोटो अपलोड करें।</p>
                </div>
                <PhotoCapture onPhotoAnalyzed={handlePhotoAnalyzed} />
                {analysis && <DamageAnalysisCard analysis={analysis} />}
              </motion.div>
            )}

            {currentStep === 3 && claim && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {isSimulatingAgent ? (
                  <AgenticPipeline onComplete={handlePipelineComplete} />
                ) : (
                  <ClaimForm
                    claim={claim}
                    mismatchChecks={mismatchChecks}
                    onSubmit={handleSubmitClaim}
                    isSubmitting={isProcessing}
                  />
                )}
              </motion.div>
            )}

            {currentStep === 4 && submissionResult && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10"
              >
                <Confirmation
                  referenceNumber={submissionResult.referenceNumber}
                  claimId={submissionResult.claimId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {currentStep < 4 && currentStep !== 3 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1 || isProcessing}
              className={`flex-1 py-3.5 px-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors
                ${currentStep === 1
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed() || isProcessing}
              className={`flex-1 py-3.5 px-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all
                ${!canProceed()
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                }`}
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  Next <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
