import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(
  req: NextRequest,
) {
  const body = await req.json()
  
    // need to verify and sanatize all user inputs
  const res = new NextResponse()
  console.log("searching for user...")
  try {
    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log("user: ", user)
    if (!user) {
      return res.statusText
    }

    const isUser = await comparePasswords(body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      res.headers.set(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      return res
    } else {
      return res
    }
  } catch (error) {
    console.error(error)
  }

}