"use client";

import React, { useState, useRef } from "react";

type District = {
  id: string;
  name: string;
  d: string;
};

const districts: District[] = [
  {
    id: "phra_nakhon",
    name: "Phra Nakhon",
    d: "M250,200 L260,190 L270,200 L260,210 Z",
  },
  { id: "dusit", name: "Dusit", d: "M240,180 L270,180 L270,210 L240,210 Z" },
  {
    id: "nong_chok",
    name: "Nong Chok",
    d: "M400,60 L460,60 L460,120 L400,120 Z",
  },
  {
    id: "bang_kapi",
    name: "Bang Kapi",
    d: "M340,220 L380,220 L380,260 L340,260 Z",
  },
  {
    id: "pathumwan",
    name: "Pathumwan",
    d: "M270,210 L300,210 L300,240 L270,240 Z",
  },
  {
    id: "bang_khen",
    name: "Bang Khen",
    d: "M270,120 L310,120 L310,160 L270,160 Z",
  },
  {
    id: "chatuchak",
    name: "Chatuchak",
    d: "M240,160 L280,160 L280,200 L240,200 Z",
  },
  {
    id: "bang_sue",
    name: "Bang Sue",
    d: "M220,180 L240,180 L240,200 L220,200 Z",
  },
  {
    id: "phaya_thai",
    name: "Phaya Thai",
    d: "M280,200 L300,200 L300,220 L280,220 Z",
  },
  {
    id: "din_daeng",
    name: "Din Daeng",
    d: "M300,220 L320,220 L320,240 L300,240 Z",
  },
  {
    id: "huai_khwang",
    name: "Huai Khwang",
    d: "M320,200 L350,200 L350,230 L320,230 Z",
  },
  {
    id: "ratchathewi",
    name: "Ratchathewi",
    d: "M260,220 L280,220 L280,240 L260,240 Z",
  },
  {
    id: "khlong_toei",
    name: "Khlong Toei",
    d: "M300,260 L330,260 L330,290 L300,290 Z",
  },
  { id: "sathon", name: "Sathon", d: "M270,250 L300,250 L300,270 L270,270 Z" },
  {
    id: "bang_rak",
    name: "Bang Rak",
    d: "M280,240 L300,240 L300,260 L280,260 Z",
  },
  {
    id: "bangkok_noi",
    name: "Bangkok Noi",
    d: "M220,220 L240,220 L240,240 L220,240 Z",
  },
  {
    id: "bangkok_yai",
    name: "Bangkok Yai",
    d: "M210,230 L230,230 L230,250 L210,250 Z",
  },
  {
    id: "thon_buri",
    name: "Thon Buri",
    d: "M200,240 L220,240 L220,260 L200,260 Z",
  },
];

export function Bangkok() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [clickedDistricts, setClickedDistricts] = useState<string[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDistrictClick = (districtId: string) => {
    setClickedDistricts((prev) =>
      prev.includes(districtId) ? prev : [...prev, districtId]
    );
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartDragPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const dx = event.clientX - startDragPosition.x;
      const dy = event.clientY - startDragPosition.y;
      setTransform((prev) => ({
        ...prev,
        x: prev.x + dx / prev.scale,
        y: prev.y + dy / prev.scale,
      }));
      setStartDragPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-0">
      <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
        <p className="text-sm font-medium">
          de-dlooooded istricts: {clickedDistricts.length}/{districts.length}
        </p>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        className="w-full h-full"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g
          transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
        >
          {districts.map((district) => (
            <path
              key={district.id}
              d={district.d}
              fill={
                hoveredDistrict === district.id ||
                clickedDistricts.includes(district.id)
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted))"
              }
              stroke="hsl(var(--border))"
              strokeWidth="1"
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              onClick={() => handleDistrictClick(district.id)}
              className="transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: "all" }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
