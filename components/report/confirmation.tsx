"use client";

import { motion } from "motion/react";
import { CheckCircle2, Copy, Volume2, Download, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ConfirmationProps {
  referenceNumber: string;
  claimId: string;
}

export default function Confirmation({ referenceNumber, claimId }: ConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `Fasal Rakshak Claim Submitted. Ref No: ${referenceNumber}. Please process within 21 days as per PMFBY Section 12.1.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-slate-100 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
      <div className="relative mb-6 mt-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-emerald-100 rounded-full"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.1 }}
          className="relative z-10 w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200"
        >
          <CheckCircle2 className="w-16 h-16 text-emerald-600" />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">Claim Submitted Successfully!</h2>
      <p className="text-slate-500 mb-8 font-medium">दावा सफलतापूर्वक जमा हो गया!</p>

      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 relative group shadow-inner">
        <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">Reference Number</div>
        <div className="text-2xl font-mono font-bold text-blue-600">{referenceNumber}</div>
        <button 
          onClick={handleCopy}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-500 transition-colors shadow-sm"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>

      <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-2.5 px-5 rounded-full transition-colors mb-8 border border-blue-200 font-semibold">
        <Volume2 className="w-4 h-4" />
        Listen to confirmation in Hindi
      </button>

      <div className="w-full text-left bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100">
        <h3 className="font-bold text-slate-900 mb-3">Next Steps:</h3>
        <ol className="space-y-3 text-sm text-slate-700 list-decimal pl-4 font-medium">
          <li>Save this reference number securely.</li>
          <li>Keep your photo evidence safe until assessment.</li>
          <li>Insurance company has <strong className="text-slate-900">21 days</strong> to respond (PMFBY Section 12.1).</li>
          <li>If rejected unfairly, come back here for appeal help.</li>
        </ol>
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-colors text-sm shadow-sm">
          <Download className="w-4 h-4" />
          Download Copy
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-colors text-sm shadow-md shadow-green-500/20"
        >
          <Share2 className="w-4 h-4" />
          WhatsApp
        </button>
      </div>

      <Link 
        href="/claims"
        className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-sm font-bold transition-colors"
      >
        Go to My Claims <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
