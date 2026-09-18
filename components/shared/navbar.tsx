"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <nav className="bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.08)] rounded-full px-6 py-3.5 flex items-center justify-between border border-slate-100">
        <Link href="/" className="font-bold text-lg text-slate-900 flex items-center gap-2">
          🌾 Fasal Rakshak
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
            How it Works
          </Link>
          <Link href="/claims" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
            My Claims
          </Link>
        </div>

        <div className="flex items-center">
          <Link 
            href="/report" 
            className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-500/20"
          >
            Start Claim <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
