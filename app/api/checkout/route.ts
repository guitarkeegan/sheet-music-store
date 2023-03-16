import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_TEST_API as string, {
  apiVersion: "2022-11-15",
});

type Id = {
  id: string;
};

type Body = {
  orders: Id[];
};

// if you type export defaut it will say method not allowed
export async function POST(request: Request) {
  const body: Body = await request.json();
  let searchArr;

  if (!body.orders) {
    return NextResponse.json({ error: "body of request empty" });
  }

  searchArr = body.orders.map((idArr) => idArr.id);

  const data = await db.sheetMusic.findMany({
    where: {
      id: { in: searchArr },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/dashboard",
    cancel_url: "http://localhost:3000/cancellation",
  });

  return NextResponse.json({url: session.url})
}
