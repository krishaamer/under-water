"use client";

import React, { useState } from "react";
import { CityResult, cityData, type CityKey } from "../city-result/page";

export default function ChooseHouse() {
  const [selectedCity, setSelectedCity] = useState<CityKey | "">("");
  const [showReport, setShowReport] = useState(false);

  const handleCheckCity = () => {
    if (selectedCity) {
      setShowReport(true);
    }
  };

  const handleNavigate = () => {
    window.location.href = "/report";
  };

  const handleBack = () => {
    setShowReport(false);
  };

  return (
    <div className="flex flex-col items-center px-3 gap-5 min-h-screen">
      {!showReport ? (
        <>
          <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
            Choose Your City
          </div>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value as CityKey)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a city</option>
            <option value="seoul">Seoul</option>
            <option value="bangkok">Bangkok</option>
            <option value="shanghai">Shanghai</option>
            <option value="mexicoCity">Mexico City</option>
            <option value="seattle">Seattle</option>
          </select>

          <button
            onClick={handleCheckCity}
            className="bg-colors-secondaryButton p-3 w-full text-white text-center font-bold rounded-md"
            disabled={!selectedCity}
          >
            Check Your City Future
          </button>
        </>
      ) : (
        <CityResult
          selectedCity={selectedCity as CityKey}
          onNavigate={handleNavigate}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
