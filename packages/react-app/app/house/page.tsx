"use client";

import Link from "next/link";
import Image from "next/image";
import houseImage from "@/public/house.png";
import { useEffect, useState } from "react";

export default function House() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 500);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Image
        className={`block h-[3.3rem] w-auto sm:block lg:block transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        src="/logo.svg"
        width="50"
        height="30"
        alt="Under The Water Logo"
      />
      <div className="flex flex-col justify-center items-center px-5 py-1 gap-3">
        <div
          className={`justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md transition-all duration-1000 ${
            showTitle
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          Your House Will Be
          <span className="block text-red-400 animate-pulse">
            Under the Water
          </span>
        </div>

        <div
          className={`flex flex-shrink-0 items-center pb-5 transition-transform duration-1000 ${
            showTitle ? "transform translate-y-0" : "transform translate-y-20"
          }`}
        >
          <Image
            src={houseImage}
            alt="Flooding illustration"
            width={500}
            height={300}
            className="animate-float"
          />
        </div>

        <Link
          href="/choose-house"
          className={`bg-colors-secondaryButton p-3 w-full text-lg text-white text-center transition-all duration-500 transform hover:scale-105 ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Save The House!
        </Link>
      </div>
    </div>
  );
}
