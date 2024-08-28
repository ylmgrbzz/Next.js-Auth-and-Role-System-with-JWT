export async function middleware(request) {
  const { pathname } = new URL(request.url);
  console.log(pathname);

  const { url, nextUrl, cookies } = request;

  const { value: token } = cookies.get("token") ?? { value: null };

  console.log(token);

  const hasVerifiedToken = token && verifyJwtToken(token);

  console.log(hasVerifiedToken);
}

export const config = {
  matcher: ["/login", "/register"],
};
