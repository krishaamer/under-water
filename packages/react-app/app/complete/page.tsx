import Link from "next/link";
import Image from "next/image";
import moodangImage from "@/public/moodang.png";

export default function Complete() {
  return (
    <div className="flex gap-3 flex-col justify-between">
      <Image
        className="block h-[4.3rem] w-auto sm:block lg:block "
        src="/logo.svg"
        width="50"
        height="30"
        alt="Under The Water Logo"
      />
      <div className="flex flex-col justify-center items-center px-3 py-2 gap-5">
        <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
          Please Check The Completion of Transaction
        </div>
        <div className="flex flex-shrink-0 items-center pb-5">
          <Image
            src={moodangImage}
            alt="Moodang illustration"
            width={500}
            height={400}
          />
        </div>
        <Link
          href="https://testnet-scan.sign.global/schema/onchain_evm_84532_0x4b5"
          className="bg-colors-secondaryButton rounded-md p-2 w-full text-white text-center font-bold text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Sign Protocol Attestation
        </Link>

        <Link
          href="https://base-sepolia.blockscout.com/address/0xec28980605615954f48338c68a5623fd748065cc#code"
          className="bg-colors-secondaryButton rounded-md p-2 w-full text-white text-center font-bold text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Blockscout Explore
        </Link>
      </div>
    </div>
  );
}
