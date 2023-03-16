/* need to be explicit with middleware otherwise it will protect calls to everything */
// many npm packages are not supported in edge runtime
// verify that the host for the side supports edge runtime with next js
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};
// similar to handler
export default async function middleware(req: NextRequest, res:NextResponse) {
    // these routes are allowed to all
    // the /_next is req because of the build?
  const { pathname } = req.nextUrl;
  console.log(pathname)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/details") ||
    pathname.startsWith("/login") ||
    // any public file such as images is ok
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

  if (!jwt) {
    // pathername is where the user was trying to go
    // if no jwt, they are taken to /sign-in
    // changed the request and redirected
    req.nextUrl.pathname = "/signin";
    // must be req.nextUrl
    return NextResponse.redirect(req.nextUrl);
  }
  // can't run prisma in middleware
  // can't look up the user
  // using the one we created here
  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}