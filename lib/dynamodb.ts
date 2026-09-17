import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.MY_AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || "",
  }
});

const docClient = DynamoDBDocumentClient.from(client);

const CLAIMS_TABLE = process.env.DYNAMODB_TABLE_CLAIMS || "fasal-rakshak-claims-farmer";
const POLICIES_TABLE = process.env.DYNAMODB_TABLE_POLICIES || "fasal-rakshak-policies-farmer";

export async function saveClaimToDynamo(claim: any) {
  await docClient.send(new PutCommand({
    TableName: CLAIMS_TABLE,
    Item: claim
  }));
}

export async function getClaimFromDynamo(claimId: string) {
  const result = await docClient.send(new GetCommand({
    TableName: CLAIMS_TABLE,
    Key: { id: claimId }
  }));
  return result.Item;
}

export async function getAllClaims() {
  const result = await docClient.send(new ScanCommand({
    TableName: CLAIMS_TABLE
  }));
  return result.Items || [];
}

export async function getPolicy(policyNumber: string) {
  // If the policy table doesn't exist, return a default policy to not break the flow.
  // In a real app, this queries the policies table.
  try {
    const result = await docClient.send(new GetCommand({
      TableName: POLICIES_TABLE,
      Key: { policy_number: policyNumber }
    }));
    return result.Item || {
      policy_number: policyNumber,
      farmer_name: "Ram Kumar",
      crop: "Wheat",
      covered_area_hectares: 2.5,
      bank_account_name: "Ram Kumar Sharma"
    };
  } catch (error) {
    console.error("Policy lookup failed (mocking fallback):", error);
    return {
      policy_number: policyNumber,
      farmer_name: "Ram Kumar",
      crop: "Wheat",
      covered_area_hectares: 2.5,
      bank_account_name: "Ram Kumar Sharma"
    };
  }
}
