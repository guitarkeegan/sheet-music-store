import DownloadButton from "@/components/DownloadButton";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

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
    <section>
      <div>dashboard</div>
      <div>{user && user.email}</div>
      {music ? (
        music.sheetMusic.map((chart, i) => (
          <div key={i}>
            <h1>{chart.title}</h1>
            <DownloadButton downloadUrl={chart.downloadUrl} title={chart.title} />
          </div>
        ))
      ) : (
        <div>
          <h2>No orders yet!</h2>
        </div>
      )}
      
    </section>
  )
}
