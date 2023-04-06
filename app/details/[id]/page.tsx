import CartButton from "@/components/CartButton";
import { db } from "@/lib/db";
import Image from "next/image";

type DetailsParams = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  const sheetMusic = await db.sheetMusic.findFirst({
    where: {
      id,
    },
  });
  return { sheetMusic };
}
export default async function Details({ params }: DetailsParams) {
  const { sheetMusic } = await getData(params.id);
  const musicId = sheetMusic?.id
  return (
    <section className="md:grid md:grid-cols-2 md:flex-none flex flex-col items-center gap-4 mt-12 md:mb-0 mb-12">
      <div id="left" className="flex justify-center">
        <Image src={sheetMusic?.coverArtUrl as string} alt={sheetMusic?.title as string}
        height={800}
        width={400}
        style={{border: "solid", borderColor: "black", borderWidth: "2px"}}
         />
      </div>
      <div id="right">
        <div id="title">
          <h1 className="text-4xl font-bold text-slate-100">{sheetMusic?.title}</h1>
          <hr className="w-[250px]" />
          <h2 className="text-2xl text-gray-300">Composed by Keegan Anglim</h2>
        </div>
        <div className="mt-8 mb-6 text-slate-100"># of parts: {sheetMusic?.noOfParts}</div>
        <div className="text-wrap sm:w-[400px] text-slate-100"><span className="text-xl font-bold">Description: </span>{sheetMusic?.description}</div>
        <div></div>
        <div className="text-3xl mt-12 text-slate-100">Price: ${sheetMusic?.cost}</div>
        <CartButton music={musicId} />
      </div>
    </section>
  );
}
