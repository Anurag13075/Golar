import { BedrockRuntimeClient, ConverseCommand, Message } from "@aws-sdk/client-bedrock-runtime";

// Using us-east-1 specifically for Amazon Nova, as it guarantees availability
// and supports the us.amazon.nova-* cross-region inference profiles.
// This won't affect your other AWS services (like S3/Dynamo) which can stay in ap-south-1.
const client = new BedrockRuntimeClient({
  region: "ap-south-1",
});

/**
 * Invokes Amazon Nova Lite for text-based reasoning tasks
 * Uses the Converse API which is standard for Amazon Nova models
 */
export async function invokeNovaText(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const command = new ConverseCommand({
      modelId: process.env.BEDROCK_MODEL_ID_TEXT || "us.amazon.nova-lite-v1:0",
      messages: [
        {
          role: "user",
          content: [{ text: prompt }],
        },
      ],
      system: systemPrompt ? [{ text: systemPrompt }] : undefined,
      inferenceConfig: {
        maxTokens: 2000,
        temperature: 0.1, // Low temperature for consistent JSON/factual output
      },
    });

    const response = await client.send(command);
    return response.output?.message?.content?.[0]?.text || "";
  } catch (error: any) {
    console.error("Error invoking Amazon Nova Text:", error.name, error.message);
    if (error.name === "ValidationException") {
      console.error("This usually means the model is not available in the configured region (defaulting to us-east-1), or model access is not requested in the AWS console.");
    }
    throw error;
  }
}

/**
 * Invokes Amazon Nova Pro for multimodal vision tasks
 * Uses the Converse API format for images
 */
export async function invokeNovaVision(
  prompt: string,
  base64Image: string,
  mimeType: string,
  systemPrompt?: string
): Promise<string> {
  try {
    // Nova supports jpeg, png, webp, gif
    const format = mimeType.replace("image/", "") as "jpeg" | "png" | "webp" | "gif";
    
    // Ensure base64 string doesn't have the data URL prefix
      const cleanBase64 = base64Image.includes("base64,") 
      ? base64Image.split("base64,")[1] 
      : base64Image;

    const command = new ConverseCommand({
      modelId: process.env.BEDROCK_MODEL_ID_VISION || "us.amazon.nova-pro-v1:0",
      messages: [
        {
          role: "user",
          content: [
            {
              image: {
                format: format,
                source: { bytes: Buffer.from(cleanBase64, "base64") },
              },
            },
            { text: prompt },
          ],
        },
      ],
      system: systemPrompt ? [{ text: systemPrompt }] : undefined,
      inferenceConfig: {
        maxTokens: 2000,
        temperature: 0.1,
      },
    });

    const response = await client.send(command);
    return response.output?.message?.content?.[0]?.text || "";
  } catch (error: any) {
    console.error("Error invoking Amazon Nova Vision:", error.name, error.message);
    if (error.name === "ValidationException") {
      console.error("This usually means the model is not available in the configured region (defaulting to us-east-1), or model access is not requested in the AWS console.");
    }
    throw error;
  }
}
