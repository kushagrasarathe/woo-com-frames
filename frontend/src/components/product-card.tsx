"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import product from "@/assets/sample-product.jpeg";
import { Button } from "./ui/button";

interface Props {
  productId: string;
  image: string;
  productName: string;
  price: number;
  onSelectProduct: (productId: string) => void;
  product: any;
}

export default function ProductCard({
  productId,
  image,
  productName,
  price,
  onSelectProduct,
  product,
}: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectProduct = () => {
    setIsSelected((prev) => !prev);
    onSelectProduct(product);
  };

  return (
    <Card className="w-[300px] h-max border-0 space-y-2 bg-transparent">
      <img
        src={image}
        alt="product image"
        className=" rounded-md w-full object-cover shadow-lg rounded-md h-64 max-h-64"
      />
      <div className="flex items-center shadow-lg h-full justify-between rounded-md p-4 bg-black rounded-b-md ">
        <div>
          <div className="font-[500] text-white line-clamp-1 hover:line-clamp-none">
            {productName}
          </div>
          <div className=" text-white">
            Price
            <span className="font-[500]"> ${price}</span>
          </div>
        </div>
        <Button onClick={handleSelectProduct} variant={"outline"}>
          {isSelected ? "Selected" : "Select"}
        </Button>
      </div>
    </Card>
  );
}
