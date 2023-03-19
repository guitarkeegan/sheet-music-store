import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

async function main() {
  
  console.log("creating users...");
  const users = await db.user.createMany({
    data: [
      {
        email: "user1@email.com",
        password: await hashPassword("password123"),
      },
      {
        email: "user2@email.com",
        password: await hashPassword("password123"),
      },
    ],
  });

  console.log("users created: ", users);
  console.log("");
  console.log("creating sheet music...");
  const sheetmusic = await db.sheetMusic.createMany({
    data: [
      {
        title: "Tired Waltz",
        noOfParts: 4,
        description:
          "Tired waltz is mostly writen in 3/4 as you might expect, but the A and C sections also contain a few measure of 4/4. The odd phrasing follows the melody however, and shouldn't be too difficult to the the hang of. It has a 'blowing bridge' that should be friendly for beginning improvisors, due to the static quality of the harmony at the section.",
        downloadUrl:
          "@/pdfs/tired-waltz/tired-waltz.zip",
        cost: 39.99,
        coverArtUrl: "@/pdfs/tired-waltz/SYWSOL_cover.png"
      },
      {
        title: "Something You Wouldn't Say Out Loud",
        noOfParts: 4,
        description:
          "Something You Wouldn't Say Out Loud is an advanced arrangment that incorperates angular melodies, disonnant harmonies, and odd time signatures. While the melodies can be challenging at first, they are fun to play once they have been worked on by the individual members. The chord progression at the improvisation section is contains interesting non-functional harmonies, along with a quirky texture between the bass and ostinato part. Challenging, but a lot of fun!",
        downloadUrl:
          "@/pdfs/SYWSOL/SYWSOL.zip",
        cost: 39.99,
        coverArtUrl: "@/pdfs/SYWSOL/SYWSOL_cover.png"
      },
    ],
  });
  console.log("sheet music created: ", sheetmusic)
  console.log("creating order for user 1...")
  const tiredWaltz = await db.sheetMusic.findFirst({
    where: {
      title: "Tired Waltz"
    }
  })
  const user1 = await db.user.findUnique({
    where: {
      email: "user1@email.com"
    }
  })
  // TODO: create order
  // const order = db.order.create({
    
  // })

}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
