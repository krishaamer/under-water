import React, { useState, useEffect } from "react";

interface Apple {
  id: number;
  x: number;
  y: number;
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
      const appleSize = 60; // The size of the apple in pixels
      const screenWidth = window.innerWidth; // Screen width in pixels
      const screenHeight = window.innerHeight; // Screen height in pixels

      // Define the center area dimensions (50% of the screen size)
      const centerWidth = screenWidth * 0.5; // Center area is 50% of screen width
      const centerHeight = screenHeight * 0.5; // Center area is 50% of screen height

      // Calculate minimum x and y positions to center the apples
      const minX = (screenWidth - centerWidth) / 2;
      const minY = (screenHeight - centerHeight) / 2;

      for (let i = 0; i < 18; i++) {
        const x = minX + Math.random() * (centerWidth - appleSize); // Random x within center area
        const y = minY + Math.random() * (centerHeight - appleSize); // Random y within center area
        newApples.push({
          id: i,
          x: (x / screenWidth) * 100,
          y: (y / screenHeight) * 100,
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
        <img
          key={apple.id}
          src="noun1-transparent.png" // Replace this with the correct path to the uploaded apple image
          alt="Apple"
          className={`apple ${apple.visible ? "visible" : ""}`}
          style={{
            position: "absolute",
            top: `${apple.y}%`,
            left: `${apple.x}%`,
            width: "60px", // Adjust the size of the apple as needed
            height: "60px",
            pointerEvents: "auto", // Allow clicks
            cursor: "pointer",
          }}
          onClick={() => handleAppleClick(apple.id)} // Handle click event
        />
      ))}
    </div>
  );
};
