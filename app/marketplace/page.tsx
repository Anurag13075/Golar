"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Bot, LineChart, Shield, Sprout, ArrowRight } from "lucide-react";
import Navbar from "@/components/shared/navbar";

const AGENTS = [
  {
    id: "advocate",
    name: "Claim Advocate",
    description: "Automatically analyzes PMFBY guidelines to fight rejected claims and drafts formal grievances.",
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
  },
  {
    id: "doctor",
    name: "Crop Doctor",
    description: "Analyzes photos of your crop to diagnose diseases, pests, and recommends immediate treatments.",
    icon: <Sprout className="w-8 h-8 text-emerald-500" />,
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    id: "mandi",
    name: "Mandi Trader",
    description: "Tracks real-time prices in nearby mandis to help you decide whether to sell or claim insurance.",
    icon: <LineChart className="w-8 h-8 text-amber-500" />,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    id: "subsidy",
    name: "Scheme Finder",
    description: "Matches your farmer profile with hundreds of state and central government subsidies.",
    icon: <Bot className="w-8 h-8 text-purple-500" />,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
  }
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />
      
      <div className="pt-32 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-blue-800 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Nova Powered
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            The Farmer&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Marketplace</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Deploy specialized AI agents powered by Amazon Nova to fight your claims, diagnose your crops, and maximize your profit.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid md:grid-cols-2 gap-6"
        >
          {AGENTS.map((agent) => (
            <motion.div
              key={agent.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Link href={`/marketplace/${agent.id}`}>
                <div className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all cursor-pointer overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${agent.color} -mr-10 -mt-10`} />
                  
                  <div className={`w-16 h-16 rounded-2xl ${agent.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {agent.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{agent.name}</h3>
                  <p className="text-slate-500 font-medium mb-8">
                    {agent.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                    Deploy Agent <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
