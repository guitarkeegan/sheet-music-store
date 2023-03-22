
import logo from "@/assets/images/feel-the-awesome.jpg"
import Image from "next/image"

import Link from "next/link"
import CartIcon from "./CartIcon"

export default function Header(){
    return (
        <header className="flex justify-between items-center px-6 sm:px-36 bg-slate-300 text-black py-2">
            <Link href="/">
            <div className="flex justify-center items-center hover:text-[#F7F83C] transition-colors ease-in-out duration-1000">
                
            <Image alt="logo"
             src={logo}
             width={70}
             height={70}
             className="rounded-full" />
            <span className="ml-2 md:text-3xl font-bold" id="site-title">My Guitar Arrangments</span>
            </div>
            </Link>
            <div className="flex gap-3 text-2xl items-center">
                <Link className="hover:opacity-50" href={"/signup"}>Signup</Link>
                <Link className="hover:opacity-50" href={"/login"}>Login</Link>
                <CartIcon />
                </div>
        </header>
    )
}