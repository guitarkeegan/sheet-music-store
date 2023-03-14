"use client"
import { stripe } from "@/lib/stripe";
import { getCart } from "@/lib/api";
import { useStore } from "@/src/store";
import type { Order } from "@/src/store";
import { useEffect } from "react";

export default function Cart() {

  const { order, removeFromOrder } = useStore.getState()
  
  const getData = async () =>{
    try {
      const response = await getCart({orders: order})
      console.log(response)
    } catch (error){
      console.error(error)
    }
  }

  useEffect(()=>{
    getData().then(data=>console.log(data)).catch(error=>error && console.error(error))
  }, [])




  return (
    <div>
      <div className="flex justify-center mt-12 font-bold">
        <h1 className="text-6xl">My Cart</h1>
      </div>
      <div id="cart-item-wrapper">

      </div>
    </div>
  );
}
