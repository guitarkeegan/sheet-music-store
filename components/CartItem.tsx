
import { useStore } from "@/src/store"
import {BsTrash} from "react-icons/bs"

type CartItemProps = {
  id: string,
  title: string,
  cost: number,
  cover?: string,
  remove: (musicId: string) => void,
}

export default function CartItem({id, cost, cover, title, remove}: CartItemProps) {

    return (
  <div className="bg-gray-400 p-4 text-white rounded-md shadow-black shadow-md mt-12 md:w-[600px]">
    <div className="flex justify-between items-center">
      <div className="text-2xl">Title: {title}</div>
      <div>{cover && cover}</div>
      <div>Price: {cost}</div>
    </div>
    <div className="text-2xl hover:text-red-600"><button className="" onClick={() => remove(id)}><BsTrash /></button></div>
  </div>
    )
}
