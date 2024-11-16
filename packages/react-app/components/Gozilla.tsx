import React from "react";

interface GozillaProps {
  size: number; // Size of Gozilla, dynamically adjusted
}

export const GozillaOne: React.FC<GozillaProps> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Godzilla Body */}
    <path
      d="M100 300 L150 200 L200 250 L250 200 L300 300 L250 350 L150 350 Z"
      fill="#2c3e50"
    />
    {/* Godzilla Head */}
    <path d="M175 200 L200 150 L225 200 L200 225 Z" fill="#34495e" />
    {/* Godzilla Eye */}
    <circle cx="195" cy="185" r="5" fill="#e74c3c" />
    {/* Godzilla Spikes */}
    <polygon points="200,150 190,130 200,140 210,130 220,150" fill="#7f8c8d" />
    <polygon points="200,160 185,135 200,150 215,135 230,160" fill="#7f8c8d" />
    <polygon points="200,170 180,140 200,160 220,140 240,170" fill="#7f8c8d" />
    {/* Godzilla Tail */}
    <path d="M150 350 Q100 375 50 300 Q75 325 100 300" fill="#2c3e50" />
    {/* Godzilla Feet */}
    <path d="M150 350 L125 400 L175 400 Z" fill="#34495e" />
    <path d="M250 350 L225 400 L275 400 Z" fill="#34495e" />
    {/* Atomic Breath */}
    <path
      d="M200 200 Q250 175 300 150 Q275 175 300 200 Q275 225 300 250 Q250 225 200 200"
      fill="#3498db"
      opacity="0.7"
    >
      <animate
        attributeName="opacity"
        values="0.7;0.2;0.7"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const CuteGozilla: React.FC<GozillaProps> = ({ size }) => (
  <svg
    width="400"
    height="400"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background */}
    <rect width="400" height="400" fill="#87CEEB" />

    {/* Cute Godzilla Body */}
    <ellipse cx="200" cy="280" rx="100" ry="80" fill="#7FFF00" />

    {/* Cute Godzilla Head */}
    <circle cx="200" cy="160" r="100" fill="#7FFF00" />

    {/* Cute Godzilla Eyes */}
    <circle cx="170" cy="140" r="20" fill="white" />
    <circle cx="230" cy="140" r="20" fill="white" />
    <circle cx="170" cy="140" r="10" fill="black" />
    <circle cx="230" cy="140" r="10" fill="black" />

    {/* Cute Godzilla Mouth */}
    <path
      d="M180 190 Q200 210 220 190"
      stroke="black"
      strokeWidth="5"
      fill="none"
    />

    {/* Cute Godzilla Spikes */}
    <polygon points="200,60 190,80 210,80" fill="#32CD32" />
    <polygon points="170,70 160,90 180,90" fill="#32CD32" />
    <polygon points="230,70 220,90 240,90" fill="#32CD32" />

    {/* Cute Godzilla Arms */}
    <path
      d="M120 250 Q100 270 110 300"
      stroke="#7FFF00"
      strokeWidth="20"
      strokeLinecap="round"
    />
    <path
      d="M280 250 Q300 270 290 300"
      stroke="#7FFF00"
      strokeWidth="20"
      strokeLinecap="round"
    />

    {/* Cute Godzilla Legs */}
    <path
      d="M160 350 Q150 380 170 400"
      stroke="#7FFF00"
      strokeWidth="25"
      strokeLinecap="round"
    />
    <path
      d="M240 350 Q250 380 230 400"
      stroke="#7FFF00"
      strokeWidth="25"
      strokeLinecap="round"
    />

    {/* Cute Godzilla Tail */}
    <path
      d="M200 350 Q150 370 100 340"
      stroke="#7FFF00"
      strokeWidth="25"
      strokeLinecap="round"
      fill="none"
    />

    {/* Cute Atomic Breath */}
    <path
      d="M200 190 Q230 180 260 170 Q240 180 260 190 Q240 200 260 210 Q230 200 200 190"
      fill="#00BFFF"
    >
      <animate
        attributeName="opacity"
        values="0.7;0.2;0.7"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);
