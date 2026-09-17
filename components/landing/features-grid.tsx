"use client";

import { motion } from "motion/react";
import { Mic, Image as ImageIcon, Scale, Bell, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: <Mic className="w-6 h-6 text-blue-500" />,
      title: "Voice-First Intake",
      desc: "Farmers describe their damage naturally in Hindi or local dialects. No typing required.",
      color: "bg-blue-50"
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-emerald-500" />,
      title: "AI Vision Assessment",
      desc: "Upload a photo of the field. Our multimodal AI detects crop type and estimates damage severity instantly.",
      color: "bg-emerald-50"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
      title: "Automated Compliance",
      desc: "Validates against PMFBY rules in real-time, catching Aadhaar or bank mismatches before rejection.",
      color: "bg-orange-50"
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: "72-Hour Safeguard",
      desc: "Tracks the critical reporting window, ensuring every claim is logged and timestamped defensively.",
      color: "bg-purple-50"
    },
    {
      icon: <Scale className="w-6 h-6 text-pink-500" />,
      title: "One-Click Appeals",
      desc: "If a claim is wrongfully rejected, generate a robust legal appeal letter citing exact scheme clauses.",
      color: "bg-pink-50"
    },
    {
      icon: <Bell className="w-6 h-6 text-amber-500" />,
      title: "WhatsApp Updates",
      desc: "Farmers receive claim status updates and confirmation receipts directly via WhatsApp.",
      color: "bg-amber-50"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need to secure your claim</h2>
          <p className="text-xl text-slate-500 font-medium">Built for farmers, powered by state-of-the-art AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
