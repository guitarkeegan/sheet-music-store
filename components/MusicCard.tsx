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
        <div className="rounded-lg shadow-sm max-w-[280px] sm:py-0 py-12">
            <div id="image" className="w-[280px] h-[200px] bg-green-400 rounded-lg"></div>
            <div className="py-2 font-bold text-ellipsis overflow-hidden whitespace-nowrap"><h2>{props.title}</h2></div>
            <div className="flex justify-between items-center px-2">
                <div><h3># of parts: {props.noOfParts}</h3></div>
                <div><h3>${props.cost}</h3></div>
            </div>
        </div>
        </Link>
    )
}