import type { GuidelineCitation } from "@/lib/types";

export const PMFBY_GUIDELINES: Record<string, GuidelineCitation> = {
  "section_7.2": {
    section: "Section 7.2",
    title: "Coverage Period",
    relevant_text:
      "The coverage period for each notified crop shall be from sowing to harvesting of the crop, aligned with the season specified in the notification.",
    how_it_supports:
      "Establishes that coverage applies for the full growing season of the notified crop.",
  },
  "section_8.4": {
    section: "Section 8.4",
    title: "Farmer Enrollment & Documentation",
    relevant_text:
      "Banks shall ensure that the Aadhaar number, bank account details, and land records of the farmer are verified and linked correctly at the time of enrollment.",
    how_it_supports:
      "Places responsibility on banks for correct data linkage — farmer should not be penalized for bank-side errors.",
  },
  "section_9.1": {
    section: "Section 9.1",
    title: "Crop and Area Declaration",
    relevant_text:
      "The crop sown must be a notified crop for the area, and the declaration must match the actual sowing pattern as verified during crop cutting experiments.",
    how_it_supports:
      "Specifies that the notified crop list is area-specific and should be verified against actual sowing.",
  },
  "section_11.2": {
    section: "Section 11.2",
    title: "Individual Claim - Loss Intimation",
    relevant_text:
      "In case of localized calamities and post-harvest losses, the affected farmer must intimate the crop loss to the Insurance Company, the concerned bank, or the local agriculture department within 72 hours of occurrence of the calamity.",
    how_it_supports:
      "Defines the 72-hour window. Note: the intimation can be to the insurance company OR the bank OR the agriculture department — the farmer has three channels, and intimation to any one counts.",
  },
  "section_11.3": {
    section: "Section 11.3",
    title: "Loss Assessment & Documentation",
    relevant_text:
      "Upon receipt of loss intimation, the Insurance Company shall appoint a loss assessor to visit the affected area within 48 hours. The farmer should provide photographic evidence and any supporting documentation of the damage.",
    how_it_supports:
      "Establishes that photographic evidence strengthens claims. Timestamped GPS-tagged photos provide verifiable documentation.",
  },
  "section_12.1": {
    section: "Section 12.1",
    title: "Claim Settlement Timeline",
    relevant_text:
      "Insurance Companies are mandated to settle claims within 21 days of receipt of the claim from the State Government / approved yield data. Delayed settlement attracts interest at 12% per annum.",
    how_it_supports:
      "The 21-day settlement mandate means delays by the insurance company are violations. Farmers can cite this in appeals.",
  },
  "section_13.1": {
    section: "Section 13.1",
    title: "Grievance Redressal",
    relevant_text:
      "A District Level Monitoring Committee (DLMC) under the chairmanship of the District Collector shall be the first level of grievance redressal. Farmers may approach the DLMC with complaints regarding enrollment, premium, claims, or any other issue related to the scheme.",
    how_it_supports:
      "Provides the appeal pathway — the DLMC is the designated body for resolving claim disputes.",
  },
  "section_13.3": {
    section: "Section 13.3",
    title: "State Level Grievance Redressal",
    relevant_text:
      "If the farmer is not satisfied with the DLMC decision, the matter may be escalated to the State Level Coordination Committee on Crop Insurance (SLCCCI) for resolution.",
    how_it_supports:
      "Establishes a second level of appeal if the district committee doesn't resolve the issue.",
  },
};

export function getGuidelinesForRejection(
  rejectionReason: string
): GuidelineCitation[] {
  const reason = rejectionReason.toLowerCase();
  const citations: GuidelineCitation[] = [];

  if (reason.includes("72") || reason.includes("time") || reason.includes("late") || reason.includes("window")) {
    citations.push(PMFBY_GUIDELINES["section_11.2"]);
  }
  if (reason.includes("aadhaar") || reason.includes("name") || reason.includes("mismatch") || reason.includes("bank")) {
    citations.push(PMFBY_GUIDELINES["section_8.4"]);
  }
  if (reason.includes("crop") || reason.includes("declaration")) {
    citations.push(PMFBY_GUIDELINES["section_9.1"]);
  }
  if (reason.includes("evidence") || reason.includes("photo") || reason.includes("document")) {
    citations.push(PMFBY_GUIDELINES["section_11.3"]);
  }
  if (reason.includes("delay") || reason.includes("settlement")) {
    citations.push(PMFBY_GUIDELINES["section_12.1"]);
  }

  // Always include grievance redressal path
  citations.push(PMFBY_GUIDELINES["section_13.1"]);

  return citations;
}
