import { getJwtSecretKey } from "@/libs/auth";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  if (body.username === "admin" && body.password === "admin") {
    const jwt = await new SignJWT({ username: "admin", role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("https://ylmgrbz.com")
      .setExpirationTime("2h")
      .sign(getJwtSecretKey());

    const response = NextResponse.json({
      success: true,
    });
    return response;
  }

  return NextResponse.json({
    success: false,
  });
}
