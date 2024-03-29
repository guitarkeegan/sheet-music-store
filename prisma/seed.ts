import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { ORDER_STATUS } from "@prisma/client";



async function main() {

  console.log("creating user...");
  const user = await db.user.upsert({
    where:{email: "user1@email.com"},
    update: {},
    create: {
      email: "user1@email.com",
      password: await hashPassword("password123"),
      sheetMusic: {
        create: [
          {
            title: "Tired Waltz",
            noOfParts: 4,
            description:
              "Tired waltz is mostly writen in 3/4 as you might expect, but the A and C sections also contain a few measure of 4/4. The odd phrasing follows the melody however, and shouldn't be too difficult to the the hang of. It has a 'blowing bridge' that should be friendly for beginning improvisors, due to the static quality of the harmony at the section.",
            downloadUrl:
              "https://1drv.ms/u/s!AgSX-g2vyCGnhZdiomdm1lCTnGYJKA?e=HJ7syX",
            cost: 39.99,
            coverArtUrl: "/images/tired_waltz_cover.png"
          },
          {
            title: "Something You Wouldn't Say Out Loud",
            noOfParts: 4,
            description:
              "Something You Wouldn't Say Out Loud is an advanced arrangment that incorperates angular melodies, disonnant harmonies, and odd time signatures. While the melodies can be challenging at first, they are fun to play once they have been worked on by the individual members. The chord progression at the improvisation section is contains interesting non-functional harmonies, along with a quirky texture between the bass and ostinato part. Challenging, but a lot of fun!",
            downloadUrl:
              "https://1drv.ms/u/s!AgSX-g2vyCGnhZdgfJBONH_XBxOVaA?e=aQd9K8",
            cost: 39.99,
            coverArtUrl: "/images/SYWSOL_cover.png"
          },
        ]
      }
    }
  });

  console.log("user created: ", user);
  console.log("");

  

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
