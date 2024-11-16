import React, { useState, useEffect } from "react";

interface Apple {
  id: number;
  x: number;
  y: number;
}

interface ApplesProps {
  onAppleClick: (appleId: number) => void; // Callback to notify about apple clicks
}

export const Apples: React.FC<ApplesProps> = ({ onAppleClick }) => {
  const [apples, setApples] = useState<Apple[]>([]);

  useEffect(() => {
    const generateApples = () => {
      const newApples: Apple[] = [];
      const appleSize = 50; // The size of the apple in pixels
      const screenWidth = window.innerWidth; // Screen width in pixels
      const screenHeight = window.innerHeight; // Screen height in pixels

      for (let i = 0; i < 18; i++) {
        const x = Math.random() * (screenWidth - appleSize); // Ensure apple stays within screen horizontally
        const y = Math.random() * (screenHeight - appleSize); // Ensure apple stays within screen vertically
        newApples.push({
          id: i,
          x: (x / screenWidth) * 100,
          y: (y / screenHeight) * 100,
        }); // Convert to percentage
      }
      setApples(newApples);
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
          src="noun1.jpg" // Replace this with the correct path to the uploaded apple image
          alt="Apple"
          style={{
            position: "absolute",
            top: `${apple.y}%`,
            left: `${apple.x}%`,
            width: "50px", // Adjust the size of the apple as needed
            height: "50px",
            pointerEvents: "auto", // Allow clicks
            cursor: "pointer",
          }}
          onClick={() => handleAppleClick(apple.id)} // Handle click event
        />
      ))}
    </div>
  );
};
