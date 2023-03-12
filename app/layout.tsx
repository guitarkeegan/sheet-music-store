"use client"
import Header from '@/components/Header'
import './globals.css'
import { CartContext, CartDispatchContext } from '@/context/CartContext'
import {createContext} from 'react'

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cart = createContext(CartContext)
  const dispatch = createContext(CartDispatchContext)

  return (
    <html lang="en">
      <body>
        <CartDispatchContext.Provider value={dispatch}>
        <CartContext.Provider value={cart}>
        <Header />
        {children}
        </CartContext.Provider>
        </CartDispatchContext.Provider>
        </body>
    </html>
  )
}

