"use client";

import { motion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTyping = () => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30); // typing speed
      return interval;
    };

    timeout = setTimeout(() => {
      const interval = startTyping();
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-6xl mx-auto space-y-32">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">How it works</h2>
          <p className="text-xl text-slate-500 font-medium">The intelligent agent that fights for your claim.</p>
        </div>

        {/* Block 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6 md:pr-8">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Every agent listens first</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Before filing anything, our AI listens to your voice report in your native language, so you never struggle with complex English forms.
            </p>
          </div>
          <div className="flex-1 w-full bg-[#60D060] rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-green-500/10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex justify-end mb-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-100 px-5 py-3 rounded-2xl rounded-tr-sm text-sm font-medium text-slate-700"
                >
                  मेरी फसल ओले से खराब हो गई
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                  F
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold mb-2 uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5"/> Read Report
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium min-h-[80px]">
                    <TypewriterText 
                      text="I've recorded hailstorm damage for your wheat crop. I will now analyze the satellite weather data for the past 72 hours to corroborate your claim. Want me to draft the report?" 
                      delay={1000} 
                    />
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6 md:pl-8">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">It fixes errors instantly</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              When the AI notices a mismatch between your Aadhaar and bank details, it proposes a precise fix. Approve it and the claim updates in place.
            </p>
          </div>
          <div className="flex-1 w-full bg-[#4B96FF] rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-500/10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="text-orange-500 font-bold text-sm mb-4 border-l-2 border-orange-500 pl-3">
                Mismatches Detected
              </div>
              <ul className="space-y-3 mb-8 pl-1">
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 text-sm text-slate-700 font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/> Aadhaar: Ram Kumar
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-sm text-slate-700 font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/> Bank: Ram Kumar Sharma
                </motion.li>
              </ul>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="border border-slate-200 rounded-2xl p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Sparkles className="w-4 h-4 text-orange-500"/> AI proposed
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-slate-500 hover:text-slate-900 font-medium px-2 transition-colors">
                      Reject
                    </button>
                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full font-semibold transition-colors">
                      Accept
                    </button>
                  </div>
                </div>
                <div className="text-sm text-green-800 bg-green-50 px-3 py-2 rounded-lg font-medium border border-green-100">
                  <TypewriterText text="Generate self-declaration affidavit for name variation." delay={1200} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
