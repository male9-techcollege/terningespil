import { useState, useEffect } from "react";

const DiceRoller = () => {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollHistory, setRollHistory] = useState<number[]>([]);

  // Roll dice function - 11 sided dice (1-11)
  const rollDice = () => {
    console.log("Roll dice function is called");
    setIsRolling(true);

    // Simulate rolling animation
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 11) + 1;
      console.log("New dice value:", newValue);
      setDiceValue(newValue);
      setRollHistory((prev) => [...prev, newValue]);
      console.log("Updating roll history");
      setIsRolling(false);
      console.log("Rolling finished");
    }, 500);
  };

  // Auto-roll effect for visual rolling
  useEffect(() => {
    if (isRolling) {
      console.log("Starting visual rolling effect");
      const interval = setInterval(() => {
        setDiceValue(Math.floor(Math.random() * 11) + 1);
        // interval for rolling effect
      }, 500);

      return () => {
        console.log("Cleaning up rolling effect");
        clearInterval(interval);
      };
    }
  }, [isRolling]);

  return (
    <div className="dice-roller">
      <div className={`dice ${isRolling ? "rolling" : ""}`}>{diceValue}</div>
      <button onClick={rollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
      <div className="roll-history">
        <p>History: {rollHistory.join(", ")}</p>
      </div>
    </div>
  );
};

export default DiceRoller;
