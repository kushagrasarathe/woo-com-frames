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
const BASE_URL = process.env.NEXT_PUBLIC_HOST;

export default function Home() {
  const [products, setProducts] = useState<any[]>();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [frameLink, setFrameLink] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  // const [frameLink, setFrameLink] = useState<string>()

  const getShopProducts = async () => {
    try {
      if (!searchValue) {
        console.log("Search Value missing");
        return;
      }
      const keys = await getCredentialsLocal();
      if (!keys) {
        console.log("Keys missing");
        return;
      }

      const products = await getProducts(
        searchValue,
        keys.consumerKey,
        keys.consumerSecret
      );
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const generateFrameLink = async () => {
    try {
      console.log(selectedProducts);
      if (selectedProducts.length == 0 || selectedProducts.length > 4) {
        console.log("Invalid Product selection");
        return;
      }
      if (!searchValue) {
        console.log("Shop link missing");
        return;
      }

      const frameId = await createFrameData(searchValue, "Demo Merch Shop");
      if (!frameId) {
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
    } catch (error) {
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

  return (
    <main className="px-20">
      <Navbar />
      <div className="py-20 space-y-8">
        <div className="flex items-center justify-between border-b border-neutral-300 pb-6 ">
          <h1 className="text-2xl font-[500] tracking-wide">Select Products</h1>
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
        <div className=" grid grid-cols-12 gap-4">
          <div className=" col-span-9 flex items-stretch justify-normal gap-6 flex-wrap">
            {products &&
              products?.map((product, i) => {
                return (
                  <ProductCard
                    key={i}
                    product={product}
                    productId={product.id}
                    onSelectProduct={handleSelectProduct}
                    price={product.price}
                    image={product.images[0].src}
                  />
                );
              })}

            {/* <ProductCard
              productId="abcd"
              onSelectProduct={handleSelectProduct}
              price={200}
              image="https://helios-i.mashable.com/imagery/articles/05Uv3oG3o5kh6djZHmwyhOT/hero-image.fill.size_1248x702.v1697141760.png"
            /> */}
            {/* <ProductCard
              productId="efgh"
              onSelectProduct={handleSelectProduct}
              price={200}
              image="https://helios-i.mashable.com/imagery/articles/05Uv3oG3o5kh6djZHmwyhOT/hero-image.fill.size_1248x702.v1697141760.png"
            />
            <ProductCard
              productId="ijk"
              onSelectProduct={handleSelectProduct}
              price={200}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEAMilb7dyX9a2wYnbXitlxUSPw9mnOUfC7mmed8YZpk8XlZXPeEubgK7OsGgLN0upwU&usqp=CAU"
            />
            <ProductCard
              productId="lmno"
              onSelectProduct={handleSelectProduct}
              price={200}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEAMilb7dyX9a2wYnbXitlxUSPw9mnOUfC7mmed8YZpk8XlZXPeEubgK7OsGgLN0upwU&usqp=CAU"
            /> */}
          </div>
          <div className=" col-span-3 space-y-4">
            <Card className="w-[300px] border-0 shadow-lg rounded-md p-5 space-y-4">
              <h1 className="text-xl font-[500]">Generate</h1>
              <p>
                Select products and then generate frame to get your dynamic
                Woocommerce frame and sell directly using it.
              </p>
              <div>Products Selected: {selectedProducts.length} </div>
              <Button
                variant={"default"}
                className=" w-full"
                onClick={() => generateFrameLink()}
              >
                Generate
              </Button>
            </Card>
            <Card className="w-[300px] border-0 shadow-lg rounded-md p-5 space-y-4">
              <p>
                Congrats, you just created your Frame, you can now start selling
                directly through the frame
              </p>
              {frameLink && <div>{frameLink}</div>}
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
