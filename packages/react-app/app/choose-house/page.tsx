import Link from "next/link";
import Image from "next/image";
import iceImage from "@/public/ice.png";

export default function ChooseHouse() {
  return (
    <div className="flex flex-col justify-center items-center px-3 py-2 gap-5">
        
      <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md"></div>
      Choose Your City
      <Link
        href="/house"
        className="bg-colors-secondaryButton p-3 w-1/4 text-white text-center font-bold "
      >
        Check Your City Future
      </Link>
    </div>
  );
}
