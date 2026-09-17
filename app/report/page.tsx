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

import type { VoiceTranscription, DamageAnalysis, Claim, MismatchCheck } from "@/lib/types";
import { getMockClaim, getMockMismatchChecks } from "@/lib/mock";

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [damageDate, setDamageDate] = useState<string | null>(null);
  
  const [transcription, setTranscription] = useState<VoiceTranscription | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<DamageAnalysis | null>(null);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [mismatchChecks, setMismatchChecks] = useState<MismatchCheck[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ referenceNumber: string; claimId: string } | null>(null);

  const handleTranscriptionComplete = (data: VoiceTranscription) => {
    setTranscription(data);
    if (data.extracted?.damage_date) {
      setDamageDate(data.extracted.damage_date);
    } else {
      // Default: assume damage happened today
      setDamageDate(new Date().toISOString());
    }
  };

  const handlePhotoAnalyzed = (data: { analysis: DamageAnalysis; photoUrl: string }) => {
    setPhotoUrl(data.photoUrl);
    setAnalysis(data.analysis);
  };

  const prepareClaimData = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/build-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voice_data: transcription, damage_analysis: analysis, damage_date: damageDate }),
      });
      const json = await res.json();
      if (json.success) {
        setClaim(json.data.claim);
        setMismatchChecks(json.data.mismatch_checks);
        setIsProcessing(false);
        setCurrentStep(3);
        return;
      }
    } catch {
      // fallback
    }
    setClaim(getMockClaim());
    setMismatchChecks(getMockMismatchChecks());
    setIsProcessing(false);
    setCurrentStep(3);
  };

  const handleSubmitClaim = async () => {
    if (!claim) return;
    setIsProcessing(true);
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit claim");
      }

      setSubmissionResult({ 
        referenceNumber: `PMFBY-${new Date().getFullYear()}-RJ-${Math.floor(1000 + Math.random() * 9000)}`, 
        claimId: claim.id 
      });
      setCurrentStep(4);
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert(error.message || "Failed to submit claim to DynamoDB. Please try again.");
    } finally {
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
    if (currentStep === 1) return transcription !== null;
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
                <ClaimForm
                  claim={claim}
                  mismatchChecks={mismatchChecks}
                  onSubmit={handleSubmitClaim}
                  isSubmitting={isProcessing}
                />
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
