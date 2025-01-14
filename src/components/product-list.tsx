import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wix-client-server";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";

import product from "../../public/product.png";
import Pagination from "./pagination";
const PRODUCT_PER_PAGE = 10;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }

    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }
  console.log("log product list page.tsx");

  const response = await productQuery.find();

  console.log("Fetched products: log", response.items);

  return (
    <div className="m-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {response.items.map((product: products.Product) => {
        return (
          <Link
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            <div className="relative w-full h-80">
              <Image
                src={
                  product.media?.mainMedia?.image?.url ||
                  "../../public/product.png"
                }
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-all easy duration-500"
              />
              {product.media?.items && (
                <Image
                  src={
                    product.media?.items[1]?.image?.url ||
                    "../../public/product.png"
                  }
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">{product.price?.price}</span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections?.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <button className="rounded-2xl ring-1 ring-light-orange text-light-orange py-2 px-4 text-xs hover:bg-light-orange hover:text-white w-max">
              Add to cart
            </button>
          </Link>
        );
      })}
      {searchParams?.cat ||
        (searchParams?.name && (
          <Pagination
            currentPage={response.currentPage || 0}
            hasPrev={response.hasPrev()}
            hasNext={response.hasNext()}
          />
        ))}
    </div>
  );
};
export default ProductList;
