import DownloadButton from "@/components/DownloadButton";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Image from "next/image"

const getData = async () => {
  // TODO: figure out type for cookies!!!
  const user = await getUserFromCookie(cookies());
  console.log("user: ", user);
  const music = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      sheetMusic: true,
      orders: true
    },
  });
  console.log("music: ", music);
  // this is good if you have multiple queries to return
  return { user, music };
};

export default async function Dashboard() {
  const { user, music } = await getData();
  return (
    <section className="flex flex-col">
      <div className="flex justify-center text-6xl text-slate-200">My Downloads</div>
      <div className="flex justify-center text-4xl text-slate-200">Welcome back {user && user.email}!</div>
      <section id="card-wrapper" className="grid sm:grid-cols-4 grid-cols-1 mt-12 px-2">
      {music ? (
        music.sheetMusic.map((chart, i) => (
          <div key={i} className="rounded-lg shadow-lg max-w-[280px] sm:py-0 py-12 text-slate-200">
          <Image alt="sheet music preview" src={chart.coverArtUrl as string} id="image"
          width={280}
          height={200}
          style={{height: "200px", width: "280px"}}
          className="bg-green-400 rounded-lg" />
          <div className="py-2 font-bold text-ellipsis overflow-hidden whitespace-nowrap"><h2>{chart.title}</h2></div>
          <div className="flex justify-between items-center px-2">
              <div><h3># of parts: {chart.noOfParts}</h3></div>
              <DownloadButton downloadUrl={chart.downloadUrl} title={chart.title} />
          </div>
          
      </div>
        ))
      ) : (
        <div>
          <h2>No orders yet!</h2>
        </div>
      )}
      </section>

      
    </section>
  )
}
