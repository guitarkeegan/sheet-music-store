"use client";
import Link from "next/link";
import { ImCart } from "react-icons/im";
import { useStore } from "@/src/store";

export default function CartIcon() {
  const { order } = useStore();
  return (
    <div>
      <Link className="hover:opacity-50" href={"/cart"}>
        <ImCart />
        <div className="flex justify-center items-center w-6 absolute rounded-full bg-red-600 text-white -mt-2">
          {order.length}
        </div>
      </Link>
    </div>
  );
}
