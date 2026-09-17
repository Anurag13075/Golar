import { NextResponse } from 'next/server';
import { randomUUID } from "crypto";
import { getPolicy } from "@/lib/dynamodb";
import type { DamageAnalysis, VoiceTranscription, PhotoEvidence, MismatchCheck, Claim } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      policy_number,
      voice_data,
      damage_analysis,
      photos = [],
      damage_date,
    }: {
      policy_number?: string;
      voice_data?: VoiceTranscription;
      damage_analysis?: DamageAnalysis;
      photos?: PhotoEvidence[];
      damage_date?: string;
    } = body;
    
    if (!policy_number || !voice_data || !damage_analysis || !damage_date) {
      return NextResponse.json({ success: false, error: "Policy number, report, photo analysis, and damage date are required" }, { status: 400 });
    }

    const policy = await getPolicy(policy_number);
    const reportDate = new Date();
    const incidentDate = new Date(damage_date);
    if (Number.isNaN(incidentDate.getTime())) {
      return NextResponse.json({ success: false, error: "Invalid damage date" }, { status: 400 });
    }

    const cropMatches = !voice_data.extracted.crop ||
      voice_data.extracted.crop.toLowerCase() === policy.crop.toLowerCase();
    const withinCoverage = incidentDate >= new Date(policy.coverage_start) &&
      incidentDate <= new Date(policy.coverage_end);
    const within72Hours = reportDate.getTime() - incidentDate.getTime() <= 72 * 60 * 60 * 1000;
    const mismatch_checks: MismatchCheck[] = [
      {
        id: "crop-match", label: "Crop matches policy", label_hi: "फसल पॉलिसी से मेल खाती है",
        status: cropMatches ? "pass" : "fail",
        details: cropMatches ? "The reported crop matches the policy." : "The reported crop does not match the policy.",
        details_hi: cropMatches ? "रिपोर्ट की गई फसल पॉलिसी से मेल खाती है।" : "रिपोर्ट की गई फसल पॉलिसी से मेल नहीं खाती।",
      },
      {
        id: "coverage-period", label: "Damage occurred during coverage", label_hi: "क्षति कवरेज अवधि में हुई",
        status: withinCoverage ? "pass" : "fail",
        details: withinCoverage ? "The incident date is within the policy coverage period." : "The incident date is outside the policy coverage period.",
        details_hi: withinCoverage ? "घटना की तारीख पॉलिसी कवरेज अवधि में है।" : "घटना की तारीख पॉलिसी कवरेज अवधि से बाहर है।",
      },
      {
        id: "72-hour-intimation", label: "Reported within 72 hours", label_hi: "72 घंटे के भीतर रिपोर्ट की गई",
        status: within72Hours ? "pass" : "warning",
        details: within72Hours ? "The report was submitted within 72 hours." : "The report was submitted more than 72 hours after the incident.",
        details_hi: within72Hours ? "रिपोर्ट 72 घंटे के भीतर जमा की गई।" : "रिपोर्ट घटना के 72 घंटे बाद जमा की गई।",
      },
      {
        id: "photo-evidence", label: "Photo evidence provided", label_hi: "फोटो साक्ष्य उपलब्ध",
        status: photos.length > 0 ? "pass" : "warning",
        details: photos.length > 0 ? "Photo evidence is attached." : "Add photo evidence to strengthen the claim.",
        details_hi: photos.length > 0 ? "फोटो साक्ष्य संलग्न है।" : "दावे को मजबूत करने के लिए फोटो जोड़ें।",
      },
    ];

    const now = reportDate.toISOString();
    const claim: Claim = {
      id: randomUUID(),
      reference_number: `PMFBY-${reportDate.getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
      policy,
      damage_type: damage_analysis.damage_type,
      damage_date: incidentDate.toISOString(),
      report_date: now,
      hours_remaining: Math.max(0, 72 - Math.floor((reportDate.getTime() - incidentDate.getTime()) / 3600000)),
      severity: damage_analysis.severity,
      severity_percent: damage_analysis.severity_percent,
      cause_description: damage_analysis.description,
      cause_description_hi: damage_analysis.description_hi,
      photos,
      voice_transcript: voice_data,
      damage_analysis,
      mismatch_checks,
      status: "draft",
      created_at: now,
      updated_at: now,
    };

    return NextResponse.json({ success: true, data: { claim, mismatch_checks } });
  } catch (error) {
    console.error('Build claim error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
