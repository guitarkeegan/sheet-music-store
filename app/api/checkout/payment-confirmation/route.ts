import { stripe } from "@/lib/stripe"
import getRawBody from 'raw-body';
import { NextApiRequest } from "next";
import { IncomingMessage } from "http";

export async function POST(req: NextApiRequest){
    
    console.log("getting raw body...")
    const body = getRawBody(req)
    console.log("getting headers")
    const sig = req.headers["stripe-signature"] as string | string[]
    console.log("sig: ", sig)

    let event;
    const endpointSecret = process.env.WEBHOOK_SECRET_LOCAL as string
    console.log("got endpoint secret", endpointSecret)

    try {
        console.log("constructing event...")
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
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

export const config = {
    api: {
      bodyParser: false,
    },
  };