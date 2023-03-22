import { statSync, createReadStream, read } from "fs"
import path from "path"




export async function POST(req: Request) {

    const body = await req.json()
    console.log(body)
    const filePath = path.join(__dirname, "/pdfs/", body, "/", body, ".zip")
    let stat = statSync(filePath)

    return new Response(stat, {
        headers: {
            "Content-Type": "application/zip",
            "Content-Length": stat.size,
            "Content-Disposition": `attachent; filename=${body}.zip]`
        },
        status: 200,
    })
}