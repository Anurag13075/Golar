"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ShieldCheck, Zap, Users, CheckCircle2 } from "lucide-react";

const AnimatedNumber = ({ value, duration = 2000, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
        
        setDisplayValue(Math.floor(easeOut * value));
        
        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default function ImpactStats() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-50/50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Real impact, real fast.
          </motion.h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            We are eliminating the bureaucracy that causes 60% of legitimate PMFBY claims to be rejected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <Zap className="w-8 h-8 text-blue-600 mb-6 relative z-10" />
            <div className="text-5xl font-black text-slate-900 mb-2 relative z-10 tracking-tighter">
              <AnimatedNumber value={2.4} suffix="s" />
            </div>
            <p className="text-slate-500 font-medium relative z-10">Average AI claim processing time, down from 14 days.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <ShieldCheck className="w-8 h-8 text-emerald-600 mb-6 relative z-10" />
            <div className="text-5xl font-black text-slate-900 mb-2 relative z-10 tracking-tighter">
              <AnimatedNumber value={99} suffix="%" />
            </div>
            <p className="text-slate-500 font-medium relative z-10">Accuracy in matching farmer Aadhaar and bank mismatch errors.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <Users className="w-8 h-8 text-orange-600 mb-6 relative z-10" />
            <div className="text-5xl font-black text-slate-900 mb-2 relative z-10 tracking-tighter">
              <AnimatedNumber value={12} suffix="+" />
            </div>
            <p className="text-slate-500 font-medium relative z-10">Indian regional languages fully supported via voice-to-text.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl shadow-blue-900/20 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-900/40 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <CheckCircle2 className="w-8 h-8 text-blue-400 mb-6 relative z-10" />
            <div className="text-5xl font-black text-white mb-2 relative z-10 tracking-tighter">
              ₹<AnimatedNumber value={420} suffix="Cr" />
            </div>
            <p className="text-slate-400 font-medium relative z-10">In claims saved from wrongful rejection due to technicalities.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
