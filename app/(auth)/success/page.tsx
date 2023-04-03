import Link from "next/link"

export default function Success(){
    return (
        <div>
            <h1>Successfully Placed Order!</h1>
            <Link href="/dashboard">Find your music in the dashboard</Link>
        </div>
    )
}