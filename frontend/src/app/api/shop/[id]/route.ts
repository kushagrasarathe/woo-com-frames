import { getFrameData } from "@/firebase/methods";
import {
  Frame,
  getFrameHtml,
  getFrameMessage,
  validateFrameMessage,
} from "frames.js";
import { NextRequest } from "next/server";
const BASE_URL = process.env.NEXT_PUBLIC_HOST;

// Shop

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log(body);

    const buttonIndex = body.untrustedData.buttonIndex;
    console.log(buttonIndex);

    const frameProductData = await getFrameData(params.id);
    if (!frameProductData) {
      console.log("Frame product data missing");
      return new Response("Frame Product Data Missing", {
        status: 500,
      });
    }

    const product = frameProductData?.products[buttonIndex - 1];
    console.log(product);

    // const frameMessage = await getFrameMessage(body);
    // console.log(frameMessage);
    // TODO :  Need to check if the total entry is already 8 , if yes return an unsuccessful frame

    const frame: Frame = {
      version: "vNext",
      image: `${BASE_URL}/api/image/shop/${params.id}?productId=${product.id}`,
      buttons: [
        {
          label: `Product`,
          action: "link",
          target: `${product?.permaLink}`,
        },
        {
          label: `Buy`,
          action: "link",
          target: `${frameProductData.shopLink}/checkout/?add-to-cart=${product.id}`,
        },
      ],
      ogImage: `${BASE_URL}/api/image/shop/${params.id}?productId=${product.id}`,
      postUrl: `${BASE_URL}/api/shop/${params.id}`,
    };

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    // or Wrong / Invalid Submission frame

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    const imageUrlBase = `${process.env.NEXT_PUBLIC_HOST}`;

    const frame: Frame = {
      version: "vNext",
      image: `${imageUrlBase}/InvalidEntry.png`,
      ogImage: `${imageUrlBase}/InvalidEntry.png`,
      buttons: [
        {
          label: `Back`,
          action: "post",
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_HOST}`,
    };

    // Return the frame as HTML
    const html = getFrameHtml(frame);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
      status: 200,
    });
  }
}
