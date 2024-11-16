"use client";

import { useWeb3 } from "@/contexts/useWeb3";
import { NotificationForm } from "../components/Push";
import { GozillaOne } from "../components/Gozilla";
import { Bangkok } from "../components/Bangkok";
import { Apples } from "../components/Apples";
import { useEffect, useState } from "react";

export default function Home() {
  const { address, getUserAddress } = useWeb3();
  const [clickedDistricts, setClickedDistricts] = useState<string[]>([]);

  useEffect(() => {
    getUserAddress();
  }, []);

  const handleAppleClick = (appleId: number) => {
    const districtId = `district_${appleId}`; // Map apple ID to a fake district ID
    setClickedDistricts((prev) =>
      prev.includes(districtId) ? prev : [...prev, districtId]
    );
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Bangkok map as the interactive layer */}
      <div className="absolute inset-0 z-0">
        <Bangkok clickedDistricts={clickedDistricts} />
      </div>

      {/* Foreground content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center h-full z-10">
        {!address && <div className="h1">Please connect your wallet</div>}

        {address && (
          <>
            <div className="foreground">
              <Apples onAppleClick={handleAppleClick} />
              <GozillaOne />
              <NotificationForm />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
