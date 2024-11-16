/* eslint-disable react/no-unescaped-entities */
"use client";

import { useWeb3 } from "@/contexts/useWeb3";
import { GozillaOne, CuteGozilla } from "../../components/Gozilla";
import { Bangkok } from "../../components/Bangkok";
import { Apples } from "../../components/Apples";
import { useEffect, useState } from "react";
import { districts } from "../../lib/districts";
import ContractInteraction from "../../components/Contract";
import Offset from "../../components/Offset";
import OffsetCelo from "../../components/OffsetCelo";
import { NotificationForm } from "../../components/Push";

export default function Home() {
  const { address, getUserAddress } = useWeb3();
  const [clickedDistricts, setClickedDistricts] = useState<string[]>([]);
  const [temperatureChange, setTemperatureChange] = useState<number>(2.0);

  const initialSize = 800;
  const sizeReduction = 60;
  const minimumSize = 100;

  const gozillaSize = Math.max(
    initialSize - clickedDistricts.length * sizeReduction,
    minimumSize
  );

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  useEffect(() => {
    const reductionPerClick = 0.05;
    const newTemperatureChange = Math.max(
      2.0 - clickedDistricts.length * reductionPerClick,
      0
    );
    setTemperatureChange(parseFloat(newTemperatureChange.toFixed(2)));
  }, [clickedDistricts]);

  const handleAppleClick = (appleId: number) => {
    const districtId = districts[appleId % districts.length]?.id;
    if (districtId) {
      setClickedDistricts((prev) =>
        prev.includes(districtId) ? prev : [...prev, districtId]
      );
    }
  };

  const handleDistrictClick = (districtId: string) => {
    setClickedDistricts((prev) =>
      prev.includes(districtId) ? prev : [...prev, districtId]
    );
  };

  const allDistrictsClicked = clickedDistricts.length === districts.length;

  return (
    <div className="relative w-screen h-screen">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] p-4 rounded-xl shadow bg-white">
        <p className="text-lg font-semibold text-center">
          Average Temperature Change: {temperatureChange}°C
        </p>
      </div>

      <div className="fixed top-16 left-4 z-[9999] p-2 rounded-2xl shadow bg-pink-100">
        <NotificationForm clickedDistricts={clickedDistricts} />
      </div>

      <div className="absolute inset-0 z-10">
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <Bangkok
            clickedDistricts={clickedDistricts}
            onDistrictClick={handleDistrictClick}
          />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center h-full z-20">
        {address && (
          <>
            <div className="foreground">
              <OffsetCelo />
              <Apples onAppleClick={handleAppleClick} />
              {allDistrictsClicked ? (
                <>
                  <CuteGozilla size={gozillaSize} />
                  <ContractInteraction />
                  <Offset />
                  <OffsetCelo />
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
