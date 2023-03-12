"use client"
import {useReducer, useState} from "react"
type CartButtonProps = {
    music?: string
}

type MusicDispatchArgs = {
    type: string,
    id: string,
  }

// TODO: use global state to make a bubble in the cart when something is added
export default function CartButton({music}: CartButtonProps){
    const [buttonClicked, setbuttonClicked] = useState(false)
    const [cart, dispatch] = useReducer(cartReducer, initialCart)

    function handleAddItem(cartItemId: MusicDispatchArgs) {
        dispatch({
          type: 'added',
          id: cartItemId
        })
      }
    
      function handleDeleteItem(cartItemId: MusicDispatchArgs) {
        dispatch({
          type: 'deleted',
          id: cartItemId,
        })
      }

    const handlebutton = () => {
        console.log("button clicked!")
        setbuttonClicked(true)
    }

    return(
        <button onClick={handlebutton} disabled={buttonClicked} className="mt-6 bg-amber-500 text-white rounded-xl px-3 py-2 text-2xl hover:bg-amber-300 transition-colors ease-in-out duration-700 disabled:bg-gray-400">{buttonClicked ? "Added to Cart!" : "Add to Cart"}</button>
    )
}

function cartReducer(cart: MusicDispatchArgs[], action: MusicDispatchArgs){
    switch (action.type){
      case 'added': {
        return [...cart,
          {
            id: action.id,
          }
        ]
      }
      case 'deleted': {
        return cart.filter(item => item.id !== action.id)
      }
      default:
        throw Error("Unknown action " + action.type)
    }
  }