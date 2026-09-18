"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const AnimatedNumber = ({ value, duration = 2000, suffix = "", prefix = "" }: { value: number, duration?: number, suffix?: string, prefix?: string }) => {
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
        
        // easeOutExpo
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
    <span ref={ref} className="tabular-nums tracking-tighter">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default function ImpactStats() {
  return (
    <section className="py-24 bg-white border-t border-slate-200/50">
      <div className="max-w-[1040px] mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="text-[40px] md:text-[56px] font-medium text-slate-900 leading-none">
              <AnimatedNumber value={2} suffix="s" />
            </div>
            <p className="text-[14px] text-slate-500 font-medium">Average claim AI processing</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <div className="text-[40px] md:text-[56px] font-medium text-slate-900 leading-none">
              <AnimatedNumber value={99} suffix="%" />
            </div>
            <p className="text-[14px] text-slate-500 font-medium">Accuracy on Aadhaar match</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <div className="text-[40px] md:text-[56px] font-medium text-slate-900 leading-none">
              <AnimatedNumber value={12} suffix="+" />
            </div>
            <p className="text-[14px] text-slate-500 font-medium">Regional languages supported</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.3 }}
            className="flex flex-col gap-2"
          >
            <div className="text-[40px] md:text-[56px] font-medium text-slate-900 leading-none">
              <AnimatedNumber value={420} prefix="₹" suffix="Cr" />
            </div>
            <p className="text-[14px] text-slate-500 font-medium">Saved from wrongful rejection</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
