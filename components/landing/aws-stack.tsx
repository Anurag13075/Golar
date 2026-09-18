"use client";

import { motion } from "motion/react";
import { Database, Server, HardDrive, BrainCircuit } from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

const services = [
  {
    name: "Amazon DynamoDB",
    role: "NoSQL Claims Storage",
    icon: Database,
    delay: 0.1
  },
  {
    name: "Amazon S3",
    role: "Immutable Photo Evidence",
    icon: HardDrive,
    delay: 0.2
  },
  {
    name: "AWS Amplify",
    role: "Global Edge Hosting",
    icon: Server,
    delay: 0.3
  },
  {
    name: "Groq LPU",
    role: "Real-time AI Inference",
    icon: BrainCircuit,
    delay: 0.4
  }
];

export default function AWSStack() {
  return (
    <section className="py-32 bg-white border-t border-slate-200/50">
      <div className="max-w-[1040px] mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Left Text */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-medium text-slate-900 mb-6 tracking-tight">
              Enterprise architecture
            </h2>
            <p className="text-[17px] text-slate-500 leading-relaxed font-normal mb-8">
              Built on a robust, serverless AWS foundation to ensure 99.99% uptime during peak harvest seasons when farmers need it most. We don't compromise on scale.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 text-[13px] font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>

          {/* Right Diagram Grid */}
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springTransition, delay: service.delay }}
                  className="group relative bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-slate-300/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-100 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-slate-900">{service.name}</h3>
                      <p className="text-[13px] text-slate-500 font-medium">{service.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
