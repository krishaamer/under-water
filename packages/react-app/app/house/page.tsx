import Link from "next/link";
import Image from "next/image";
import houseImage from "@/public/house.png";

export default function House() {
  return (
    <div className="flex gap-7 flex-col justify-between">
      <Image
        className="block h-[3.3rem] w-auto sm:block lg:block "
        src="/logo.svg"
        width="50"
        height="30"
        alt="Under The Water Logo"
      />
      <div className="flex flex-col justify-center items-center px-5 py-1 gap-3">
        <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
          Your House Will Be Under the Water{" "}
        </div>
        <div className="flex flex-shrink-0 items-center pb-5">
          <Image
            src={houseImage}
            alt="Flooding illustration"
            width={500}
            height={300}
          />
        </div>

        <Link
          href="/choose-house"
          className="bg-colors-secondaryButton p-3 w-full text-lg text-white text-center"
        >
          Save The House!
        </Link>
      </div>
    </div>
  );
}
