import React from "react";
import type { Metadata } from "next";
import {
  Frame,
  FrameButton,
  FrameButtonsType,
  getFrameFlattened,
} from "frames.js";
import { getFrameData } from "@/firebase/methods";

type Props = {
  params: { id: string };
};

const BASE_URL = process.env.NEXT_PUBLIC_HOST;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const frameProductData = await getFrameData(id);
  console.log(frameProductData);

  if (!frameProductData) {
    return {
      title: `Shop Frame ${id}`,
      openGraph: {
        title: `Shop Frame #${id}`,
      },
      metadataBase: new URL(BASE_URL || ""),
    };
  }

  let buttons: FrameButtonsType = [];

  frameProductData.products.forEach((product) => {
    const button: FrameButton = {
      label: `${product.name} $${product.price}`,
      action: "link",
      target: product.permaLink,
    };
    // @ts-ignore
    buttons.push(button as FrameButton);
  });

  const frame: Frame = {
    version: "vNext",
    buttons: buttons,
    image: `${BASE_URL}/api/image/shop/${id}`,
    postUrl: `${BASE_URL}/api/shop/${id}`,
  };

  const fcMetadata: Record<string, string> = getFrameFlattened(frame);

  return {
    title: `${frameProductData.shopName} shop Frame`,
    openGraph: {
      title: `${frameProductData.shopName} shop Frame`,
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