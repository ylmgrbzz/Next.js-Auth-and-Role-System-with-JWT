import { verifyJwtToken } from "./libs/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = new URL(request.url);

  const { url, nextUrl, cookies } = request;

  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  console.log("token", token);
  console.log("hasVerifiedToken", hasVerifiedToken);

  if (!hasVerifiedToken) {
    return NextResponse.redirect(new URL("/login", url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
