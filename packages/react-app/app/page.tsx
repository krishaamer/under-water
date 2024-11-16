"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-10">
      <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl pb-14 backdrop-blur-md">
        The world continues to ignore the threat of climate change...
      </div>
      <Link
        href="/landing-two"
        className="bg-colors-secondaryButton p-3 w-full text-white text-center"
      >
        CONTINUE
      </Link>
    </div>
  );
}
