import type { Claim, FarmerPolicy } from "@/lib/types";

export const TEST_POLICY_NUMBER = "TEST-POLICY-001";

export const TEST_POLICY: FarmerPolicy = {
  policy_number: TEST_POLICY_NUMBER,
  farmer_name: "Test Farmer",
  farmer_name_bank: "Test Farmer",
  aadhaar_last4: "0000",
  crop: "Wheat",
  crop_hi: "गेहूं",
  area_hectares: 2,
  area_survey_number: "TEST-SURVEY-001",
  state: "Rajasthan",
  district: "Jaipur",
  block: "Test Block",
  village: "Test Village",
  season: "rabi",
  coverage_start: "2020-01-01",
  coverage_end: "2030-12-31",
  sum_insured: 100000,
  insurance_company: "Test Insurance Company",
  bank_name: "Test Bank",
  bank_account: "TEST-ACCOUNT",
  bank_ifsc: "TEST0000001",
};

const testClaims = new Map<string, Claim>();

export function isTestMode(): boolean {
  return process.env.ENABLE_TEST_MODE === "true" && process.env.NODE_ENV !== "production";
}

export function getTestPolicy(policyNumber: string): FarmerPolicy | undefined {
  if (policyNumber === TEST_POLICY_NUMBER) return TEST_POLICY;
  return isTestMode() ? TEST_POLICY : undefined;
}

export function saveTestClaim(claim: Claim): void {
  if (!isTestMode()) throw new Error("Test mode is disabled");
  testClaims.set(claim.id, claim);
}

export function getTestClaim(claimId: string): Claim | undefined {
  return isTestMode() ? testClaims.get(claimId) : undefined;
}

export function getAllTestClaims(): Claim[] {
  return isTestMode() ? Array.from(testClaims.values()) : [];
}
