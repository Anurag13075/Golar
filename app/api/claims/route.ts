import { NextResponse } from "next/server";
import { saveClaimToDynamo, getAllClaims } from "@/lib/dynamodb";

export async function GET() {
  try {
    const claims = await getAllClaims();
    return NextResponse.json({ claims });
  } catch (error) {
    console.error("Failed to fetch claims:", error);
    return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { claim } = await req.json();
    await saveClaimToDynamo(claim);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save claim:", error);
    return NextResponse.json({ error: "Failed to save claim" }, { status: 500 });
  }
}
