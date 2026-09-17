import type { FarmerPolicy } from "@/lib/types";

export const DEMO_FARMER_POLICY: FarmerPolicy = {
  policy_number: "PMFBY/RJ/2026/14523",
  farmer_name: "Rajesh Kumar",
  farmer_name_bank: "R. Kumar",
  aadhaar_last4: "4523",
  crop: "Wheat",
  crop_hi: "गेहूं",
  area_hectares: 2.5,
  area_survey_number: "SN/124/A",
  state: "Rajasthan",
  district: "Jaipur",
  block: "Sanganer",
  village: "Pratap Nagar",
  season: "rabi",
  coverage_start: "2026-10-15",
  coverage_end: "2027-03-31",
  sum_insured: 125000,
  insurance_company: "Agriculture Insurance Company of India",
  bank_name: "State Bank of India",
  bank_account: "XXXX XXXX 7891",
  bank_ifsc: "SBIN0004523",
};

export const CROP_OPTIONS = [
  { value: "wheat", label: "Wheat", label_hi: "गेहूं" },
  { value: "rice", label: "Rice", label_hi: "चावल" },
  { value: "cotton", label: "Cotton", label_hi: "कपास" },
  { value: "sugarcane", label: "Sugarcane", label_hi: "गन्ना" },
  { value: "maize", label: "Maize", label_hi: "मक्का" },
  { value: "soybean", label: "Soybean", label_hi: "सोयाबीन" },
  { value: "mustard", label: "Mustard", label_hi: "सरसों" },
  { value: "groundnut", label: "Groundnut", label_hi: "मूंगफली" },
  { value: "chickpea", label: "Chickpea", label_hi: "चना" },
  { value: "potato", label: "Potato", label_hi: "आलू" },
  { value: "onion", label: "Onion", label_hi: "प्याज" },
  { value: "tomato", label: "Tomato", label_hi: "टमाटर" },
];

export const DAMAGE_TYPE_OPTIONS = [
  { value: "hailstorm", label: "Hailstorm", label_hi: "ओलावृष्टि" },
  { value: "flood", label: "Flood", label_hi: "बाढ़" },
  { value: "drought", label: "Drought", label_hi: "सूखा" },
  { value: "cyclone", label: "Cyclone", label_hi: "चक्रवात" },
  { value: "pest", label: "Pest Attack", label_hi: "कीट हमला" },
  { value: "disease", label: "Crop Disease", label_hi: "फसल रोग" },
  { value: "unseasonal_rain", label: "Unseasonal Rain", label_hi: "बेमौसम बारिश" },
  { value: "frost", label: "Frost", label_hi: "पाला" },
  { value: "landslide", label: "Landslide", label_hi: "भूस्खलन" },
  { value: "other", label: "Other", label_hi: "अन्य" },
];

export const STATE_OPTIONS = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const STATS = {
  pending_claims_crore: 5405,
  rajasthan_pending_crore: 947,
  rejection_rate_72hr: 40,
  rejection_rate_mismatch: 25,
  rejection_rate_wrong_crop: 20,
  rejection_rate_other: 15,
  total_farmers_enrolled_lakh: 280,
  claims_rejected_yearly_lakh: 45,
};
