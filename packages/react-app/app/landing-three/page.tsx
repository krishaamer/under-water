import Link from "next/link";
import Image from "next/image";
import iceImage from "@/public/ice.png";

export default function LandingThree() {
  return (
    <div className="flex flex-col justify-center items-center px-3 py-2 gap-5">
      <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
        If the Global Temperature Increases by 1.5°C
      </div>
      <div className="flex flex-shrink-0 items-center pb-5">
        <Image src={iceImage} alt="Ice illustration" width={500} height={400} />
      </div>

      <Link
        href="/house"
        className="bg-colors-secondaryButton p-3 w-1/4 text-white text-center font-bold "
      >
        {">"}
        {">"}
      </Link>
    </div>
  );
}
