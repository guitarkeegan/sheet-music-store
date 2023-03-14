"use client"
import { stripe } from "@/lib/stripe";
import { getCart } from "@/lib/api";
import { useStore } from "@/src/store";
import type { Order } from "@/src/store";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";

export type CartDataProps = {
  id: string,
  title: string,
  description: string,
  cost: number,
  noOfParts: number,
  audioUrl?: string,
  coverArtUrl?: string
  downloadUrl?: string,
}

export default function Cart() {

  const { order, removeFromOrder } = useStore.getState()
  const [ cartData, setCartData ] = useState<CartDataProps[] | []>([])

  const getData = async () =>{
    if (order.length > 0){
      try {
        const response = await getCart({orders: order})
        setCartData(response)
      } catch (error){
        console.error(error)
      }
    }
  }

  useEffect(()=>{
    getData()
  }, [])




  return (
    <div>
      <div className="flex justify-center mt-12 font-bold">
        <h1 className="text-6xl">My Cart</h1>
      </div>
      <div id="cart-item-wrapper">
        { cartData ? cartData.map(item => (
          <CartItem id={item.id} cost={item.cost} title={item.title} cover={item.coverArtUrl}/>
        )) :
        <div>no data</div>
        }
        { cartData && <button>checkout</button>}
      </div>
    </div>
  );
}
