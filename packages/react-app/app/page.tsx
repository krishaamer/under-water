"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-5 flex-col">
      <Image
        className="block h-[5.3rem] w-auto sm:block lg:block "
        src="/logo.svg"
        width="50"
        height="30"
        alt="Under The Water Logo"
      />
      <div className="flex flex-col justify-center items-center px-5 py-2 gap-5 ">
        <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl pb-14 backdrop-blur-md">
          The world continues to ignore the threat of climate change...
        </div>
        <Link
          href="/landing-two"
          className="bg-colors-secondaryButton p-3 w-full text-white text-center font-bold "
        >
          START
        </Link>
      </div>
    </div>
  );
}
