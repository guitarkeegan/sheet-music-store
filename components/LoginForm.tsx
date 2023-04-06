"use client"
import { login } from "@/lib/api"
import {useState} from "react"
import { useRouter } from "next/navigation"
// import { useAuth } from "@/src/store"
export default function LoginForm(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const {loginState} = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();
        try {
            console.log("logging in user...")
            await login({email, password})
            // loginState()
            window.location.replace("/")
            // router.replace("/dashboard")
        } catch (error){
            console.error(error)
        }
        
    }

    return (
        <div className="text-center gap-4 mt-44 bg-amber-200 p-4 border border-black rounded-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-4xl">Login</h1>
                <input onChange={(e) => (
                    setEmail(e.target.value)
                )} className="rounded-lg p-1" type="email" required placeholder="email" />
                
                <input onChange={e => (
                    setPassword(e.target.value)
                )} className="rounded-lg p-1" type="password" placeholder="password" required />
                <button className="rounded-lg border-black border-2">Submit</button>
            </form>
        </div>
    )
}