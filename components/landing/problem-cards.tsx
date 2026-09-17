"use client";

import { motion } from "motion/react";

export default function ProblemCards() {
  return (
    <section className="py-32 bg-white px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">Why Use It?</h2>
        <p className="text-xl text-slate-500 mb-16 font-medium">Farmers are losing their rightful claims. AI fixes the process.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 transition-transform hover:-translate-y-1"
          >
            <div className="bg-[#4B96FF] h-48 rounded-[1.5rem] p-8 flex items-end">
              <div className="text-white text-7xl font-bold tracking-tighter">40%</div>
            </div>
            <div className="p-4 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">miss the 72-hour window</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Farmers must report damage within 72 hours. Most don't know, leading to auto-rejection before assessment begins.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 transition-transform hover:-translate-y-1"
          >
            <div className="bg-[#FF9F43] h-48 rounded-[1.5rem] p-8 flex items-end">
              <div className="text-white text-7xl font-bold tracking-tighter">25%</div>
            </div>
            <div className="p-4 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Aadhaar-bank mismatches</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                A simple spelling variation between Aadhaar and bank records causes immediate claim rejection.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 transition-transform hover:-translate-y-1"
          >
            <div className="bg-[#FF66A1] h-48 rounded-[1.5rem] p-8 flex items-end">
              <div className="text-white text-6xl font-bold tracking-tighter">
                ₹5.4K<span className="text-4xl opacity-90 tracking-tight">cr</span>
              </div>
            </div>
            <div className="p-4 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">pending in farmer claims</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Thousands of farmers are waiting for money they deserve, trapped in administrative backlogs.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
