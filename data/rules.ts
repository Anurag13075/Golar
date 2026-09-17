import type { PMFBYRule } from "@/lib/types";

export const PMFBY_RULES: PMFBYRule[] = [
  {
    id: "72_hour_intimation",
    name: "72-Hour Intimation Window",
    name_hi: "72 घंटे की सूचना समय सीमा",
    description:
      "Crop loss must be intimated to the insurance company, bank, or local agriculture office within 72 hours of the calamity occurrence.",
    description_hi:
      "फसल नुकसान की सूचना बीमा कंपनी, बैंक या स्थानीय कृषि कार्यालय को आपदा घटना के 72 घंटे के भीतर दी जानी चाहिए।",
    guideline_section: "Section 11.2",
    check_type: "time_window",
    rejection_percentage: 40,
    severity: "fail",
  },
  {
    id: "aadhaar_bank_match",
    name: "Aadhaar-Bank Name Match",
    name_hi: "आधार-बैंक नाम मिलान",
    description:
      "The name on the Aadhaar card must exactly match the name on the linked bank account. Mismatches cause automatic rejection during verification.",
    description_hi:
      "आधार कार्ड पर नाम बैंक खाते के नाम से बिल्कुल मेल खाना चाहिए। सत्यापन के दौरान मिसमैच से स्वचालित अस्वीकृति होती है।",
    guideline_section: "Section 8.4",
    check_type: "name_match",
    rejection_percentage: 25,
    severity: "fail",
  },
  {
    id: "crop_declaration_match",
    name: "Crop Declaration Match",
    name_hi: "फसल घोषणा मिलान",
    description:
      "The crop reported as damaged must match the crop declared in the insurance policy. Claiming for a different crop leads to rejection.",
    description_hi:
      "नुकसान की रिपोर्ट की गई फसल बीमा पॉलिसी में घोषित फसल से मेल खानी चाहिए। अलग फसल का दावा करने पर अस्वीकृति होती है।",
    guideline_section: "Section 9.1",
    check_type: "crop_match",
    rejection_percentage: 20,
    severity: "fail",
  },
  {
    id: "area_match",
    name: "Sown Area Verification",
    name_hi: "बुवाई क्षेत्र सत्यापन",
    description:
      "The area of land claimed must match the area declared in the insurance enrollment. Over-declaration leads to partial or full rejection.",
    description_hi:
      "दावा किया गया भूमि क्षेत्र बीमा नामांकन में घोषित क्षेत्र से मेल खाना चाहिए। अधिक घोषणा से आंशिक या पूर्ण अस्वीकृति होती है।",
    guideline_section: "Section 9.3",
    check_type: "area_match",
    rejection_percentage: 10,
    severity: "warning",
  },
  {
    id: "coverage_period",
    name: "Coverage Period Check",
    name_hi: "कवरेज अवधि जांच",
    description:
      "The damage must have occurred within the policy coverage period (sowing to harvesting for the declared season).",
    description_hi:
      "नुकसान पॉलिसी कवरेज अवधि (घोषित मौसम के लिए बुवाई से कटाई तक) के भीतर हुआ होना चाहिए।",
    guideline_section: "Section 7.2",
    check_type: "date_range",
    rejection_percentage: 5,
    severity: "fail",
  },
  {
    id: "photo_evidence",
    name: "Photo Evidence with Timestamp",
    name_hi: "टाइमस्टैम्प के साथ फोटो साक्ष्य",
    description:
      "Photographic evidence of crop damage with a verifiable timestamp strengthens the claim and is increasingly required by insurance companies.",
    description_hi:
      "सत्यापन योग्य टाइमस्टैम्प के साथ फसल नुकसान का फोटोग्राफिक साक्ष्य दावे को मजबूत करता है।",
    guideline_section: "Section 11.3",
    check_type: "document_check",
    rejection_percentage: 15,
    severity: "warning",
  },
];

export function getRuleById(id: string): PMFBYRule | undefined {
  return PMFBY_RULES.find((r) => r.id === id);
}
