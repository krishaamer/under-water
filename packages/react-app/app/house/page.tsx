import Link from "next/link";
import Image from "next/image";
import houseImage from "@/public/house.png";

export default function House() {
  return (
    <div className="flex flex-col justify-center items-center px-5 py-2 gap-5">
      <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
        Your House Will Be Under the Water{" "}
      </div>
      <div className="flex flex-shrink-0 items-center pb-5">
        <Image
          src={houseImage}
          alt="Flooding illustration"
          width={500}
          height={400}
        />
      </div>

      <Link
        href="/house"
        className="bg-colors-secondaryButton p-3 w-full text-white text-center"
      >
        Go!
      </Link>
    </div>
  );
}
