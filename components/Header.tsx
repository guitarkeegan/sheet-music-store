import logo from "@/assets/images/feel-the-awesome.jpg"
import Image from "next/image"

export default function Header(){
    return (
        <header className="flex justify-between items-center px-6 sm:px-36 bg-gray-500 text-white py-2">
            <div className="flex justify-center items-center">
            <Image alt="logo"
             src={logo}
             width={70}
             height={70}
             className="rounded-full" />
            <span className="ml-2 md:text-3xl font-bold" id="site-title">My Guitar Arrangments</span>
            </div>
            <div>Login</div>
        </header>
    )
}