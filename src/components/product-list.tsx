import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wix-client-server";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 20;

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

  const response = await wixClient.products
    .queryProducts()
    .eq("collectionIds", "categoryId")
    .limit(limit || PRODUCT_PER_PAGE)
    .find();
  response.items.map((product) => console.log(product, "log::"));

  return (
    <div className="m-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {response.items.map((product: products.Product) => {
        return (
          <Link
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-all easy duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
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
    </div>
  );
};
export default ProductList;
