import CartButton from "@/components/CartButton";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

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
    <section className="grid grid-cols-2 gap-4 mt-12">
      <div id="left"></div>
      <div id="right">
        <div id="title">
          <h1 className="text-4xl font-bold">{sheetMusic?.title}</h1>
          <hr className="w-[250px]" />
          <h2 className="text-2xl text-gray-400">Composed by Keegan Anglim</h2>
        </div>
        <div className="mt-12 mb-6"># of parts: {sheetMusic?.noOfParts}</div>
        <div className="text-wrap sm:w-[400px]"><span className="text-xl font-bold">Description: </span>{sheetMusic?.description}</div>
        <div></div>
        <div className="text-3xl mt-12 ">Price: ${sheetMusic?.cost}</div>
        <CartButton music={musicId} />
      </div>
    </section>
  );
}
