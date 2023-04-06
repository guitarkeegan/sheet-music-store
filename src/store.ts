import { create } from "zustand";

export type Order = {
    id: string
}

type CartState = {
    order: Order[];
    addToOrder: (musicId: string) => void;
    removeFromOrder: (musicId: string) => void;
}

// type AuthState = {
//     loggedIn: boolean;
//     loginState: () => void;
//     logoutState: () => void;
// }

// export const useAuth = create<AuthState>((set) => ({
//     loggedIn: false,
//     loginState: () => {
//         set((state) => ({
//             loggedIn: true
//         }))
//     },
//     logoutState: () => {
//         set((state) => ({
//             loggedIn: false
//         }))
//     }
// }))

export const useStore = create<CartState>((set) => ({
    order: [],
    addToOrder: (musicId: string) => {
        set((state) => ({
            order: [
                ...state.order,
                {
                    id: musicId
                } as Order
            ]
        }))
    },
    removeFromOrder: (musicId: string) => {
        set((state) => ({
            order: state.order.filter(ord => ord.id !== musicId)
        }))
    }
}))
