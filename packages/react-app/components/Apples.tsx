import React, { useEffect, useState } from "react";

interface Apple {
  id: number;
  x: number;
  y: number;
}

export const Apples: React.FC = () => {
  const [apples, setApples] = useState<Apple[]>([]);

  useEffect(() => {
    const generateApples = () => {
      const newApples: Apple[] = [];
      for (let i = 0; i < 18; i++) {
        const x = Math.random() * 90; // Random horizontal position (0-90% of the screen width)
        const y = Math.random() * 90; // Random vertical position (0-90% of the screen height)
        newApples.push({ id: i, x, y });
      }
      setApples(newApples);
    };

    generateApples();
  }, []);

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
            pointerEvents: "none", // Ensure apples don't interfere with user interactions
          }}
        />
      ))}
    </div>
  );
};
