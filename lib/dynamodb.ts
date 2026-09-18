import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { Claim, FarmerPolicy } from "@/lib/types";
import { getTestPolicy, getTestClaim, getAllTestClaims, saveTestClaim, isTestMode } from "@/lib/test-mode";

const client = new DynamoDBClient({
  region: process.env.MY_AWS_REGION || process.env.AWS_REGION,
});

const docClient = DynamoDBDocumentClient.from(client);

const CLAIMS_TABLE = process.env.DYNAMODB_TABLE_CLAIMS || "fasal-rakshak-claims-farmer";
const POLICIES_TABLE = process.env.DYNAMODB_TABLE_POLICIES || "fasal-rakshak-policies-farmer";

export async function saveClaimToDynamo(claim: Claim): Promise<void> {
  if (saveTestClaimIfEnabled(claim)) return;
  await docClient.send(new PutCommand({
    TableName: CLAIMS_TABLE,
    Item: claim
  }));
}

export async function getClaimFromDynamo(claimId: string): Promise<Claim | undefined> {
  if (isTestMode()) return getTestClaim(claimId);
  const testClaim = getTestClaim(claimId);
  if (testClaim) return testClaim;
  const result = await docClient.send(new GetCommand({
    TableName: CLAIMS_TABLE,
    Key: { id: claimId }
  }));
  return result.Item as Claim | undefined;
}

export async function getAllClaims(): Promise<Claim[]> {
  if (isTestMode()) return getAllTestClaims();
  const testClaims = getAllTestClaims();
  if (testClaims.length > 0) return testClaims;
  const result = await docClient.send(new ScanCommand({
    TableName: CLAIMS_TABLE
  }));
  return (result.Items || []) as Claim[];
}

export async function getPolicy(policyNumber: string): Promise<FarmerPolicy> {
  const testPolicy = getTestPolicy(policyNumber);
  if (testPolicy) return testPolicy;
  const result = await docClient.send(new GetCommand({
    TableName: POLICIES_TABLE,
    Key: { policy_number: policyNumber },
  }));
  if (!result.Item) {
    throw new Error(`Policy ${policyNumber} was not found`);
  }
  return result.Item as FarmerPolicy;
}

function saveTestClaimIfEnabled(claim: Claim): boolean {
  if (process.env.ENABLE_TEST_MODE === "true" && process.env.NODE_ENV !== "production") {
    saveTestClaim(claim);
    return true;
  }
  return false;
}
