/**
 * Mock responses for the entire pipeline.
 * Used when AWS credentials are not configured,
 * or for demo/hackathon purposes.
 */

import type {
  VoiceTranscription,
  DamageAnalysis,
  MismatchCheck,
  Claim,
  Appeal,
} from "@/lib/types";
import { DEMO_FARMER_POLICY } from "@/data/schemes";

export const USE_MOCK = !process.env.AWS_ACCESS_KEY_ID;

// ── Voice Transcription Mock ────────────────────────────────────

export function getMockTranscription(text?: string): VoiceTranscription {
  return {
    text:
      text ||
      "कल ओलावृष्टि से मेरे गेहूं के खेत में बहुत नुकसान हुआ है। ज्यादातर फसल बर्बाद हो गई।",
    language: "hi-IN",
    extracted: {
      crop: "wheat",
      damage_type: "hailstorm",
      damage_date: new Date(Date.now() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      location_mentioned: "my wheat field",
      severity_described: "most of the crop is destroyed",
      additional_details: "Hailstorm occurred yesterday",
    },
    confidence: 0.94,
  };
}

// ── Vision / Damage Analysis Mock ───────────────────────────────

export function getMockDamageAnalysis(): DamageAnalysis {
  return {
    crop_detected: "Wheat (Triticum aestivum)",
    damage_type: "hailstorm",
    damage_type_hi: "ओलावृष्टि",
    severity: "severe",
    severity_percent: 68,
    is_recent: true,
    description:
      "Significant hailstorm damage observed. Wheat stalks are broken and flattened across approximately 60-70% of the visible area. Hailstones have caused physical impact damage to the crop heads. The damage appears fresh — within the last 24-48 hours based on the state of the broken stalks.",
    description_hi:
      "महत्वपूर्ण ओलावृष्टि क्षति देखी गई। दृश्य क्षेत्र के लगभग 60-70% में गेहूं के तने टूटे और चपटे हैं। ओलों ने फसल की बालियों को शारीरिक क्षति पहुंचाई है।",
    concerns: [],
    matches_voice: true,
  };
}

// ── Mismatch Checks Mock ────────────────────────────────────────

export function getMockMismatchChecks(): MismatchCheck[] {
  return [
    {
      id: "72_hour_window",
      label: "72-Hour Reporting Window",
      label_hi: "72 घंटे की रिपोर्टिंग विंडो",
      status: "pass",
      details: "Damage reported within 24 hours — well within the 72-hour limit.",
      details_hi: "नुकसान 24 घंटे के भीतर रिपोर्ट किया गया — 72 घंटे की सीमा के भीतर।",
    },
    {
      id: "aadhaar_bank_name",
      label: "Aadhaar-Bank Name Match",
      label_hi: "आधार-बैंक नाम मिलान",
      status: "warning",
      details:
        'Aadhaar name: "Rajesh Kumar" | Bank name: "R. Kumar" — these don\'t match exactly. This causes 25% of claim rejections.',
      details_hi:
        'आधार नाम: "Rajesh Kumar" | बैंक नाम: "R. Kumar" — ये बिल्कुल मेल नहीं खाते। इससे 25% दावे खारिज होते हैं।',
      how_to_fix:
        "Visit your bank branch with your Aadhaar card and request a name correction on your account to match your Aadhaar exactly.",
      how_to_fix_hi:
        "अपने आधार कार्ड के साथ बैंक शाखा जाएं और अपने खाते पर नाम सुधार का अनुरोध करें।",
    },
    {
      id: "crop_match",
      label: "Crop Declaration Match",
      label_hi: "फसल घोषणा मिलान",
      status: "pass",
      details:
        "Reported crop (Wheat) matches policy crop (Wheat). ✓",
      details_hi: "रिपोर्ट की गई फसल (गेहूं) पॉलिसी फसल (गेहूं) से मेल खाती है। ✓",
    },
    {
      id: "area_match",
      label: "Sown Area Verification",
      label_hi: "बुवाई क्षेत्र सत्यापन",
      status: "pass",
      details: "Claimed area (2.5 hectares) matches policy area (2.5 hectares). ✓",
      details_hi: "दावा क्षेत्र (2.5 हेक्टेयर) पॉलिसी क्षेत्र (2.5 हेक्टेयर) से मेल खाता है। ✓",
    },
    {
      id: "coverage_period",
      label: "Coverage Period",
      label_hi: "कवरेज अवधि",
      status: "pass",
      details: "Damage date falls within the Rabi season coverage period. ✓",
      details_hi: "नुकसान की तारीख रबी सीजन कवरेज अवधि के भीतर है। ✓",
    },
    {
      id: "photo_evidence",
      label: "Photo Evidence",
      label_hi: "फोटो साक्ष्य",
      status: "pass",
      details:
        "Timestamped photo evidence attached. GPS coordinates and time metadata recorded.",
      details_hi: "टाइमस्टैम्प फोटो साक्ष्य संलग्न। GPS निर्देशांक और समय मेटाडेटा दर्ज।",
    },
  ];
}

// ── Full Claim Mock ─────────────────────────────────────────────

export function getMockClaim(): Claim {
  const now = new Date();
  const damageDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return {
    id: "claim-001",
    reference_number: "PMFBY-2026-RJ-00847",
    policy: DEMO_FARMER_POLICY,
    damage_type: "hailstorm",
    damage_date: damageDate.toISOString(),
    report_date: now.toISOString(),
    hours_remaining: 48,
    severity: "severe",
    severity_percent: 68,
    cause_description:
      "Severe hailstorm caused extensive damage to wheat crop. Approximately 60-70% of the standing crop has been flattened. Hailstones damaged crop heads and broke stalks across 2.5 hectares.",
    cause_description_hi:
      "गंभीर ओलावृष्टि ने गेहूं की फसल को व्यापक नुकसान पहुंचाया। खड़ी फसल का लगभग 60-70% चपटा हो गया है।",
    photos: [
      {
        s3_key: "claims/claim-001/photo-1.jpg",
        url: "/placeholder-crop-damage.jpg",
        timestamp: now.toISOString(),
        gps_lat: 26.9124,
        gps_lng: 75.7873,
        analysis: getMockDamageAnalysis(),
      },
    ],
    voice_transcript: getMockTranscription(),
    damage_analysis: getMockDamageAnalysis(),
    mismatch_checks: getMockMismatchChecks(),
    status: "draft",
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  };
}

// ── Appeal Mock ─────────────────────────────────────────────────

export function getMockAppeal(): Appeal {
  return {
    id: "appeal-001",
    claim_id: "claim-002",
    claim_reference: "PMFBY-2026-RJ-00623",
    rejection_reason: "Insufficient photographic evidence of crop damage",
    guideline_citations: [
      {
        section: "Section 11.3",
        title: "Loss Assessment & Documentation",
        relevant_text:
          "The farmer should provide photographic evidence and any supporting documentation of the damage.",
        how_it_supports:
          "The guideline uses 'should', not 'must' — photographic evidence strengthens a claim but its absence alone cannot be grounds for rejection when other evidence (field visit, weather records) supports the claim.",
      },
      {
        section: "Section 13.1",
        title: "Grievance Redressal",
        relevant_text:
          "A District Level Monitoring Committee (DLMC) shall be the first level of grievance redressal.",
        how_it_supports:
          "The DLMC has the authority to review and overturn claim rejections.",
      },
    ],
    letter_content: `To,
The Chairman,
District Level Monitoring Committee (DLMC),
District Collector's Office,
Jaipur, Rajasthan

Subject: Appeal against rejection of crop insurance claim under PMFBY
Claim Reference: PMFBY-2026-RJ-00623

Respected Sir/Madam,

I, Rajesh Kumar, son of Shri Mohan Kumar, resident of Village Pratap Nagar, Block Sanganer, District Jaipur, Rajasthan, respectfully submit this appeal against the rejection of my crop insurance claim under the Pradhan Mantri Fasal Bima Yojana.

My claim for crop loss due to flood damage to my rice crop (2.5 hectares, Survey No. SN/124/A) was rejected on the grounds of "Insufficient photographic evidence of crop damage."

I wish to bring the following to your kind attention:

1. As per PMFBY Operational Guidelines Section 11.3, photographic evidence is recommended to strengthen claims using the word "should" rather than "must." The absence of photographs alone cannot constitute grounds for rejection when corroborating evidence exists.

2. My loss intimation was filed within the 72-hour window as mandated by Section 11.2 of the guidelines.

3. The India Meteorological Department (IMD) recorded heavy flooding in the Sanganer block during the period of my reported loss, which independently corroborates my claim.

4. The loss assessor appointed by the Insurance Company visited my field and documented the damage in their report.

I humbly request the DLMC to review my claim in light of the above facts and the PMFBY guidelines, and direct the Insurance Company to process my legitimate claim.

Thanking you,

Rajesh Kumar
Policy No: PMFBY/RJ/2026/14523
Aadhaar: XXXX XXXX 4523
Mobile: XXXXXXXXXX
Date: ${new Date().toLocaleDateString("en-IN")}`,
    letter_content_hi: `सेवा में,
अध्यक्ष,
जिला स्तरीय निगरानी समिति (DLMC),
जिला कलेक्टर कार्यालय,
जयपुर, राजस्थान

विषय: PMFBY के तहत फसल बीमा दावे की अस्वीकृति के खिलाफ अपील
दावा संदर्भ: PMFBY-2026-RJ-00623

आदरणीय महोदय/महोदया,

मैं, राजेश कुमार, पुत्र श्री मोहन कुमार, निवासी ग्राम प्रताप नगर, ब्लॉक सांगानेर, जिला जयपुर, राजस्थान, प्रधानमंत्री फसल बीमा योजना के तहत अपने फसल बीमा दावे की अस्वीकृति के खिलाफ यह अपील सादर प्रस्तुत करता हूं।

कृपया मेरे दावे की समीक्षा करें।

धन्यवाद,
राजेश कुमार`,
    addressed_to:
      "Chairman, District Level Monitoring Committee (DLMC), Jaipur, Rajasthan",
    generated_at: new Date().toISOString(),
  };
}
