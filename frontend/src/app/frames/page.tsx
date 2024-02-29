import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-[400px] w-[800px]">
      <div className="bg-gray-50 flex h-full w-full pl-10">
        <div className="flex flex-col w-full py-12 px-4 items-start justify-center p-8">
          <h2 className="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
            <span>Woocom Frame</span>
            <span className="text-indigo-600">Select Product to Shop</span>
          </h2>
          <div className="mt-8 flex">
            <div className="flex mx-3 rounded-md shadow">
              <img
                src="https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                alt="prodcut image"
                className="h-36 w-36"
              />
            </div>
            <div className="mx-3 flex rounded-md shadow">
              <img
                src="https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                alt="prodcut image"
                className="h-36 w-36"
              />
            </div>
            <div className="flex mx-3 rounded-md shadow">
              <img
                src="https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                alt="prodcut image"
                className="h-36 w-36"
              />
            </div>
            <div className="mx-3 flex rounded-md shadow">
              <img
                src="https://sxvstyle.com/cdn/shop/products/265copy_67fefa22-77b1-4aac-b934-8d320f2aa558_1120x.jpg?v=1658915936"
                alt="prodcut image"
                className="h-36 w-36"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
