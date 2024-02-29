"use client";

import AddStore from "@/components/add-store";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addProducts, createFrameData, productData } from "@/firebase/methods";
import { getCredentialsLocal, getProducts } from "@/utils/apiMethods";
import { useState } from "react";
import emptyState from "@/assets/empty-state.png";
import Image from "next/image";
import { AsteriskSquare, CopyIcon, LucideIcon, Store } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { toast } from "sonner";
const BASE_URL = process.env.NEXT_PUBLIC_HOST;

interface Steps {
  title: string;
  icon: LucideIcon;
}
const steps: Steps[] = [
  {
    title: "Add Keys",
    icon: AsteriskSquare,
  },
  {
    title: "Products",
    icon: Store,
  },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [frameLink, setFrameLink] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getShopProducts = async () => {
    toast.loading("Fetching products from your Woocommerce Store");
    try {
      setLoading(true);
      if (!searchValue) {
        console.log("Search Value missing");
        toast.dismiss();
        toast.error("No search value found");
        return;
      }
      const keys = await getCredentialsLocal();
      if (!keys) {
        toast.dismiss();
        console.log("Keys missing");
        toast.error("Please add your store API and Secret key first");
        return;
      }

      const products = await getProducts(
        searchValue,
        keys.consumerKey,
        keys.consumerSecret
      );
      console.log(products);
      setProducts(products);
      setLoading(false);
      toast.success(
        "Products fetched successfully from your Woocommerce Store"
      );
    } catch (error) {
      toast.dismiss();
      toast.error("Error fetching products, please try again");
      setLoading(false);
      console.log(error);
    }
  };

  const generateFrameLink = async () => {
    try {
      setLoading(true);
      toast.loading("Generting frame for your Woocommerce Store");
      console.log(selectedProducts);
      if (selectedProducts.length == 0 || selectedProducts.length > 4) {
        console.log("Invalid Product selection");
        toast.dismiss();
        toast.error("Please select products to generate Frame for");
        return;
      }
      if (!searchValue) {
        toast.dismiss();
        toast.error("Missing store link");
        console.log("Shop link missing");
        return;
      }

      const frameId = await createFrameData(searchValue, "Demo Merch Shop");
      if (!frameId) {
        toast.dismiss();
        toast.error("Error in Creating frame");
        console.log("Error in Creating frame");
        return;
      }
      // const frameId = "sCl904sRFIWlkT4ELzuR";

      selectedProducts.forEach(async (product) => {
        const _product: productData = {
          id: product.id,
          name: product.name,
          permaLink: product.permalink,
          price: product.price,
          currency: "USD",
          description: product.short_description,
          image: product.images[0].src,
        };
        console.log(_product);
        await addProducts(frameId, _product);
      });

      const framelink = `${BASE_URL}/shop/${frameId}`;
      console.log(framelink);
      setFrameLink(framelink);
      setLoading(false);
      toast.success("Your Woocommerce Store Frame is ready ");
    } catch (error) {
      toast.dismiss();
      toast.error("Error generating Frame link, please try again");
      console.log(error);
    }
  };

  const handleSelectProduct = (product: any) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((id: any) => id !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).catch((error) => {
      console.error("Error copying to clipboard:", error);
    });
  };

  if (!products?.length) {
    return (
      <div className=" px-20 py-10 ">
        <div className=" max-w-3xl flex items-start justify-between mx-auto pb-3 border-b border-neutral-400 mb-5">
          <div>
            <h1 className=" text-2xl font-semibold">Welcome</h1>
            <h1 className=" text-sm font-normal max-w-lg">
              Add your store keys and then import your store products to start
              selling directly through frames{" "}
            </h1>
          </div>
          <AddStore />
        </div>
        <Card className="flex flex-col relative shadow-lg mt-2 max-w-3xl mx-auto gap-4 items-center justify-between border-b p10 ">
          {/* <h1 className="text-2xl font-[500] tracking-wide z-10">Welcome :D</h1> */}
          <img
            src={
              "https://cdn.dribbble.com/userupload/5489673/file/original-c7e9bc0fa372bc43f26cbfb7ff41bb37.jpg?resize=1504x1128"
            }
            alt="emptyState"
            className=" max-w-full rounded-t-md max-h-[450px] object-cover w-full"
          />
          <div className=" px-10 pb-8 pt-5 flex flex-col-reverse gap-4 items-center">
            <div className=" text-base max-w-xl text-center">
              Enter your Woocommerce store URL to get your store products
            </div>
            <div className=" flex items-center gap-2 z-10">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="w-72"
              />
              <Button
                variant={"default"}
                className=" w-fit"
                disabled={loading}
                onClick={() => getShopProducts()}
              >
                {loading ? <Loader /> : "Get products"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <main className="px-20">
      <div className="py-14 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-300 pb-6 ">
          <div className=" space-y-1">
            <h1 className="text-xl font-[500] tracking-wide">
              Select Products
            </h1>
            <div className=" text-sm">
              Select products and then generate frame to get your dynamic
              Woocommerce frame and sell directly using it.
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-72"
            />
            <Button
              variant={"default"}
              className=" w-fit"
              onClick={() => getShopProducts()}
            >
              Get products
            </Button>
          </div>
        </div>
        <div className=" grid grid-cols-12 gap-12">
          <div className=" col-span-12 flex items-stretch justify-normal gap-6 flex-wrap">
            {products &&
              products?.map((product, i) => {
                return (
                  <ProductCard
                    key={i}
                    product={product}
                    productName={product.name}
                    productId={product.id}
                    onSelectProduct={handleSelectProduct}
                    price={product.price}
                    image={product.images[0].src}
                  />
                );
              })}

            {/* <ProductCard
              product={"product123"}
              productId="abcd"
              productName="abcd"
              onSelectProduct={handleSelectProduct}
              price={200}
              image="https://www.designinfo.in/wp-content/uploads/2023/06/16643000-1-optimized.jpg"
            /> */}
          </div>
          <div className=" col-span-12 space-y-4">
            {!!products?.length && (
              <Card className=" w-full flex items-center justify-between border-0 shadow-lg rounded-md p-5">
                <div>
                  Products Selected:{" "}
                  <span className="font-semibold">
                    {selectedProducts.length}{" "}
                  </span>
                </div>
                <Button
                  variant={"default"}
                  className=""
                  onClick={() => generateFrameLink()}
                >
                  Generate
                </Button>
              </Card>
            )}
            {frameLink && (
              <Card className="w-full border-0 shadow-lg rounded-md p-5 space-y-4">
                <p>
                  Congrats, you just created your Frame, you can now start
                  selling directly through the frame
                </p>

                <div className="flex items-center gap-3">
                  <div>{frameLink}</div>
                  <div onClick={() => copyToClipboard(frameLink)}>
                    <CopyIcon className=" h-4 w-4 active:scale-95 transition-all ease-in-out cursor-pointer" />
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
