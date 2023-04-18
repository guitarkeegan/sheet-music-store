import Image from "next/image"
import Link from "next/link"
type MusicCardProps = {
    id: string,
    title: string,
    cost: number,
    noOfParts: number,
    coverArtUrl?: string,
    description: string,
    audioUrl: string,
    downloadUrl: string,
}

export default function MusicCard(props: MusicCardProps){
    return (
        <Link href={`/details/${props.id}`}>
        <div className="lg:hover:scale-110 ease-out duration-500 rounded-lg shadow-lg max-w-[280px] sm:py-0 py-12">
            <Image alt="sheet music preview" src={props.coverArtUrl as string} id="image"
            width={280}
            height={200}
            style={{height: "200px", width: "280px"}}
            className="bg-green-400 rounded-lg" />
            <div className="py-2 font-bold text-ellipsis overflow-hidden whitespace-nowrap"><h2>{props.title}</h2></div>
            <div className="flex justify-between items-center px-2">
                <div><h3># of parts: {props.noOfParts}</h3></div>
                <div><h3>${props.cost}</h3></div>
            </div>
        </div>
        </Link>
    )
}