import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest) {
    
    return new Response("loggin out", {
        headers: {
            "Set-Cookie": serialize("sheetmusic", "", {
                maxAge: 0,
                path: "/"
            })
        }
    })

    
}