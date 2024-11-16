import React from "react";

export const GozillaOne = () => (
  <svg
    width="400"
    height="400"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background */}
    <rect width="400" height="400" fill="#1a1a1a" />

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
