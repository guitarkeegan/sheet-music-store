"use client"
import {useState, useContext} from "react"
import { CartContext, CartDispatchContext } from "@/app/cart-provider"
type CartButtonProps = {
    music?: string
}
type DispatchType = (o: Object) => void;

// TODO: use global state to make a bubble in the cart when something is added
export default function CartButton({music}: CartButtonProps){
    const [buttonClicked, setbuttonClicked] = useState(false)
    const cart = useContext(CartContext)
    const dispatch: DispatchType = useContext(CartDispatchContext)

    const handlebutton = () => {
        console.log("button clicked!")
        setbuttonClicked(true)
        dispatch({
            type: "added",
            id: music
        })
        console.log(cart)
    }

    return(
        <button onClick={handlebutton} disabled={buttonClicked} className="mt-6 bg-amber-500 text-white rounded-xl px-3 py-2 text-2xl hover:bg-amber-300 transition-colors ease-in-out duration-700 disabled:bg-gray-400">{buttonClicked ? "Added to Cart!" : "Add to Cart"}</button>
    )
}