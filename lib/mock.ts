import { DEMO_FARMER_POLICY } from "@/data/schemes";
import type {
  Claim,
  DamageAnalysis,
  DamageSeverity,
  MismatchCheck,
  VoiceTranscription,
} from "@/lib/types";

const MOCK_DAMAGE_ANALYSIS: DamageAnalysis = {
  crop_detected: DEMO_FARMER_POLICY.crop,
  damage_type: "hailstorm",
  damage_type_hi: "ओलावृष्टि",
  severity: "severe",
  severity_percent: 65,
  is_recent: true,
  description: "Hail damage is visible across the wheat crop, with broken stems and damaged leaves.",
  description_hi: "गेहूं की फसल में ओलावृष्टि से तने टूटे हुए और पत्तियां क्षतिग्रस्त दिखाई दे रही हैं।",
  concerns: ["Broken stems", "Reduced yield expected"],
  matches_voice: true,
};

export function getMockTranscription(text?: string): VoiceTranscription {
  return {
    text: text?.trim() || "Hailstorm damaged my wheat crop in the last two days.",
    language: "en",
    extracted: {
      crop: DEMO_FARMER_POLICY.crop,
      damage_type: "hailstorm",
      damage_date: new Date().toISOString(),
      location_mentioned: `${DEMO_FARMER_POLICY.village}, ${DEMO_FARMER_POLICY.district}`,
      severity_described: "Severe damage to the crop",
      additional_details: "Several plants have broken stems and damaged leaves.",
    },
    confidence: 0.92,
  };
}

export function getMockDamageAnalysis(): {
  analysis: DamageAnalysis;
  photoUrl: string;
} {
  return {
    analysis: { ...MOCK_DAMAGE_ANALYSIS },
    photoUrl: "",
  };
}

export function getMockMismatchChecks(): MismatchCheck[] {
  return [
    {
      id: "policyholder-name",
      label: "Policyholder name matches",
      label_hi: "पॉलिसीधारक का नाम मेल खाता है",
      status: "pass",
      details: "The reported farmer name matches the policy records.",
      details_hi: "रिपोर्ट किए गए किसान का नाम पॉलिसी रिकॉर्ड से मेल खाता है।",
    },
    {
      id: "crop-match",
      label: "Crop matches policy",
      label_hi: "फसल पॉलिसी से मेल खाती है",
      status: "pass",
      details: "Wheat is covered by the selected policy.",
      details_hi: "चयनित पॉलिसी में गेहूं शामिल है।",
    },
    {
      id: "damage-date",
      label: "Damage reported within time window",
      label_hi: "क्षति समय सीमा के भीतर रिपोर्ट की गई",
      status: "warning",
      details: "Submit supporting evidence promptly to avoid a delayed-report issue.",
      details_hi: "देर से रिपोर्ट की समस्या से बचने के लिए सहायक प्रमाण जल्द जमा करें।",
      how_to_fix: "Submit the claim and photo evidence as soon as possible.",
      how_to_fix_hi: "दावा और फोटो प्रमाण जल्द से जल्द जमा करें।",
    },
  ];
}

export function getMockClaim(): Claim {
  const now = new Date().toISOString();
  const damageDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const severity: DamageSeverity = MOCK_DAMAGE_ANALYSIS.severity;

  return {
    id: "claim-demo-2026-001",
    reference_number: "PMFBY-2026-RJ-4523",
    policy: { ...DEMO_FARMER_POLICY },
    damage_type: MOCK_DAMAGE_ANALYSIS.damage_type,
    damage_date: damageDate,
    report_date: now,
    hours_remaining: 46,
    severity,
    severity_percent: MOCK_DAMAGE_ANALYSIS.severity_percent,
    cause_description: MOCK_DAMAGE_ANALYSIS.description,
    cause_description_hi: MOCK_DAMAGE_ANALYSIS.description_hi,
    photos: [],
    voice_transcript: getMockTranscription(),
    damage_analysis: { ...MOCK_DAMAGE_ANALYSIS },
    mismatch_checks: getMockMismatchChecks(),
    status: "draft",
    created_at: now,
    updated_at: now,
  };
}
