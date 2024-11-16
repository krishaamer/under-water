import Link from "next/link";
import Image from "next/image";
import floodingImage from "@/public/flooding.png";

export default function LandingTwo() {
  return (
    <div className="flex gap-7 flex-col justify-between">
      <Image
        className="block h-[3.3rem] w-auto sm:block lg:block "
        src="/logo.svg"
        width="50"
        height="30"
        alt="Under The Water Logo"
      />
      <div className="flex flex-col justify-center items-center px-3 py-2 gap-5">
        <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
          Severe Flooding is Affecting Regions Across the Globe
        </div>
        <div className="flex flex-shrink-0 items-center pb-5">
          <Image
            src={floodingImage}
            alt="Flooding illustration"
            width={500}
            height={400}
          />
        </div>

        <Link
          href="/landing-three"
          className="bg-colors-secondaryButton p-4 w-1/4 text-white text-center font-bold text-lg rounded-md "
        >
          {">"}
          {">"}
        </Link>
      </div>
    </div>
  );
}
