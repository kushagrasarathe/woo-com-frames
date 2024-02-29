import { getFrameData, getProductData } from "@/firebase/methods";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

function Frame() {
  return (
    <div tw="flex relative flex h-[476px] w-[910px] flex-col items-center justify-center border bg-[#121312] p-4">
      <div tw="flex absolute top-0 left-0 w-[640px]">
        <svg
          width="640"
          height="280"
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1920" height="1080" fill="#121312" />
          <path
            d="M809,20.999999999999815C833.043473349111,81.95237393459553,767.1027008490355,164.06087419638797,703.1590932319507,221.69236147559968C639.2154856148659,279.3238487548114,495.90441220594755,299.5683442857035,425.33835429749087,366.78892367527015C354.7722963890342,434.0095030648368,360.3851960725824,602.3762696156418,279.7627457812106,625.0158378129995C199.14029548983876,647.6554060103572,10.824071217347452,496.0424636885278,-58.396347450739995,502.62633285941604C-127.61676611882744,509.2102020303043,-53.332033172235626,675.0669658252517,-135.55976622731404,664.519052838329C-217.78749928239245,653.9711398514063,-452.4209233940371,521.6030690587146,-551.7627457812105,439.3388549378798C-651.1045681683838,357.0746408170449,-709.8027080888302,256.8683581583146,-731.6107005503542,170.9337681133198C-753.4186930118782,84.99917806832498,-709.2520263452116,9.746651066682944,-682.6107005503543,-76.26868533208905C-655.969374755497,-162.28402173086104,-624.0311958729363,-264.9436547460209,-571.7627457812107,-345.1582502793122C-519.494295689485,-425.3728458126035,-457.72773305507866,-498.43406332402117,-369.00000000000034,-557.5562585318366C-280.272266944922,-616.6784537396521,-127.29158072435274,-691.8491602703616,-39.39634745074068,-699.891421526205C48.49888582287139,-707.9336827820484,66.16401593835803,-644.0527678836073,158.37139964167204,-605.8098260668975C250.57878334498605,-567.5668842501876,447.0934791865413,-547.398427948433,513.8479547691434,-470.43377062594584C580.6024303517455,-393.4691133034587,509.70624559880855,-225.92751056963218,558.8982531372847,-144.02188213197456C608.0902606757608,-62.11625369431695,784.956526650889,-39.95237393459589,809,20.999999999999815C833.043473349111,81.95237393459553,767.1027008490355,164.06087419638797,703.1590932319507,221.69236147559968"
            fill="#8465cb"
          />
        </svg>
      </div>
      <div tw="flex absolute right-0 bottom-0 w-[800px]">
        <svg
          width="800"
          height="280"
          viewBox="0 0 1920 1080"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1920" height="1080" fill="#121312" />
          <path
            d="M2521.457627281888,1124.9999999999998C2474.6624772071896,1215.058338824394,2366.4618507550204,1313.3260457888425,2330.3881927837597,1407.0524823068502C2294.314534812499,1500.7789188248578,2336.302323895761,1619.9853016222933,2305.015679454323,1687.3586191080458C2273.729035012885,1754.7319365937983,2210.9598569452314,1780.2035868183384,2142.668326135131,1811.292387221365C2074.3767953250303,1842.3811876243917,1989.7112156162411,1931.7119197497223,1895.2664945937192,1873.891421526205C1800.8217735711974,1816.0709233026878,1644.3659207442286,1522.5448115980696,1576.0000000000002,1464.3693978802612C1507.634079255772,1406.1939841624528,1492.0511087968048,1563.154597692605,1485.0709701283492,1524.8389392193549C1478.0908314598937,1486.5232807461048,1535.8802693080388,1328.6042315962059,1534.1191679892665,1234.4754470407602C1532.3580666704943,1140.3466624853145,1509.4846811774623,1056.9519629300332,1474.5043622157161,960.0662318866807C1439.52404325397,863.1805008433282,1273.9796777174404,708.2300310343923,1324.2372542187893,653.1610607806452C1374.4948307201382,598.0920905268982,1684.3220881687316,661.0069892044597,1776.0498212238099,629.6524103641985C1867.7775542788881,598.2978315239374,1814.837374985702,491.3098489548354,1874.6036525492593,465.03358773907826C1934.3699301128167,438.7573265233211,2043.2734362351734,424.28184335128907,2134.647486605154,471.9948430696559C2226.0215369751345,519.7078427880227,2343.429353664677,685.5269850008077,2422.847954769143,751.3115860492792C2502.2665558736094,817.0961870977507,2594.7241478131596,804.4210470353644,2611.1590932319505,866.7024493604845C2627.5940386507414,928.9838516856046,2568.2527773565866,1034.9416611756055,2521.457627281888,1124.9999999999998C2474.6624772071896,1215.058338824394,2366.4618507550204,1313.3260457888425,2330.3881927837597,1407.0524823068502"
            fill="#8465cb"
          />
        </svg>
      </div>

      <div tw="flex z-10 pb-8 ">
        <img
          src="https://frame-base64.vercel.app/farcaster.png"
          alt="farcaster"
          tw="h-20 w-20"
          width={20}
          height={20}
        />
      </div>
      <div tw="flex flex-col text-white z-10 text-center space-y-4">
        <h1 tw="text-4xl font-bold  ">Top 3 participants</h1>
        <p tw="mt-4 max-w-2xl font-[500] tracking-wide bg-white px-5 py-3 text-black rounded-xl mx-auto">
          1. 0x54a4A021C2FA8A5d5D5B9272e488E2654591c8e6 - 12 Points
        </p>
        <p tw=" max-w-2xl font-[500] tracking-wide bg-white px-5 py-3 text-black rounded-xl mx-auto">
          2. 0x898d0DBd5850e086E6C09D2c83A26Bb5F1ff8C33 - 6 Points
        </p>
        <p tw=" max-w-2xl font-[500] tracking-wide bg-white px-5 py-3 text-black rounded-xl mx-auto">
          3. 0x5Dc9C45Fbd38910b84D789C53b1269779abC4e36 - 5 Points
        </p>
      </div>
    </div>
  );
}

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
        <div tw="flex items-stat justify-center h-[476px] w-[910px]">
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
              <h2 tw="flex flex-col text-3xl mx-10 sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>{productData?.name}</span>
                <span tw="text-base font-normal max-w-sm mt-5">
                  {productData?.description}
                </span>
                <span tw="text-indigo-600 text-2xl mt-5">
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

    return new ImageResponse(
      (
        <div tw="flex flex-col items-center justify-center h-[476px] w-[910px]">
          <div tw="bg-violet-200  flex h-full w-full pl-4">
            <div tw="flex flex-col w-full py-12 px-4 items-start justify-center p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>Woocom Frame</span>
                <span tw="text-indigo-600">Select Product to Shop</span>
              </h2>
              <div tw="mt-2 flex bg-white backdrop-md py-6 shadow-md	 rounded-xl px-4">
                {frameProductData?.products &&
                  frameProductData.products.map((product, i) => {
                    return (
                      <div tw="flex mx-3 rounded-md shadow-lg" key={i}>
                        <img
                          src={
                            product.image
                              ? product.image
                              : "https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                          }
                          alt="prodcut image"
                          tw="h-36 w-36 rounded-md"
                        />
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
