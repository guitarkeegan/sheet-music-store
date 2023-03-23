import { stripe } from "@/lib/stripe"
import { Buffer } from "node:buffer"
// import Cors from "micro-cors"

export async function POST(req: Request){

    const payload = await req.json()
    const buf = Buffer.from(payload)
    
    const sig = req.headers.get('stripe-signature') as string
    console.log("sig: ", sig)

    let event;

    const endpointSecret = process.env.WEBHOOK_SECRET_LOCAL as string

    try {
        console.log("constructing event...")
        event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret)
    } catch (error) {
        console.error(error)
        return new Response(`Webhook error: ${error}`, {
            status: 400,
        })
    }
    
    return new Response("payment confirmation route received", {
        status: 200,
    })
}