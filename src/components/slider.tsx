"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/29371349/pexels-photo-29371349/free-photo-of-fashionable-man-in-orange-shirt-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/27893231/pexels-photo-27893231/free-photo-of-a-woman-taking-a-picture-with-her-camera.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/15283865/pexels-photo-15283865/free-photo-of-beautiful-woman-in-a-white-dress-and-flower-earrings.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   });
  return (
    <div className="h-[calc(100vh-80px) overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/**Text container */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4">
                  Shop Now
                </button>
              </Link>
            </div>
            {/**Image container */}
            <div className="h-1/2 xl:w-1/2 relative xl:h-full">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
            <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
              {slides.map((slide, index) => (
                <div
                  className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
                    current === index ? "scale-150" : ""
                  }`}
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slider;
