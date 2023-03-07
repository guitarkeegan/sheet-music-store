
type MusicCardProps = {
    title: string,
    cost: number,
    noOfParts: number,
    coverArt?: string,
}

export default function MusicCard({title, cost, noOfParts, coverArt}: MusicCardProps){
    return (
        <div className="rounded-lg shadow-sm max-w-[280px] sm:py-0 py-12">
            <div id="image" className="w-[280px] h-[200px] bg-green-400 rounded-lg"></div>
            <div className="py-2 font-bold text-ellipsis overflow-hidden whitespace-nowrap"><h2>{title}</h2></div>
            <div className="flex justify-between items-center px-2">
                <div><h3># of parts: {noOfParts}</h3></div>
                <div><h3>${cost}</h3></div>
            </div>
        </div>
    )
}