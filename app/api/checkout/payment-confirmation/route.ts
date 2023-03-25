import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { Buffer } from "node:buffer";
import { IncomingMessage } from "node:http";
import type {Stripe} from "stripe"

export async function POST(req: NextApiRequest, res: NextApiResponse){

    // const buffer = (req: NextApiRequest) => {
    //     return new Promise<Buffer>((resolve, reject) => {
    //       const chunks: Buffer[] = [];
      
    //       req.on('data', (chunk: Buffer) => {
    //         chunks.push(chunk);
    //       });
      
    //       req.on('end', () => {
    //         resolve(Buffer.concat(chunks));
    //       });
      
    //       req.on('error', reject);
    //     });
    //   };

    // const sig = req.headers['stripe-signature'];

    // let event: Stripe.Event;
    // const webhookSecret = process.env.WEBHOOK_SECRET_LOCAL as string
      
    // try {
    //     const body = await buffer(req);
    //     event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    // } catch (err) {
    //     // On error, log and return the error message
    //     console.error(`❌ Error message: ${err.message}`);
    //     return new Response("Error with webhook")
    //   }

          // Successfully constructed event
    // console.log('✅ Success:', event.id);
  
    // if (event.type === 'payment_intent.succeeded') {
    //     const stripeObject: Stripe.PaymentIntent = event.data
    //       .object as Stripe.PaymentIntent;
    //     console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    //   } else if (event.type === 'charge.succeeded') {
    //     const charge = event.data.object as Stripe.Charge;
    //     console.log(`💵 Charge id: ${charge.id}`);
    //   } else {
    //     console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    //   }
  
      // Return a response to acknowledge receipt of the event
      


      res.json({received: true});
      return new Response("worked!")
  };
export const config = {
    api: {
      bodyParser: false,
    },
  };