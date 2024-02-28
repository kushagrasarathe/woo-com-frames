"use client";

import AddStore from "@/components/add-store";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [frameLink, setFrameLink] = useState<string>("");

  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(
        selectedProducts.filter((id: any) => id !== productId)
      );
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <main className="px-20">
      <Navbar />
      <div className="py-20 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-[500] tracking-wide">Select Products</h1>
        </div>
        <div className=" grid grid-cols-12">
          <div className=" col-span-9 flex items-stretch justify-normal gap-6 flex-wrap">
            <ProductCard
              productId="abcd"
              onSelectProduct={handleSelectProduct}
              price={200}
              image="https://helios-i.mashable.com/imagery/articles/05Uv3oG3o5kh6djZHmwyhOT/hero-image.fill.size_1248x702.v1697141760.png"
            />
            <ProductCard
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
            />
          </div>
          <div className=" col-span-3 space-y-4">
            <Card className="w-[300px] border-0 shadow-lg rounded-md p-5 space-y-4">
              <h1 className="text-xl font-[500]">Generate</h1>
              <p>
                Select products and then generate frame to get your dynamic
                Woocommerce frame and sell directly using it.
              </p>
              <div>Products Selected: {selectedProducts.length} </div>
              <Button variant={"default"} className=" w-full">
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
