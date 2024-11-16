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
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >

    {/* Cute Godzilla Body */}
    <ellipse cx="50" cy="70" rx="25" ry="20" fill="#7FFF00" />

    {/* Cute Godzilla Head */}
    <circle cx="50" cy="40" r="25" fill="#7FFF00" />

    {/* Cute Godzilla Eyes */}
    <circle cx="42.5" cy="35" r="5" fill="white" />
    <circle cx="57.5" cy="35" r="5" fill="white" />
    <circle cx="42.5" cy="35" r="2.5" fill="black" />
    <circle cx="57.5" cy="35" r="2.5" fill="black" />

    {/* Cute Godzilla Mouth */}
    <path
      d="M45 47.5 Q50 52.5 55 47.5"
      stroke="black"
      strokeWidth="1"
      fill="none"
    />

    {/* Cute Godzilla Spikes */}
    <polygon points="50,15 47.5,20 52.5,20" fill="#32CD32" />
    <polygon points="42.5,17.5 40,22.5 45,22.5" fill="#32CD32" />
    <polygon points="57.5,17.5 55,22.5 60,22.5" fill="#32CD32" />

    {/* Cute Godzilla Arms */}
    <path
      d="M30 62.5 Q25 67.5 27.5 75"
      stroke="#7FFF00"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M70 62.5 Q75 67.5 72.5 75"
      stroke="#7FFF00"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Cute Godzilla Legs */}
    <path
      d="M40 87.5 Q37.5 95 42.5 100"
      stroke="#7FFF00"
      strokeWidth="6.25"
      strokeLinecap="round"
    />
    <path
      d="M60 87.5 Q62.5 95 57.5 100"
      stroke="#7FFF00"
      strokeWidth="6.25"
      strokeLinecap="round"
    />

    {/* Cute Godzilla Tail */}
    <path
      d="M50 87.5 Q37.5 92.5 25 85"
      stroke="#7FFF00"
      strokeWidth="6.25"
      strokeLinecap="round"
      fill="none"
    />

    {/* Cute Atomic Breath */}
    <path
      d="M50 47.5 Q57.5 45 65 42.5 Q60 45 65 47.5 Q60 50 65 52.5 Q57.5 50 50 47.5"
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
