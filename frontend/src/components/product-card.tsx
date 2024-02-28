"use client";

import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import product from "@/assets/sample-product.jpeg";
import { Button } from "./ui/button";

interface Props {
  productId: string;
  image: string;
  price: number;
  onSelectProduct: (productId: string) => void;
}

export default function ProductCard({
  productId,
  image,
  price,
  onSelectProduct,
}: Props) {
  const handleSelectProduct = () => {
    onSelectProduct(productId);
  };
  return (
    <Card className="w-[300px] border-0 shadow-lg  space-y-2 bg-transparent">
      <img
        src={image}
        alt="product image"
        className=" rounded-md w-full h-64 object-cover rounded-md"
      />
      <div className="flex items-center justify-between rounded-md p-4 bg-violet-300 rounded-b-md h-max">
        <div className="">
          Price
          <span className="font-[500]"> ${price}</span>
        </div>
        <Button onClick={handleSelectProduct} variant={"outline"}>
          Select
        </Button>
      </div>
    </Card>
  );
}
