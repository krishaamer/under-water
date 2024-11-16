"use client";

import React from "react";

type CityData = {
  title: string;
  impacts: {
    main: string;
    description: string;
    riskAreas: string[];
    economicRisk: {
      title: string;
      description?: string;
      infrastructure: string[];
    };
  };
};

type CitiesData = {
  seoul: CityData;
  bangkok: CityData;
  shanghai: CityData;
  mexicoCity: CityData;
  seattle: CityData;
};

type CityKey = keyof CitiesData;

interface CityResultProps {
  selectedCity: CityKey;
  onNavigate: () => void;
  onBack: () => void;
}

const cityData: CitiesData = {
  seoul: {
    title: "Seoul by 2050",
    impacts: {
      main: "Projected Impacts by 2050:",
      description:
        "Increasing extreme weather events and urban heat island effect",
      riskAreas: [
        "Low-lying areas near Han River",
        "Dense urban districts",
        "Underground infrastructure networks",
      ],
      economicRisk: {
        title: "2. Economic Risk:",
        infrastructure: [
          "Seoul Metro system",
          "Major business districts like Gangnam and Jung-gu",
          "IT and technology hubs",
        ],
      },
    },
  },
  bangkok: {
    title: "Bangkok by 2050",
    impacts: {
      main: "Projected Impacts by 2050:",
      description:
        "Severe flooding risks due to land subsidence and sea level rise",
      riskAreas: [
        "Riverside communities",
        "Eastern Bangkok districts",
        "Historic areas near Chao Phraya River",
      ],
      economicRisk: {
        title: "2. Economic Risk:",
        infrastructure: [
          "Mass transit systems",
          "Major commercial centers",
          "Industrial estates in outer Bangkok",
        ],
      },
    },
  },
  shanghai: {
    title: "Shanghai by 2050",
    impacts: {
      main: "Projected Impacts by 2050:",
      description:
        "Without adaptation measures, significant parts of Shanghai could face regular flooding",
      riskAreas: [
        "Pudong district",
        "Parts of the historic Bund",
        "Coastal areas in the Yangtze River Delta",
      ],
      economicRisk: {
        title: "2. Economic Risk:",
        description:
          "Shanghai is one of the world's most economically exposed cities to sea level rise",
        infrastructure: [
          "Shanghai Port (one of the world's busiest)",
          "Metro stations",
          "Financial district buildings",
        ],
      },
    },
  },
  mexicoCity: {
    title: "Mexico City by 2050",
    impacts: {
      main: "Projected Impacts by 2050:",
      description:
        "Severe water scarcity and flooding risks due to extreme weather patterns",
      riskAreas: [
        "Eastern suburbs prone to flooding",
        "Low-lying areas of the former lake bed",
        "Areas with aging drainage infrastructure",
        "Informal settlements in flood-prone zones",
      ],
      economicRisk: {
        title: "2. Economic Risk:",
        description:
          "Mexico City faces dual threats from water scarcity and flood damage",
        infrastructure: [
          "Historic city center buildings and cultural sites",
          "Metro system and transportation infrastructure",
          "Water supply and drainage systems",
          "Major business districts and commercial zones",
        ],
      },
    },
  },
  seattle: {
    title: "Seattle by 2050",
    impacts: {
      main: "Projected Impacts by 2050:",
      description:
        "Rising sea levels combined with increased rainfall and storm surge risks",
      riskAreas: [
        "Waterfront areas including the Port of Seattle",
        "Low-lying neighborhoods near Puget Sound",
        "Duwamish River industrial area",
        "Coastal infrastructure and beaches",
      ],
      economicRisk: {
        title: "2. Economic Risk:",
        description:
          "Seattle's maritime economy and coastal infrastructure face significant risks",
        infrastructure: [
          "Port facilities and maritime industries",
          "Downtown waterfront businesses",
          "Transportation infrastructure including ferry terminals",
          "Tech company headquarters in vulnerable areas",
        ],
      },
    },
  },
};

const CityResult: React.FC<CityResultProps> = ({
  selectedCity,
  onNavigate,
  onBack,
}) => {
  if (!selectedCity) return null;

  return (
    <>
      <div className="justify-center text-center items-center font-bold leading-relaxed text-colors-secondary text-3xl backdrop-blur-md">
        See how rising seas could affect your home by 2050
      </div>

      <h3 className="text-3xl font-bold mb-4">
        {cityData[selectedCity].title}
      </h3>

      <div className="bg-blue-400 text-white p-6 rounded-lg w-3/4">
        <div className="space-y-4">
          <p className="font-semibold">{cityData[selectedCity].impacts.main}</p>
          <p>{cityData[selectedCity].impacts.description}</p>

          <div>
            <p className="font-semibold mb-2">Areas most at risk include:</p>
            <ul className="list-disc pl-6">
              {cityData[selectedCity].impacts.riskAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">
              {cityData[selectedCity].impacts.economicRisk.title}
            </p>
            {cityData[selectedCity].impacts.economicRisk.description && (
              <p className="mb-2">
                {cityData[selectedCity].impacts.economicRisk.description}
              </p>
            )}
            <p className="font-semibold mb-2">
              Critical infrastructure at risk includes:
            </p>
            <ul className="list-disc pl-6">
              {cityData[selectedCity].impacts.economicRisk.infrastructure.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <button
          onClick={onBack}
          className="bg-colors-secondaryButton p-3 w-full text-white text-center font-bold rounded-md"
        >
          Check Other City
        </button>

        <button
          onClick={onNavigate}
          className="bg-colors-secondaryButton p-3 w-full text-white text-center font-bold rounded-md"
        >
          Let's go and save the world!
        </button>
      </div>
    </>
  );
};

export { CityResult, cityData, type CityKey };
