import { NextResponse } from "next/server";
import { getAllClaims } from "@/lib/dynamodb";

export async function GET() {
  try {
    const claims = await getAllClaims();
    return NextResponse.json({ claims });
  } catch (error) {
    console.error("Failed to fetch claims:", error);
    return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 });
  }
}
