// ─── Scheme & Policy ────────────────────────────────────────────

export interface PMFBYScheme {
  id: string;
  name: string;
  name_hi: string;
  season: "kharif" | "rabi" | "summer";
  crop_categories: string[];
  coverage: string;
  premium_farmer_percent: number;
  premium_govt_percent: number;
}

export interface FarmerPolicy {
  policy_number: string;
  farmer_name: string;
  farmer_name_bank: string;
  aadhaar_last4: string;
  crop: string;
  crop_hi: string;
  area_hectares: number;
  area_survey_number: string;
  state: string;
  district: string;
  block: string;
  village: string;
  season: "kharif" | "rabi" | "summer";
  coverage_start: string;
  coverage_end: string;
  sum_insured: number;
  insurance_company: string;
  bank_name: string;
  bank_account: string;
  bank_ifsc: string;
}

// ─── Damage Report ──────────────────────────────────────────────

export type DamageType =
  | "hailstorm"
  | "flood"
  | "drought"
  | "cyclone"
  | "pest"
  | "disease"
  | "unseasonal_rain"
  | "frost"
  | "landslide"
  | "other";

export type DamageSeverity = "low" | "moderate" | "severe" | "total_loss";

export interface VoiceTranscription {
  text: string;
  language: string;
  extracted: {
    crop?: string;
    damage_type?: DamageType;
    damage_date?: string;
    location_mentioned?: string;
    severity_described?: string;
    additional_details?: string;
  };
  confidence: number;
}

export interface DamageAnalysis {
  crop_detected: string;
  damage_type: DamageType;
  damage_type_hi: string;
  severity: DamageSeverity;
  severity_percent: number;
  is_recent: boolean;
  description: string;
  description_hi: string;
  concerns: string[];
  matches_voice: boolean;
  mismatch_details?: string;
}

export interface PhotoEvidence {
  s3_key: string;
  url: string;
  timestamp: string;
  gps_lat?: number;
  gps_lng?: number;
  analysis?: DamageAnalysis;
}

// ─── Claim ──────────────────────────────────────────────────────

export type ClaimStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "appealed";

export type MismatchSeverity = "pass" | "warning" | "fail";

export interface MismatchCheck {
  id: string;
  label: string;
  label_hi: string;
  status: MismatchSeverity;
  details: string;
  details_hi: string;
  how_to_fix?: string;
  how_to_fix_hi?: string;
}

export interface Claim {
  id: string;
  reference_number: string;
  policy: FarmerPolicy;
  damage_type: DamageType;
  damage_date: string;
  report_date: string;
  hours_remaining: number;
  severity: DamageSeverity;
  severity_percent: number;
  cause_description: string;
  cause_description_hi: string;
  photos: PhotoEvidence[];
  voice_transcript?: VoiceTranscription;
  damage_analysis?: DamageAnalysis;
  mismatch_checks: MismatchCheck[];
  status: ClaimStatus;
  rejection_reason?: string;
  appeal_id?: string;
  created_at: string;
  updated_at: string;
}

// ─── Appeal ─────────────────────────────────────────────────────

export interface Appeal {
  id: string;
  claim_id: string;
  claim_reference: string;
  rejection_reason: string;
  guideline_citations: GuidelineCitation[];
  letter_content: string;
  letter_content_hi: string;
  addressed_to: string;
  generated_at: string;
}

export interface GuidelineCitation {
  section: string;
  title: string;
  relevant_text: string;
  how_it_supports: string;
}

// ─── Rules Engine ───────────────────────────────────────────────

export interface PMFBYRule {
  id: string;
  name: string;
  name_hi: string;
  description: string;
  description_hi: string;
  guideline_section: string;
  check_type: "time_window" | "name_match" | "crop_match" | "area_match" | "date_range" | "document_check";
  rejection_percentage: number;
  severity: MismatchSeverity;
}

// ─── UI State ───────────────────────────────────────────────────

export type Language = "en" | "hi";

export type ReportStep = 1 | 2 | 3 | 4;

export interface ReportState {
  step: ReportStep;
  language: Language;
  damage_date: string | null;
  voice_transcript: VoiceTranscription | null;
  photos: PhotoEvidence[];
  damage_analysis: DamageAnalysis | null;
  claim: Partial<Claim> | null;
  mismatch_checks: MismatchCheck[];
  is_processing: boolean;
  error: string | null;
}

// ─── API Responses ──────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TranscribeResponse {
  transcription: VoiceTranscription;
}

export interface AnalyzeDamageResponse {
  analysis: DamageAnalysis;
  photo: PhotoEvidence;
}

export interface BuildClaimResponse {
  claim: Claim;
  mismatch_checks: MismatchCheck[];
}

export interface SubmitClaimResponse {
  reference_number: string;
  claim_id: string;
}

export interface GenerateAppealResponse {
  appeal: Appeal;
}
