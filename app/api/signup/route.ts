import { NextResponse, NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, createJWT } from '@/lib/auth'
import { serialize } from "cookie"
import {headers} from "next/headers"
import { NextApiResponse, NextApiRequest } from 'next'

type Body = {
    email: string,
    password: string,
}

export async function POST(request: NextRequest) {
  let response = new NextResponse()
  const body = await request.json()

  try {
    // should return null if user does not exist
    const data = await db.user.findUnique({
      where: {
        email: body.email
      }
    })
    console.log("data is: ", data)
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

      console.log("Creating new JWT...")
      const jwt = await createJWT(newUser)
      /* set headers instead of cookie because it was including the cookiename in the token
      **/
      response.headers.set("Set-Cookie",
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    )
      
      console.log(response)
      // make sure that the fetch is not expecting json
      return response

    } else {
      return NextResponse.json({message: "problem creating new user"})
    }
  } catch (error) {
    console.error("catch on signup", error)
  }
}
//       return setHeader(
      //   "Set-Cookie",
      //   serialize(process.env.COOKIE_NAME as string, jwt, {
      //     httpOnly: true,
      //     path: "/",
      //     maxAge: 60 * 60 * 24 * 7,
      //   })
      // );
//       res.status(201);
//       res.end();
//     } else {
//       res.status(402);
//       res.end();
//     }
// } catch (error) {
//   console.error(error)
//   throw new Error("error on registration")
// }
