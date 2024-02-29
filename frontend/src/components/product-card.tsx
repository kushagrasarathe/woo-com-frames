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
  product: any;
}

export default function ProductCard({
  productId,
  image,
  price,
  onSelectProduct,
  product,
}: Props) {
  const handleSelectProduct = () => {
    onSelectProduct(product);
  };

  return (
    <Card className="w-[300px] h-max border-0 space-y-2 bg-transparent">
      <img
        src={image}
        alt="product image"
        className=" rounded-md w-full object-cover shadow-lg rounded-md h-64 max-h-64"
      />
      <div className="flex items-center shadow-lg justify-between rounded-md p-4 bg-black rounded-b-md ">
        <div className=" text-white">
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
