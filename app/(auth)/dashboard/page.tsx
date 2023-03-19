import { getUserFromCookie } from "@/lib/auth"
import { db } from "@/lib/db"
import { cookies } from "next/headers"

const getData = async () => {
    // TODO: figure out type for cookies!!!
    const user = await getUserFromCookie(cookies());
    console.log("user: ", user)
    const music = await db.user.findUnique({
      where: {
        id: user?.id
      },
      include: {
        sheetMusic: true
      }
    });
    console.log("music: ", music)
    // this is good if you have multiple queries to return
    return {user, music};
  }

export default async function Dashboard(){
    const {user, music} = await getData()
    return (
        <section>
            dashboard
            <div>
                {user && user.email}
                
            </div>
        </section>
    )
}