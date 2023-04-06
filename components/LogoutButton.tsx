"use client"
import { logout } from "@/lib/api"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/src/store"

export default function LogoutButton() {

    // const { logoutState } = useAuth()
    const router = useRouter()

    const handleLogout = async function() {
        try{
            await logout()
            // logoutState()
            window.location.replace("/")
            // router.replace("/")
        } catch (error){
            console.error("error on logout!", error)
        }

    }

    return (
        <button onClick={handleLogout} className="hover:opacity-50">Logout</button>
    )
    
}