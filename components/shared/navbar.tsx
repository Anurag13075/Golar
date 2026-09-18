"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.div 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <nav 
        className={`px-4 py-2.5 flex items-center justify-between transition-all duration-500 rounded-full ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center gap-8 pl-2">
          <Link href="/" className="font-semibold text-[15px] tracking-tight text-slate-900 flex items-center gap-2">
            Fasal Rakshak
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
              How it Works
            </Link>
            <Link href="/claims" className="text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
              My Claims
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <Link 
            href="/report" 
            className="text-[13px] font-medium text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95"
          >
            Start Claim <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>
    </motion.div>
  );
}
