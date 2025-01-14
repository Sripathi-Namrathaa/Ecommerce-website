import React, { Suspense } from "react";

// Dynamically import the components
const ProductList = React.lazy(() => import("@/components/product-list"));
const CategoryList = React.lazy(() => import("@/components/category-list"));
const Slider = React.lazy(() => import("@/components/slider"));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Slider...</div>}>
        <Slider />
      </Suspense>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1>Featured Products</h1>
        <Suspense fallback={<div>Loading Products...</div>}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<div>Loading Categories...</div>}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1>New Products</h1>
        <Suspense fallback={<div>Loading Products...</div>}>
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
