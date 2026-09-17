"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Claim } from "@/lib/types";
import { DEMO_SCHEMES } from "@/data/schemes";
import ClaimCard from "@/components/claims/claim-card";

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch from /api/claims
    // For now, load from localStorage if exists, or show mock
    const loadClaims = () => {
      const stored = localStorage.getItem("fasal_rakshak_claims");
      if (stored) {
        setClaims(JSON.parse(stored));
      } else {
        // Create a mock rejected claim to show the appeal feature
        const mockClaim: Claim = {
          id: "claim_123456",
          reference_number: "FR-2026-89A4",
          policy: DEMO_SCHEMES.farmer_profiles[0],
          damage_type: "hailstorm",
          severity_percent: 65,
          damage_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          status: "rejected",
          rejection_reason: "Claim filed after 72 hours of incident.",
          created_at: new Date().toISOString()
        };
        setClaims([mockClaim]);
      }
      setLoading(false);
    };

    loadClaims();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">🌾</span> Fasal Rakshak
          </Link>
          <Link href="/report">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-blue-500/20 transition-all">
              + New Claim
            </button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-8">
        <div className="mb-10 text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-bold mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">My Claims</h1>
          <p className="text-slate-500 font-medium">Track your PMFBY claim status and file appeals. / अपने दावे की स्थिति ट्रैक करें।</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="h-6 w-32 bg-slate-200 rounded-lg mb-2" />
                    <div className="h-4 w-24 bg-slate-100 rounded-md" />
                  </div>
                  <div className="h-8 w-20 bg-slate-100 rounded-xl" />
                </div>
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j}>
                      <div className="h-3 w-16 bg-slate-100 rounded mb-2" />
                      <div className="h-4 w-20 bg-slate-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">No claims found</h2>
            <p className="text-slate-500 mb-6">You haven't filed any crop damage reports yet.</p>
            <Link href="/report">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-sm transition-colors">
                Report Crop Damage
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {claims.map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
