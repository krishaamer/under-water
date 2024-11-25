import React, { useState, useEffect, useRef } from "react";
import { districts } from "../lib/districts";

interface BangkokProps {
  clickedDistricts: string[];
  onDistrictClick: (districtId: string) => void;
}

export const Bangkok: React.FC<BangkokProps> = ({
  clickedDistricts,
  onDistrictClick,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [animatedDistricts, setAnimatedDistricts] = useState<string[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const districtsWithY = districts.map((district) => {
      const points = district.d
        .match(/[\d.]+,[\d.]+/g)
        ?.map((pair) => parseFloat(pair.split(",")[1]));
      const minY = points ? Math.min(...points) : 0;
      return { ...district, minY };
    });

    const sortedDistricts = districtsWithY.sort((a, b) => b.minY - a.minY);

    sortedDistricts.forEach((district, index) => {
      const delay = Math.pow(index, 0.8) * 100;
      setTimeout(() => {
        setAnimatedDistricts((prev) => [...prev, district.id]);
      }, delay);
    });
  }, []);

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

  const getDistrictColor = (
    impact: number,
    isClicked: boolean,
    isAnimated: boolean
  ): string => {
    if (isClicked) {
      if (impact <= 0.3) return "hsl(200, 70%, 50%)";
      if (impact <= 0.6) return "hsl(60, 90%, 60%)";
      return "hsl(0, 80%, 50%)";
    }
    return isAnimated ? "hsl(210, 100%, 96%)" : "hsl(210, 100%, 98%)";
  };

  return (
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
      <g>
        <image
          href="/bangkok.svg"
          x="0"
          y="0"
          width="500"
          height="400"
          preserveAspectRatio="xMidYMid meet"
          opacity="0.5"
        />
      </g>
      <g
        transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
      >
        {districts.map((district) => (
          <path
            key={district.id}
            d={district.d}
            fill={getDistrictColor(
              district.climateImpact,
              clickedDistricts.includes(district.id),
              animatedDistricts.includes(district.id)
            )}
            stroke="hsl(var(--border))"
            strokeWidth="0.2"
            onMouseEnter={() => setHoveredDistrict(district.id)}
            onMouseLeave={() => setHoveredDistrict(null)}
            onClick={() => onDistrictClick(district.id)}
            className="transition-colors duration-300 cursor-pointer"
            style={{ pointerEvents: "all" }}
          />
        ))}
      </g>
    </svg>
  );
};
