import React from "react";
import AddStore from "./add-store";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-4 border-neutral-400 border-b">
      <h1>Woocom Frames</h1>
      <AddStore />
    </div>
  );
}
