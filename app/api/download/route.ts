import { statSync, createReadStream, read } from "fs"
import path from "path"




export async function POST(req: Request) {

    const body = await req.json()
    console.log(body)
    const filePath = path.join(__dirname, "/pdfs/", body, "/", body, ".zip")
    var stat = statSync(filePath)
    var file = createReadStream(filePath)

    return new Response("hi", {
        headers: {
            "Content-Type": "application/zip",
            "Content-Length": stat.size,
            "Content-Disposition": `attachent; filename=${body}.zip]`
        },
        status: 200,
        body: {
            
        }
    })
}