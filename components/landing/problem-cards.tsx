"use client";

import { motion } from "motion/react";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export default function ProblemCards() {
  return (
    <section className="py-32 bg-[#FAFAFA] border-t border-slate-200/50 px-4">
      <div className="max-w-[1040px] mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-3xl font-medium text-slate-900 mb-4 tracking-tight">
            The failure of the current system
          </h2>
          <p className="text-[17px] text-slate-500 font-normal leading-relaxed">
            Thousands of legitimate PMFBY claims are rejected on technicalities before a human even reviews them. We fix the data before submission.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0 }}
            className="group bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-red-100/50 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="text-red-500 text-5xl font-medium tracking-tighter mb-6">40%</div>
              <h3 className="text-[17px] font-semibold text-slate-900 mb-2">Miss the 72-hour window</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-normal">
                Farmers must report damage within 72 hours. Most don't know, leading to auto-rejection before assessment even begins.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="group bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-amber-100/50 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="text-amber-500 text-5xl font-medium tracking-tighter mb-6">25%</div>
              <h3 className="text-[17px] font-semibold text-slate-900 mb-2">Aadhaar-bank mismatches</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-normal">
                A simple spelling variation between Aadhaar and bank records causes immediate, unappealable claim rejection.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="group bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-100/50 transition-colors duration-500" />
            <div className="relative z-10">
              <div className="text-blue-500 text-5xl font-medium tracking-tighter mb-6">
                <span className="text-[32px] align-top relative top-1">₹</span>15.4<span className="text-[32px] tracking-tight">K<span className="text-xl">cr</span></span>
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900 mb-2">Pending in farmer claims</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed font-normal">
                Thousands of farmers are waiting for money they deserve, trapped in endless bureaucratic and administrative backlogs.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
