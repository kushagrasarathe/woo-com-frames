import { getFrameData, getProductData } from "@/firebase/methods";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

// Specific Round Results Frame Image ( def )
// This is the default frame Image for a Round result
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  console.log(productId);
  console.log(params.id);

  if (productId && params.id) {
    const frameId = params.id;
    const productData = await getProductData(frameId, productId);
    console.log(productData, productId);

    // render the data the way we want it to
    return new ImageResponse(
      (
        <div tw="flex items-start justify-center h-[476px] w-[910px]">
          <div tw="bg-violet-200  flex h-full w-full pl-4 pt-4">
            <div tw="flex w-full py-12 px-4 items-start justify-start p-8">
              <div tw="mt-2 flex bg-white backdrop-md py-6 shadow-md	 rounded-xl px-4">
                <div tw="flex mx-3 rounded-md shadow-lg">
                  <img
                    src={
                      productData?.image
                        ? productData.image
                        : "https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                    }
                    alt="prodcut image"
                    tw="h-60 w-60 rounded-md"
                  />
                </div>
              </div>
              <h2
                style={{
                  fontSize: "36px",
                  fontStyle: "normal",
                  fontWeight: 700,
                }}
                tw="flex flex-col mx-10 tracking-tight text-gray-900 text-left"
              >
                <span>{productData?.name}</span>
                <span tw="text-base font-normal max-w-sm mt-5">
                  {productData?.description}
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 700,
                  }}
                  tw="text-indigo-600 mt-5"
                >
                  Price: ${productData?.price}
                </span>
              </h2>
            </div>
          </div>
        </div>
      ),
      {
        width: 910,
        height: 476,
      }
    );
  } else if (params.id) {
    const frameId = params.id;
    const frameProductData = await getFrameData(frameId);

    console.log(frameProductData);

    // render the data the way we want it to

    // return new ImageResponse(
    //   (
    //     <div tw="flex flex-col items-center justify-center h-[476px] w-[910px]">
    //       <div tw="bg-violet-200  flex h-full w-full pl-4">
    //         <div tw="flex flex-col w-full py-12 px-4 items-center justify-center p-8">
    //           <h2
    //             style={{
    //               fontSize: "32px",
    //               fontStyle: "normal",
    //               fontWeight: 700,
    //             }}
    //             tw="flex flex-col tracking-tight text-gray-900 text-left"
    //           >
    //             <span>Woocom Frame</span>
    //             <span tw="text-indigo-600">Select Product to Shop</span>
    //           </h2>
    //           <div tw="mt-2 flex bg-white backdrop-md py-6 shadow-md	 rounded-xl px-4">
    //             {frameProductData?.products &&
    //               frameProductData.products.map((product, i) => {
    //                 return (
    //                   <div tw="flex mx-3 rounded-md shadow-lg" key={i}>
    //                     <img
    //                       src={
    //                         product.image
    //                           ? product.image
    //                           : "https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
    //                       }
    //                       alt="prodcut image"
    //                       tw="h-36 w-36 rounded-md"
    //                     />
    //                   </div>
    //                 );
    //               })}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    //   {
    //     width: 910,
    //     height: 476,
    //   }
    // );
    return new ImageResponse(
      (
        <div tw="flex flex-col items-center justify-center h-[476px] w-[910px]">
          <div tw="bg-violet-200  flex h-full w-full pl-4">
            <div tw="flex flex-col w-full py-12 px-4 items-center justify-center p-8">
              <div tw="flex items-center">
                {frameProductData?.products &&
                  frameProductData.products.map((product, i) => {
                    return (
                      <div tw="mt-2 flex bg-white backdrop-md py-6 shadow-md	 rounded-xl px-4 mx-4">
                        <div tw="flex mx-3 rounded-md shadow-lg">
                          <img
                            src={
                              product.image
                                ? product.image
                                : "https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                            }
                            alt="prodcut image"
                            tw="h-64 w-64 rounded-md"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 910,
        height: 476,
      }
    );
  } else {
    return new Response("ID missing", {
      status: 500,
    });
  }
}
