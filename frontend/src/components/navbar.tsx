import React from "react";
import AddStore from "./add-store";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center px-20 justify-between py-4 border-neutral-400 border-b">
      <Link href={"/"} className=" text-xl font-semibold">
        Woocom Frames
      </Link>
      {/* <AddStore /> */}
    </div>
  );
}
