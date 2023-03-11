import { NextResponse } from 'next/server'
import { NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { hashPassword, createJWT } from '@/lib/auth'
import { serialize } from "cookie"
import {headers} from "next/headers"

type Body = {
    email: string,
    password: string,
}

export async function POST(request: Request, response: NextResponse) {
    const body: Body = await request.json()
    console.log(body)
  try {
    // should return null if user does not exist
    const data = await db.user.findUnique({
      where: {
        email: body.email
      }
    })
    console.log(data)
    if (data === null){
        console.log("no user found with that email...")
        console.log("creating new user...")
      const newUser = await db.user.create({
        data: {
          email: body.email,
          password: await hashPassword(body.password)
        }
      })
      console.log("New user created", newUser)

      const jwt = await createJWT(newUser);

      return new Response("Welcome", {
        status: 200,
        headers: {
            "Set-Cookie": serialize(process.env.COOKIE_NAME as string, jwt, {
                      httpOnly: true,
                      path: "/",
                      maxAge: 60 * 60 * 24 * 7,
                    })
        },

      })

    //   response.setHeader(
    //     "Set-Cookie",
    //     serialize(process.env.COOKIE_NAME as string, jwt, {
    //       httpOnly: true,
    //       path: "/",
    //       maxAge: 60 * 60 * 24 * 7,
    //     })
    //   );
    //   response.status(201);
    //   response.end();
    // } else {
    //   response.status(402);
    //   response.end();
    }
  } catch (error){
    console.error("error on find unique email", error)
    NextResponse.json({message: "Unable to create new user!"})
  }
}