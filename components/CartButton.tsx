"use client"
import {useState, useContext} from "react"
import { WordContext } from "@/app/word-provider"
type CartButtonProps = {
    music?: string
}

// TODO: use global state to make a bubble in the cart when something is added
export default function CartButton({music}: CartButtonProps){
    const [buttonClicked, setbuttonClicked] = useState(false)
    const word = useContext(WordContext)

    const handlebutton = () => {
        console.log("button clicked!")
        setbuttonClicked(true)
        console.log(word)
    }

    return(
        <button onClick={handlebutton} disabled={buttonClicked} className="mt-6 bg-amber-500 text-white rounded-xl px-3 py-2 text-2xl hover:bg-amber-300 transition-colors ease-in-out duration-700 disabled:bg-gray-400">{buttonClicked ? "Added to Cart!" : "Add to Cart"}</button>
    )
}