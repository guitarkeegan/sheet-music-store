"use client"
import { useStore } from "@/src/store"

type CartItemProps = {
  id: string,
  title: string,
  cost: number,
  cover: string
}

export default function CartItem({id, cost, cover, title}: CartItemProps) {

    return (
  <div>
    <div className="flex">
      <div>{title}</div>
      <div>{cover && cover}</div>
      <div>{cost}</div>
    </div>
    <div></div>
  </div>
    )
}
