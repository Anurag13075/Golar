"use client";

import { motion } from "motion/react";
import { Database, Server, HardDrive, BrainCircuit, Activity, Cloud } from "lucide-react";

const services = [
  {
    name: "Amazon DynamoDB",
    role: "NoSQL Claims Storage",
    icon: Database,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/20",
    delay: 0.1
  },
  {
    name: "Amazon S3",
    role: "Immutable Photo Evidence",
    icon: HardDrive,
    color: "from-green-500 to-emerald-400",
    shadow: "shadow-emerald-500/20",
    delay: 0.2
  },
  {
    name: "AWS Amplify",
    role: "Global Edge Hosting",
    icon: Server,
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20",
    delay: 0.3
  },
  {
    name: "LPU AI Inference",
    role: "Real-time Voice & Vision",
    icon: BrainCircuit,
    color: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-500/20",
    delay: 0.4
  }
];

export default function AWSStack() {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-6"
          >
            <Cloud className="w-4 h-4" /> Enterprise Infrastructure
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">massive scale.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Built on a robust, serverless AWS foundation to ensure 99.99% uptime during peak harvest seasons when farmers need it most.
          </motion.p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative mt-24 mb-12 max-w-5xl mx-auto">
          {/* Animated Connecting Lines (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <svg className="absolute w-full h-full left-0 top-0 overflow-visible" fill="none">
              <motion.path
                d="M 200,100 Q 500,100 500,200 T 800,100"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="opacity-30"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M 200,300 Q 500,300 500,200 T 800,300"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="opacity-30"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay, duration: 0.5, type: "spring" }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] mb-6 ${service.shadow} shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {service.role}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Realtime metric */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-md">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-slate-300 text-sm font-medium">System Status: <span className="text-white font-bold tracking-wide">ALL SYSTEMS OPERATIONAL</span></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
