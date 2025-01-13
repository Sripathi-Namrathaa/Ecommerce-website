"use client";

import Image from "next/image";
import { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/6608749/pexels-photo-6608749.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/26731314/pexels-photo-26731314/free-photo-of-a-woman-leaning-against-a-barrier-separating-the-road-from-a-pasture.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/22873668/pexels-photo-22873668/free-photo-of-spoon-in-a-cup-of-black-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/20002322/pexels-photo-20002322/free-photo-of-young-woman-in-warm-clothing-and-sunglasses-standing-outside-in-winter.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//   },
// ];
const ProductImage = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items[index].image.url}
          fill
          className="object-cover rounded-md"
          sizes="50vw"
          alt=""
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, idx: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item.id}
            onClick={() => setIndex(idx)}
          >
            <Image
              src={item.image.url}
              fill
              className="object-cover rounded-md"
              sizes="50vw"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImage;
