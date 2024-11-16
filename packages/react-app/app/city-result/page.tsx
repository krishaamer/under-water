"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CityResult, { CityKey } from "../../components/CityResult";

export default function CityResultPage() {
  const searchParams = useSearchParams();
  const selectedCity = searchParams.get("city") as CityKey | null;
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/game");
  };

  const handleBack = () => {
    router.back();
  };

  if (!selectedCity) {
    return (
      <div className="flex flex-col items-center px-3 gap-5 min-h-screen">
        <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
          Please select a city.
        </div>
      </div>
    );
  }

  return (
    <CityResult
      selectedCity={selectedCity}
      onNavigate={handleNavigate}
      onBack={handleBack}
    />
  );
}
