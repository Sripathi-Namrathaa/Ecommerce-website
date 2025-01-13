// "use client";

import CategoryList from "@/components/category-list";
import ProductList from "@/components/product-list";
import Slider from "@/components/slider";
import { WixClientContext } from "@/context/wix-context";
import { useWixClient } from "@/hooks/use-wix-client";
import { wixClientServer } from "@/lib/wix-client-server";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const response = await wixClient.products.queryProducts().find();
  //     console.log(response, "log:");
  //   };

  //   getProducts();
  // }, [wixClient]);

  // const wixClient = await wixClientServer();

  // const response = await wixClient.products.queryProducts().find();

  // console.log(response, "log");

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1>Featured Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">
          Catogeries
        </h1>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1>New Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
