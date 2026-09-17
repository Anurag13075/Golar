import { NextResponse, NextRequest } from "next/server";
import { loginSchema } from "@/app/zod/zod";


async function  POST( request:NextRequest) {
    const body = await request.json();
    const validatedBody = loginSchema.parse(body);
    if(!validatedBody.email || validatedBody.password !== validatedBody.confirmPassword){
        return NextResponse.json({
            error:"Invalid email or password"
        }, {status:400});
    }
    return NextResponse.json({ message: "Login successful" });
}