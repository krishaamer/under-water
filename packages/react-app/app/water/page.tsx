"use client";
import Link from "next/link";

export default function Water() {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-5">
      <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl pb-14 backdrop-blur-md">
        Your House Will be Underwater
      </div>

      <Link
        href="/landing-three"
        className="bg-colors-secondaryButton p-2 px-16 text-white"
      >
        GO!
      </Link>
    </div>
  );
}
