/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Apple {
  id: number;
  x: number;
  y: number;
  size: number; // Size of the apple in pixels
  visible: boolean; // To track visibility
}

interface ApplesProps {
  onAppleClick: (appleId: number) => void; // Callback to notify about apple clicks
}

export const Apples: React.FC<ApplesProps> = ({ onAppleClick }) => {
  const [apples, setApples] = useState<Apple[]>([]);

  useEffect(() => {
    const generateApples = () => {
      const newApples: Apple[] = [];
      const screenWidth = window.innerWidth; // Screen width in pixels
      const screenHeight = window.innerHeight; // Screen height in pixels

      // Define the center area dimensions (50% of the screen size)
      const centerWidth = screenWidth * 0.5; // Center area is 50% of screen width
      const centerHeight = screenHeight * 0.5; // Center area is 50% of screen height

      // Calculate minimum x and y positions to center the apples
      const minX = (screenWidth - centerWidth) / 2;
      const minY = (screenHeight - centerHeight) / 2;

      for (let i = 0; i < 17; i++) {
        const size = Math.random() * (80 - 50) + 50; // Random size between 50 and 80 pixels
        const x = minX + Math.random() * (centerWidth - size); // Random x within center area
        const y = minY + Math.random() * (centerHeight - size); // Random y within center area
        newApples.push({
          id: i,
          x: (x / screenWidth) * 100,
          y: (y / screenHeight) * 100,
          size,
          visible: false, // Initially hidden
        }); // Convert to percentage
      }
      setApples(newApples);

      // Make apples visible progressively
      newApples.forEach((_, index) => {
        setTimeout(() => {
          setApples((prev) =>
            prev.map((apple, i) =>
              i === index ? { ...apple, visible: true } : apple
            )
          );
        }, index * 300); // Adjust delay for each apple
      });
    };

    generateApples();
  }, []);

  const handleAppleClick = (id: number) => {
    setApples((prev) => prev.filter((apple) => apple.id !== id)); // Remove clicked apple
    onAppleClick(id); // Notify parent about the click
  };

  return (
    <div>
      {apples.map((apple) => (
        <Image
          key={apple.id}
          src="/noun1-transparent.png"
          alt="Apple"
          width={apple.size}
          height={apple.size}
          className={`apple ${apple.visible ? "visible" : ""}`}
          style={{
            position: "absolute",
            top: `${apple.y}%`,
            left: `${apple.x}%`,
            width: `${apple.size}px`,
            height: `${apple.size}px`,
            pointerEvents: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleAppleClick(apple.id)}
        />
      ))}
    </div>
  );
};
