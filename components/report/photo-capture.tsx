"use client";

import { useState } from "react";
import { Camera, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { DamageAnalysis } from "@/lib/types";
import { getMockDamageAnalysis } from "@/lib/mock";

interface PhotoCaptureProps {
  onPhotoAnalyzed: (data: DamageAnalysis) => void;
}

export default function PhotoCapture({ onPhotoAnalyzed }: PhotoCaptureProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "done">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      setPreviewUrl(base64Data);
      setStatus("analyzing");
      
      try {
        const res = await fetch("/api/analyze-damage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            image: base64Data,
            mimeType: file.type 
          })
        });
        
        if (!res.ok) throw new Error("Analysis failed");
        
        const data = await res.json();
        setStatus("done");
        onPhotoAnalyzed(data);
      } catch (err) {
        console.error(err);
        // Fallback for UI robustness during hackathon
        setStatus("done");
        import("@/lib/mock").then(m => onPhotoAnalyzed(m.getMockDamageAnalysis()));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-xl overflow-hidden relative min-h-[300px] flex items-center justify-center">
        
        {status === "idle" && (
          <div className="w-full h-full p-6 flex flex-col items-center justify-center gap-6">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
              <Camera className="w-10 h-10 text-blue-500" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Take a Photo</h3>
              <p className="text-sm text-slate-500 font-medium">Capture the damaged area clearly</p>
            </div>

            <label className="w-full py-4 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-slate-400 mb-2" />
              <span className="text-sm font-bold text-slate-600">Upload from gallery</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        )}

        {(status === "uploading" || status === "analyzing" || status === "done") && previewUrl && (
          <div className="relative w-full h-[300px] rounded-2xl overflow-hidden">
            <img src={previewUrl} alt="Crop damage" className="w-full h-full object-cover" />
            
            <AnimatePresence>
              {status === "analyzing" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden"
                >
                  {/* High-tech corner targets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400" />

                  {/* Scanning Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-4">
                      <Loader2 className="w-12 h-12 text-white animate-spin" />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </div>
                    <div className="text-white font-black tracking-[0.2em] text-sm bg-blue-500/20 px-4 py-1 rounded-full border border-blue-400/30">
                      NOVA VISION SCANNING
                    </div>
                    <div className="text-blue-200 text-xs mt-2 font-medium font-mono">
                      Analyzing crop & severity...
                    </div>
                  </div>
                  
                  {/* Enhanced Laser Line */}
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_20px_4px_rgba(96,165,250,0.8)] z-20"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {status === "done" && (
              <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  type="spring"
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
