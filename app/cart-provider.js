"use client";

import { createContext, useReducer } from "react";

export const CartContext = createContext([]);
export const CartDispatchContext = createContext(null)

export function CartProvider({ children }) {
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function CartDispatchProvider({ children }) {
  return <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>;
}

const initialCart = []

const [cart, dispatch] = useReducer(cartReducer, initialCart)

function cartReducer(cart, action){
  switch (action.type){
    case "added": {
      return [...cart,
      {
        id: action.id
      }]
    }
    case "deleted": {
      return cart.filter(item => item.id !== action.id)
    }
    default:
      throw Error("action type not recognized ", action.type)
  }
}