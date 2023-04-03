import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import Stripe from "stripe";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { ORDER_STATUS } from "@prisma/client";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

const stripe = new Stripe(process.env.STRIPE_TEST_API as string, {
  apiVersion: "2022-11-15",
});

type Id = {
  id: string;
};

type Body = {
  orders: Id[];
};

type DbOrderParams = {
  totalCost: number,
  sheetMusicId: string[],
  customerId?: string,
  status: ORDER_STATUS,
}

// if you type export defaut it will say method not allowed
export async function POST(request: NextRequest) {

  // TODO: check if logged in

  const user = await getUserFromCookie(cookies() as RequestCookies)
  
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

  const orderItems = data.map(item => (
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title
        },
        unit_amount: Math.floor(item.cost * 100)
      },
      quantity: 1
    }
    ))


  // create object to update order document
  const dbOrder: DbOrderParams = {
    totalCost: 0,
    sheetMusicId: [],
    customerId: user?.id,
    status: ORDER_STATUS.RECEIVED
  }
  
  for (let music of data){
    dbOrder.totalCost += music.cost
    dbOrder.sheetMusicId.push(music.id)
  }
      // create order
  const newOrder = await db.order.create({
    data: {
      totalPrice: dbOrder.totalCost as number,
      sheetMusicId: dbOrder.sheetMusicId as string[],
      customerId: dbOrder.customerId as string,
      status: ORDER_STATUS.RECEIVED // use this to determine what is displayed in user dashboard
    }
  })
  console.log("----------new order created---------")
  console.log(newOrder)
  console.log("getting user from database...")
  const dbUser = await db.user.findFirst({
    where: {
      id: user?.id
    }
  })
  if (user){
    user.sheetMusicId.push(...dbOrder.sheetMusicId)

    const updatedUser = await db.user.update({
      where: {
        id: dbUser?.id
      },
      data: {
        sheetMusicId: user.sheetMusicId
      }
    })
    console.log("updated user")
    console.log(updatedUser)
  }

  

  const session = await stripe.checkout.sessions.create({
    line_items: orderItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancellation",
  });

  return NextResponse.json({url: session.url})
}
