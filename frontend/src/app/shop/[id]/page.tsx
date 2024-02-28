import React from "react";
import type { Metadata } from "next";
import { Frame, getFrameFlattened } from "frames.js";

type Props = {
  params: { id: string };
};

const BASE_URL = "";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  //   const frameData;
  //   if (!frameData) {
  //     return {
  //       title: `Shop Frame ${id}`,
  //       openGraph: {
  //         title: `Shop Frame #${id}`,
  //       },
  //       metadataBase: new URL(BASE_URL || ""),
  //     };
  //   }

  const frame: Frame = {
    version: "vNext",
    buttons: [
      {
        label: "Product 1",
        action: "link",
        target: BASE_URL,
      },
      {
        label: "Product 2",
        action: "link",
        target: BASE_URL,
      },
    ],
    image: `${BASE_URL}/api/image/shop/${id}`,
    postUrl: `${BASE_URL}/api/shop/${id}`,
  };

  const fcMetadata: Record<string, string> = getFrameFlattened(frame);

  return {
    title: `Shop Frame #${id}`,
    openGraph: {
      title: `Shop Frame #${id}`,
      images: [`${BASE_URL}/api/image/shop/${id}`],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL(BASE_URL || ""),
  };
}

export default function page() {
  return <div>page</div>;
}
