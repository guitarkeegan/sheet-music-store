import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let response = NextResponse.next()
    return response.cookies.delete('sheetmusic')
}