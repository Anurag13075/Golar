"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Square, Loader2, CheckCircle2, Type, X } from "lucide-react";
import type { VoiceTranscription } from "@/lib/types";

interface VoiceRecorderProps {
  onTranscriptionComplete: (data: VoiceTranscription) => void;
}

export default function VoiceRecorder({ onTranscriptionComplete }: VoiceRecorderProps) {
  const [status, setStatus] = useState<"idle" | "recording" | "processing" | "done">("idle");
  const [textMode, setTextMode] = useState(false);
  const [text, setText] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const processAudio = async (audioBlob: Blob) => {
    const extension = audioBlob.type.includes("mp4") ? "m4a" : "webm";
    const formData = new FormData();
    formData.append("audio", new File([audioBlob], `audio.${extension}`, {
      type: audioBlob.type,
    }));

    const res = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Transcription failed");
    return res.json();
  };

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
        throw new Error("Audio recording is not supported by this browser");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]
        .find((type) => MediaRecorder.isTypeSupported(type));

      mediaStreamRef.current = stream;
      audioChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.start();
      setStatus("recording");
    } catch (err) {
      console.error("Unable to start audio recording:", err);
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      setStatus("done");
      import("@/lib/mock").then((m) => onTranscriptionComplete(m.getMockTranscription()));
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") return;

    setStatus("processing");
    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: recorder.mimeType || "audio/webm",
      });
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      mediaRecorderRef.current = null;

      try {
        const data = await processAudio(audioBlob);
        setStatus("done");
        onTranscriptionComplete(data);
      } catch (err) {
        console.error(err);
        setStatus("done");
        import("@/lib/mock").then((m) => onTranscriptionComplete(m.getMockTranscription()));
      }
    };
    recorder.stop();
  };

  const submitText = async () => {
    if (!text.trim()) return;
    setStatus("processing");
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manualText: text }),
      });
      if (!res.ok) throw new Error("Extraction failed");
      const data = await res.json();
      setStatus("done");
      onTranscriptionComplete(data);
    } catch (err) {
      console.error(err);
      setStatus("done");
      import("@/lib/mock").then(m => onTranscriptionComplete(m.getMockTranscription(text)));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-6 border border-slate-100 shadow-xl relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          {!textMode ? (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="relative mb-8 mt-4">
                {status === "recording" && (
                  <motion.div
                    className="absolute inset-0 bg-red-100 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={status === "recording" ? stopRecording : status === "idle" ? startRecording : undefined}
                  disabled={status === "processing" || status === "done"}
                  className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-colors shadow-md
                    ${status === "recording" ? "bg-red-500 hover:bg-red-600 shadow-red-500/30" : ""}
                    ${status === "idle" ? "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200" : ""}
                    ${status === "processing" ? "bg-slate-100" : ""}
                    ${status === "done" ? "bg-emerald-500" : ""}
                  `}
                >
                  {status === "idle" && <Mic className="w-10 h-10 text-blue-600" />}
                  {status === "recording" && <Square className="w-8 h-8 text-white fill-white" />}
                  {status === "processing" && <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />}
                  {status === "done" && <CheckCircle2 className="w-12 h-12 text-white" />}
                </motion.button>
              </div>

              <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {status === "idle" && "Tap to Speak"}
                  {status === "recording" && "Listening..."}
                  {status === "processing" && "Analyzing Audio..."}
                  {status === "done" && "Analyzed!"}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {status === "idle" && "Explain the damage in your language"}
                  {status === "recording" && "Tap square to stop"}
                  {status === "processing" && "Extracting PMFBY keywords"}
                  {status === "done" && "Ready for next step"}
                </p>
              </div>

              {status === "idle" && (
                <button 
                  onClick={() => setTextMode(true)}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
                >
                  <Type className="w-4 h-4" />
                  Or type your report manually
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="text"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Manual Entry</h3>
                <button 
                  onClick={() => setTextMode(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Describe the damage..."
                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none font-medium mb-4"
              />
              
              <button
                onClick={submitText}
                disabled={!text.trim() || status === "processing"}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-sm"
              >
                {status === "processing" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Description"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
