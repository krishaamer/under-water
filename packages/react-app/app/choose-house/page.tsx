/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CityKey } from "../../components/CityResult";
import Image from "next/image";

export default function ChooseHouse() {
  const [selectedCity, setSelectedCity] = useState<CityKey | "">("");
  const router = useRouter();

  const handleCheckCity = () => {
    if (selectedCity) {
      router.push(`/city-result?city=${selectedCity}`);
    }
  };

  return (
    <div className="flex gap-7 flex-col justify-between ">
      <Image
        className="block h-[6.3rem] w-auto sm:block lg:block"
        src="/logo.svg"
        width="50"
        height="30"
        alt="Under The Water Logo"
      />
      <div className="flex flex-col items-center px-3 gap-5 pt-10 min-h-screen">
        <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md pb-10">
          See How Climate Change Affects Your City{" "}
        </div>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value as CityKey)}
          className="w-full p-3 border border-gray-300 text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className={`bg-colors-secondaryButton p-3 w-full text-white text-center text-lg font-bold rounded-md ${
            !selectedCity ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedCity}
        >
          Check Your City Future
        </button>
      </div>
    </div>
  );
}
