import React, { useState, useEffect, useRef } from "react";
import { districts } from "../lib/districts";
import { NotificationForm } from "./Push";

interface BangkokProps {
  clickedDistricts: string[];
}

export const Bangkok: React.FC<BangkokProps> = ({ clickedDistricts }) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [animatedDistricts, setAnimatedDistricts] = useState<string[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const animateDistricts = () => {
      districts.forEach((district, index) => {
        setTimeout(() => {
          setAnimatedDistricts((prev) => [...prev, district.id]);
        }, index * (2000 / districts.length)); // Spread animations over 2 seconds
      });
    };

    animateDistricts();
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

  const getDistrictColor = (impact: number, isAnimated: boolean): string => {
    return isAnimated ? "hsl(200, 70%, 50%)" : "hsl(var(--muted))"; // Blue or default
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-0">
      <div className="absolute top-4 left-4 p-2 rounded-2xl shadow bg-pink-100">
        <NotificationForm clickedDistricts={clickedDistricts} />
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
              fill={getDistrictColor(
                district.climateImpact,
                animatedDistricts.includes(district.id)
              )}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              className="transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: "all" }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
