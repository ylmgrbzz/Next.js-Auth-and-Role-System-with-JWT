import { verifyJwtToken } from "@/libs/auth";
import { NextResponse } from "next/server";

export const AUTH_PAGES = ["/login", "/register"];

export const isAuthPages = (url) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request) {
  const { pathname } = new URL(request.url);

  const { url, nextUrl, cookies } = request;

  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));

  console.log("token", token);
  console.log("hasVerifiedToken", hasVerifiedToken);

  const isAuthPageRequest = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequest) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      return response;
    }
    const response = NextResponse.redirect(new URL("/", url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    console.log("searchParams", searchParams);
    searchParams.set("next", nextUrl.pathname);

    return NextResponse.redirect(
      new URL(
        `
        /login?${searchParams}
        `,
        url
      )
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
