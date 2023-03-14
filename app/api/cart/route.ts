import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Id = {
    id: string
}

type Body = {
    orders: Id[]
}

export async function POST(request: Request) {

    const body: Body = await request.json()
    let searchArr;

    if (!body.orders){
        return NextResponse.json({error: "body of request empty"})
    }
    
    searchArr = body.orders.map(idArr=>idArr.id)

    const data = await db.sheetMusic.findMany({
        where: {
            id: { in: searchArr }
        }
    })

    return NextResponse.json(data)


}