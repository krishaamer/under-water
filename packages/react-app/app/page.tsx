"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const text = "The World Continues to Ignore the Threat of Climate Change...";

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 500);

    setTimeout(() => {
      setShowText(true);
      const interval = setInterval(() => {
        setTextIndex((prev) => {
          if (prev < text.length) return prev + 1;
          clearInterval(interval);

          setTimeout(() => setShowButton(true), 500);
          return prev;
        });
      }, 70);

      return () => clearInterval(interval);
    }, 1000);
  }, []);

  return (
    <div className="flex gap-7 flex-col items-center min-h-screen ">
      <div
        className={`transition-all duration-1000 ${
          showLogo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <Image
          className="block h-[7rem] w-auto sm:block lg:block animate-pulse-slow"
          src="/logo.svg"
          width="50"
          height="30"
          alt="Under The Water Logo"
        />
      </div>

      <div className="flex flex-col justify-center items-center px-5 py-2 gap-5">
        <div
          className={`justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl pb-14 backdrop-blur-md
          ${
            showText ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          {text.slice(0, textIndex)}
          <span className="animate-blink">|</span>
        </div>
        <Link
          href="/landing-two"
          className={`bg-colors-secondaryButton p-4 w-full text-white text-center font-bold text-lg rounded-md 
            transform transition-all duration-500 hover:scale-105 hover:brightness-110
            ${
              showButton
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
            animate-pulse-button`}
        >
          START
        </Link>
      </div>

      <div className="fixed inset-0 bg-gradient-radial from-transparent to-gray opacity-20 pointer-events-none" />
    </div>
  );
}
