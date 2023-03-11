"use client"
import { signUp } from "@/lib/api"
import {useState} from "react"
import { useRouter } from "next/navigation"
export default function SignUpForm(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("signing up user...")
            await signUp({email, password})
            router.replace("/")
        } catch (error){
            console.error(error)
        }
        
    }

    return (
        <div className="text-center gap-4 mt-44 bg-amber-200 p-4 border border-black rounded-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h1 className="text-4xl">Sign Up</h1>
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