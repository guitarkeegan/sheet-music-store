
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
  
  async function main() {
// TODO: Create seeds for 2 users, 2 sheetmusic    
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
