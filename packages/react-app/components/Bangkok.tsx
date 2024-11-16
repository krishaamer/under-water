import React, { useState, useEffect, useRef } from "react";
import { districts } from "../lib/districts";

interface BangkokProps {
  clickedDistricts: string[];
}

export const Bangkok: React.FC<BangkokProps> = ({ clickedDistricts }) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [animatedDistricts, setAnimatedDistricts] = useState<string[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [temperatureChange, setTemperatureChange] = useState<number>(2.0); // Base change in °C
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Update average temperature change based on clickedDistricts
    const baseChange = 2.0; // Base average change in °C
    const reductionPerClick = 0.05; // Reduction per district clicked
    const newTemperatureChange =
      baseChange - clickedDistricts.length * reductionPerClick;

    setTemperatureChange(parseFloat(newTemperatureChange.toFixed(2))); // Set new temperature change
  }, [clickedDistricts]);

  useEffect(() => {
    const districtsWithY = districts.map((district) => {
      const points = district.d
        .match(/[\d.]+,[\d.]+/g) // Match coordinate pairs
        ?.map((pair) => parseFloat(pair.split(",")[1])); // Extract y values
      const minY = points ? Math.min(...points) : 0; // Get the smallest y value
      return { ...district, minY };
    });

    const sortedDistricts = districtsWithY.sort((a, b) => b.minY - a.minY);

    sortedDistricts.forEach((district, index) => {
      const delay = Math.pow(index, 0.8) * 100; // Non-linear delay for wave effect
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
      if (impact <= 0.3) return "hsl(200, 70%, 50%)"; // Blue
      if (impact <= 0.6) return "hsl(60, 90%, 60%)"; // Yellow
      return "hsl(0, 80%, 50%)"; // Red
    }
    return isAnimated
      ? "hsl(210, 100%, 96%)" // Very light blue for animated districts
      : "hsl(210, 100%, 98%)"; // Even lighter blue for default
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded shadow-md">
        <p className="text-lg font-semibold text-center">
          Average Temperature Change: {temperatureChange}°C
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
              fill={getDistrictColor(
                district.climateImpact,
                clickedDistricts.includes(district.id),
                animatedDistricts.includes(district.id)
              )}
              stroke="hsl(var(--border))"
              strokeWidth="0.2"
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              className="transition-colors duration-300 cursor-pointer"
              style={{ pointerEvents: "all" }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
