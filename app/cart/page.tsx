"use client"
import { stripe } from "@/lib/stripe";
import { checkoutCart, getCart } from "@/lib/api";
import { useStore } from "@/src/store";
import type { Order } from "@/src/store";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { useRouter } from "next/navigation";

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

  const router = useRouter()

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

  const handleCheckout = async () => {
    console.log("sending checkout cart...")
    const response = await checkoutCart({orders: order})
    console.log(response)
    router.replace(response.url)
  }

  const remove = (musicId: string) => {
    removeFromOrder(musicId)
    setCartData(prev => prev.filter(prev => prev.id !== musicId))
  }

  useEffect(()=>{
    getData()
  }, )

  return (
    <div>
      <div className="flex justify-center mt-12 font-bold">
        <h1 className="text-6xl">My Cart</h1>
      </div>
      <div id="cart-item-wrapper" className="flex flex-col items-center">
        { cartData ? cartData.map((item, i) => (
          <CartItem key={i} id={item.id} cost={item.cost} title={item.title} remove={remove}/>
        )) :
        <div>no data</div>
        }
        { cartData && <button onClick={handleCheckout} className="mt-6 bg-amber-500 text-white rounded-xl px-3 py-2 text-2xl hover:bg-amber-300 transition-colors ease-in-out duration-700 disabled:bg-gray-400">checkout</button>}
      </div>
    </div>
  );
}
