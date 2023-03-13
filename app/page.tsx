import Image from "next/image";
import { Inter } from "next/font/google";
import { db } from "@/lib/db";
import MusicCard from "@/components/MusicCard";

const inter = Inter({ subsets: ["latin"] });

const getData = async () => {
  const allSheetMusic = await db.sheetMusic.findMany();
  return {allSheetMusic};
};

export default async function Home() {
  const {allSheetMusic} = await getData();
  console.log(allSheetMusic)
  return (
    <main>
      <section>
        <div className="flex justify-center text-4xl mt-12 font-bold text-center">
          <h1>Select an Arrangement for Details</h1>
        </div>
      </section>
      <div className="flex sm:justify-evenly justify-center items-center sm:flex-row flex-col py-12"> 
        {
          allSheetMusic.map((score, i) => (
            <MusicCard
              key={i}
              id={score.id}
              title={score.title}
              cost={score.cost}
              noOfParts={score.noOfParts}
              coverArtUrl={score.coverArtUrl || ""}
              description={score.description}
              audioUrl={score.audioUrl || ""}
              downloadUrl={score.downloadUrl}
            />
          ))}
      </div>
    </main>
  );
}
