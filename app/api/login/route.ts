import { NextResponse, NextRequest } from "next/server";
import { loginSchema } from "@/app/zod/zod";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedBody = loginSchema.parse(body);
        if (validatedBody.password !== validatedBody.confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }
        return NextResponse.json({ message: "Authentication provider is not configured" }, { status: 501 });
    } catch {
        return NextResponse.json({ error: "Invalid login payload" }, { status: 400 });
    }
}