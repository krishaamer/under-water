"use client"

import { useWeb3 } from "@/contexts/useWeb3";
import { GozillaOne, CuteGozilla } from "../components/Gozilla"; // Import both components
import { Bangkok } from "../components/Bangkok";
import { Apples } from "../components/Apples";
import { useEffect, useState } from "react";
import { districts } from "../lib/districts";
import ContractInteraction from "../components/Contract"; // Import the new component

export default function Home() {
  const { address, getUserAddress } = useWeb3();
  const [clickedDistricts, setClickedDistricts] = useState<string[]>([]);

  // Constants for Gozilla's size
  const initialSize = 800; // Starting size of Gozilla in pixels
  const sizeReduction = 60; // Reduction in size per clicked district
  const minimumSize = 100; // Minimum size limit to prevent disappearing

  const gozillaSize = Math.max(
    initialSize - clickedDistricts.length * sizeReduction,
    minimumSize
  );

  useEffect(() => {
    getUserAddress();
  }, []);

  const handleAppleClick = (appleId: number) => {
    const districtId = districts[appleId % districts.length]?.id; // Use modulo for cycling through districts
    if (districtId) {
      setClickedDistricts((prev) =>
        prev.includes(districtId) ? prev : [...prev, districtId]
      );
    }
  };

  const allDistrictsClicked = clickedDistricts.length === districts.length;

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Bangkok clickedDistricts={clickedDistricts} />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center h-full z-20">
        {address && (
          <>
            <div className="foreground">
              <Apples onAppleClick={handleAppleClick} />
              {allDistrictsClicked ? (
                <>
                  <CuteGozilla size={gozillaSize} />
                  <ContractInteraction />
                </>
              ) : (
                <GozillaOne size={gozillaSize} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
